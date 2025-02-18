import { create } from 'zustand';
import axios from 'axios';
import { useClinicProfileStore } from './profile';

export interface UploadFile {
  id: string;
  backendId?: number;
  name?: string;
  status: 'uploading' | 'success' | 'error';
  previewUrl?: string;
  url?: string;
  fileObj?: File;
}

interface DocumentData {
  id: number;
  file: {
    id: number;
    url: string;
  };
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
  deleteFile: (backendId: number) => Promise<void>;
  saveFiles: () => Promise<boolean>;
  setAllGallery: (photos: { id: number; url: string }[]) => void;
}

export const useUploadFiles = create<UploadFilesState>((set, get) => ({
  files: [],

  // Fayllarni qo'shish: fileObj sifatida original faylni saqlaymiz
  addFiles: (files) => {
    const newFiles: UploadFile[] = Array.from(files).map((file) => {
      const fileId = crypto.randomUUID();
      return {
        id: fileId,
        name: file.name,
        status: 'uploading',
        previewUrl: file.type.startsWith('image/')
          ? URL.createObjectURL(file)
          : undefined,
        fileObj: file,
      };
    });
    set((state) => ({ files: [...state.files, ...newFiles] }));
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
              fileObj: undefined,
            }
          : file
      ),
    }));
  },

  resetFiles: () => {
    set({ files: [] });
  },

  // setDocuments: DocumentData tipidagi ma'lumotlarni storega yuklash
  setDocuments: (documents) => {
    const mappedFiles: UploadFile[] = documents.map((doc) => ({
      id: doc.id.toString(),
      backendId: doc.id,
      status: 'success',
      url: doc.file.url,
      name: doc.file.url.split('/').pop()?.replace(/^\d+-/, '') || '',
    }));
    set({ files: mappedFiles });
  },

  deleteFile: async (backendId) => {
    const clinickID = useClinicProfileStore.getState().id;
    try {
      const token = sessionStorage.getItem('token');
      const formData = new FormData();
      const payload = {
        id: clinickID,
        removingPhotos: [backendId],
      };
      formData.append('json', JSON.stringify(payload));
      await axios.put('https://medyordam.result-me.uz/api/clinic', formData, {
        headers: {
          Authorization: token ? `Bearer ${token}` : '',
          'Accept-Language': '',
        },
      });
      set((state) => ({
        files: state.files.filter((file) => file.backendId !== backendId),
      }));
    } catch (error) {
      console.error('File delete error:', error);
    }
  },

  saveFiles: async (): Promise<boolean> => {
    try {
      const { files } = get();
      const token = sessionStorage.getItem('token');
      const tokenHeader = token ? `Bearer ${token}` : '';
      const filesToUpload = files.filter((file) => file.fileObj);
      if (!filesToUpload.length) {
        console.warn('No files to upload');
        return false;
      }
      const formData = new FormData();
      const clinickID = useClinicProfileStore.getState().id;
      filesToUpload.forEach((file) => {
        if (file.fileObj) {
          formData.append('photos', file.fileObj);
        }
      });
      const payload = { id: clinickID };
      formData.append('json', JSON.stringify(payload));
      const response = await axios.put(
        'https://medyordam.result-me.uz/api/clinic',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
            Authorization: tokenHeader,
            'Accept-Language': '',
          },
        }
      );
      const photos: { id: number; url: string }[] = response.data.data.photos;
      set((state) => {
        let uploadIndex = 0;
        return {
          files: state.files.map((file) => {
            if (file.fileObj) {
              const photo = photos[uploadIndex];
              uploadIndex++;
              if (photo) {
                return {
                  ...file,
                  status: 'success',
                  backendId: photo.id,
                  url: photo.url,
                  fileObj: undefined,
                };
              } else {
                return { ...file, status: 'error' };
              }
            }
            return file;
          }),
        };
      });
      return true;
    } catch (error) {
      console.error('Error uploading files:', error);
      set((state) => ({
        files: state.files.map((file) =>
          file.fileObj ? { ...file, status: 'error' } : file
        ),
      }));
      return false;
    }
  },

  setAllGallery: (photos) => {
    const mappedFiles: UploadFile[] = photos.map((photo) => ({
      id: photo.id.toString(),
      backendId: photo.id,
      status: 'success',
      url: photo.url,
      name: photo.url.split('/').pop()?.replace(/^\d+-/, '') || '',
    }));
    set({ files: mappedFiles });
  },
}));
