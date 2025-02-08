import { create } from 'zustand';
import axios from 'axios';
import { useProfileStore } from './profileStore';

interface DocumentData {
  id: number;
  url: string;
}

export interface UploadFile {
  id: string;
  backendId?: number;
  name?: string;
  type?: string;
  status: 'uploading' | 'success' | 'error';
  previewUrl?: string;
  url?: string;
}

interface UploadFilesState {
  files: UploadFile[];
  addFiles: (files: FileList) => void;
  updateFileStatus: (
    id: string,
    status: 'uploading' | 'success' | 'error'
  ) => void;
  updateFileWithDocumentData: (tempId: string, document: DocumentData) => void;
  resetFiles: () => void;
  setDocuments: (documents: DocumentData[]) => void;
}

export const useUploadFiles = create<UploadFilesState>((set, get) => ({
  files: [],
  addFiles: async (files) => {
    const { id: doctorId } = useProfileStore.getState();
    const token = sessionStorage.getItem('token');
    const newFiles: UploadFile[] = Array.from(files).map((file) => {
      const fileId = crypto.randomUUID();
      return {
        id: fileId,
        name: file.name,
        type: file.type,
        status: 'uploading',
        previewUrl: file.type.startsWith('image/')
          ? URL.createObjectURL(file)
          : undefined,
      };
    });
    set((state) => ({ files: [...state.files, ...newFiles] }));
    newFiles.forEach((fileObj) => {
      setTimeout(async () => {
        try {
          const fileIndex = Array.from(files).findIndex(
            (f) => f.name === fileObj.name
          );
          const file = files[fileIndex];
          const formData = new FormData();
          formData.append('file', file);
          const response = await axios.post(
            `https://medyordam.result-me.uz/api/doctor/file-upload/${doctorId}`,
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: token ? `Bearer ${token}` : '',
              },
            }
          );
          const document: DocumentData = response.data;
          get().updateFileWithDocumentData(fileObj.id, document);
        } catch (error) {
          console.error('File upload error:', error);
          get().updateFileStatus(fileObj.id, 'error');
        }
      }, 600);
    });
  },
  updateFileStatus: (id, status) => {
    set((state) => ({
      files: state.files.map((file) =>
        file.id === id ? { ...file, status } : file
      ),
    }));
  },
  updateFileWithDocumentData: (tempId, document) => {
    set((state) => ({
      files: state.files.map((file) =>
        file.id === tempId
          ? {
              ...file,
              status: 'success',
              backendId: document.id,
              url: document.url,
            }
          : file
      ),
    }));
  },
  resetFiles: () => {
    set({ files: [] });
  },
  setDocuments: (documents) => {
    const mappedFiles: UploadFile[] = documents.map((doc) => ({
      id: doc.id.toString(),
      backendId: doc.id,
      status: 'success',
      url: doc.url,
      name: doc.url.split('/').pop()?.replace(/^\d+-/, '') || '',
    }));
    set({ files: mappedFiles });
  },
}));
