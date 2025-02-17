import { create } from 'zustand';
import axios from 'axios';
import { useProfileStore } from '@/store/clinick/doctor/profileStore';

export type FileUploadType = 'DOCUMENT' | 'LICENSE';

export interface UploadFile {
  id: string;
  backendId?: number;
  name?: string;
  type?: FileUploadType;
  status: 'uploading' | 'success' | 'error';
  previewUrl?: string;
  url?: string;
}

interface DocumentData {
  id: number;
  type: FileUploadType;
  file: {
    id: number;
    url: string;
  };
}

interface UploadFilesState {
  files: UploadFile[];
  addFiles: (files: FileList, fileType?: FileUploadType) => void;
  updateFile: (id: string, file: File) => void;
  updateFileStatus: (
    id: string,
    status: 'uploading' | 'success' | 'error'
  ) => void;
  updateFileWithDocumentData: (tempId: string, document: DocumentData) => void;
  resetFiles: () => void;
  setDocuments: (documents: DocumentData[]) => void;
  deleteFile: (backendId: number) => Promise<void>;
}

export const useUploadFiles = create<UploadFilesState>((set, get) => ({
  files: [],
  addFiles: (files, fileType = 'DOCUMENT') => {
    const { id: doctorId } = useProfileStore.getState();
    const token = sessionStorage.getItem('token');

    const newFiles: UploadFile[] = Array.from(files).map((file) => {
      const fileId = crypto.randomUUID();
      return {
        id: fileId,
        name: file.name,
        type: fileType,
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

          const additionalData = {
            doctorId: doctorId,
            type: fileObj.type || 'DOCUMENT',
          };

          formData.append('json', JSON.stringify(additionalData));

          const response = await axios.post(
            'https://medyordam.result-me.uz/api/doctor/file-upload',
            formData,
            {
              headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: token ? `Bearer ${token}` : '',
              },
            }
          );

          const document: DocumentData = response.data.documents;
          get().updateFileWithDocumentData(fileObj.id, document);
        } catch (error) {
          console.error('File upload error:', error);
          get().updateFileStatus(fileObj.id, 'error');
        }
      }, 600);
    });
  },

  updateFile: async (id, file) => {
    const token = sessionStorage.getItem('token');
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.put(
        `https://medyordam.result-me.uz/api/file/${id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: token ? `Bearer ${token}` : '',
          },
        }
      );

      const updatedFile: UploadFile = {
        id: id.toString(),
        name: file.name,
        status: 'success',
        url: response.data.data.url,
      };

      set((state) => ({
        files: state.files.map((f) =>
          f.id === id ? { ...f, ...updatedFile } : f
        ),
      }));
    } catch (error) {
      console.error('File update error:', error);
      set((state) => ({
        files: state.files.map((f) =>
          f.id === id ? { ...f, status: 'error' } : f
        ),
      }));
    }
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
              url: document.file.url,
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
      url: doc.file.url,
      name: doc.file.url.split('/').pop()?.replace(/^\d+-/, '') || '',
      type: doc.type as FileUploadType,
    }));
    set({ files: mappedFiles });
  },

  deleteFile: async (backendId) => {
    try {
      await axios.delete(
        `https://medyordam.result-me.uz/api/doctor/file-deleted/${backendId}`,
        {
          headers: {
            Authorization: sessionStorage.getItem('token')
              ? `Bearer ${sessionStorage.getItem('token')}`
              : '',
          },
        }
      );

      set((state) => ({
        files: state.files.filter((file) => file.backendId !== backendId),
      }));
    } catch (error) {
      console.error('File delete error:', error);
    }
  },
}));
