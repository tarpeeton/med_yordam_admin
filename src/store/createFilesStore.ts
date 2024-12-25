import { create } from 'zustand';
import axios from 'axios';


interface UploadFile {
  id: string;
  name: string;
  type: string;
  status: 'uploading' | 'success' | 'error';
  previewUrl?: string; // For image preview
}

interface UploadFilesState {
  files: UploadFile[];
  addFiles: (files: FileList) => void;
  updateFileStatus: (id: string, status: 'uploading' | 'success' | 'error') => void;
  resetFiles: () => void;
}

export const useUploadFiles = create<UploadFilesState>((set, get) => ({
  files: [],

  addFiles: async (files) => {
    const newFiles: UploadFile[] = Array.from(files).map((file) => {

      const id = crypto.randomUUID();
      return {
        id,
        name: file.name,
        type: file.type,
        status: 'uploading', // Explicitly set the status as 'uploading'
        previewUrl: file.type.startsWith('image/') ? URL.createObjectURL(file) : undefined,
      };
    });

    set((state) => ({ files: [...state.files, ...newFiles] }));

    newFiles.forEach((fileObj) => {
      setTimeout(async () => {
        try {
          // Prepare FormData
          const file = files[Array.from(files).findIndex(f => f.name === fileObj.name)];
          const formData = new FormData();
          formData.append('photo', file);

          // Send file to the backend using axios
          await axios.post('https://medyordam.result-me.uz/api/photo', formData, {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          });
          // Update status to success
          get().updateFileStatus(fileObj.id, 'success');
        } catch (error) {
          console.error('File upload error:', error);
          // Update status to error
          get().updateFileStatus(fileObj.id, 'error');
        }
      }, 600); // Simulate 1-second delay
    });
  },


  updateFileStatus: (id, status) => {
    set((state) => ({
      files: state.files.map((file) =>
        file.id === id ? { ...file, status } : file
      ),
    }));
  },

  resetFiles: () => {
    set({ files: [] });
  },
}));
