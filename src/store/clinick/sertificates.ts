import { create } from 'zustand';
import axios from 'axios';
import { useClinicProfileStore } from './profile';
import { multiLang } from '@/interface/multiLang';

export interface UploadFile {
  id: string;
  backendId?: number;
  name?: string;
  status: 'uploading' | 'success' | 'error';
  previewUrl?: string;
  url?: string;
  fileObj?: File;
}

interface IPayload {
  id: number;
  aboutUs: AboutUsItem[];
  address: IAdress[];
}
export interface AboutUsItem {
  id?: number | null;
  title: {
    uz: string;
    ru: string;
    en: string;
  };
  description: {
    uz: string;
    ru: string;
    en: string;
  };
}
interface DocumentData {
  id: number;
  file: {
    id: number;
    url: string;
  };
}

interface DataIsBackend {
  address: IAdress[];
  aboutUs: AboutUsItem[];
}

export interface IAdress {
  id?: number;
  name: {
    uz: string;
    ru: string;
    en: string;
  };
}

interface UploadFilesState {
  files: UploadFile[];
  aboutUs: AboutUsItem[];
  address: IAdress[];
  addFiles: (files: FileList) => void;

  updateFileStatus: (
    id: string,
    status: 'uploading' | 'success' | 'error'
  ) => void;
  updateFileWithDocumentData: (tempId: string, document: DocumentData) => void;
  resetFiles: () => void;
  setDocuments: (documents: DocumentData[]) => void;
  deleteFile: (backendId: number) => Promise<void>;
  setAllSertificates: (photos: { id: number; url: string }[]) => void;

  saveData: () => Promise<boolean>;
  // ADRESS
  updateAboutUs: (
    index: number,
    lang: 'ru' | 'uz' | 'en',
    field: 'title' | 'description',
    value: string
  ) => void;
  updateAdress: (
    index: number,
    lang: 'ru' | 'uz' | 'en',
    value: string
  ) => void;
  addAdress: () => void;
  // ABOUT

  deleteAboutUs: (index: number) => void;
  addAboutUs: () => void;
  // SET ABOUT AND ADDRESS
  setAddressAndAbout: (address: IAdress[], aboutUs: AboutUsItem[]) => void;
}

export const useSertificatesStore = create<UploadFilesState>((set, get) => ({
  files: [],
  aboutUs: [
    {
      title: { ru: '', uz: '', en: '' },
      description: { ru: '', uz: '', en: '' },
    },
  ],
  address: [{ name: { ru: '', uz: '', en: '' } }],

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
        removingCertificates: [backendId],
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

  addAboutUs: () => {
    set((state) => ({
      aboutUs: [
        ...state.aboutUs,
        {
          title: { ru: '', uz: '', en: '' },
          description: { ru: '', uz: '', en: '' },
        },
      ],
    }));
  },

  updateAboutUs: (index, lang, field, value) => {
    set((state) => {
      const newAboutUs = [...state.aboutUs];
      if (newAboutUs[index]) {
        newAboutUs[index] = {
          ...newAboutUs[index],
          [field]: {
            ...newAboutUs[index][field],
            [lang]: value,
          },
        };
      }
      return { aboutUs: newAboutUs };
    });
  },

  deleteAboutUs: (index) => {
    set((state) => {
      const newAboutUs = state.aboutUs.filter((_, i) => i !== index);
      return { aboutUs: newAboutUs };
    });
  },

  saveData: async (): Promise<boolean> => {
    try {
      const { files, aboutUs, address } = get();
      const token = sessionStorage.getItem('token');
      const tokenHeader = token ? `Bearer ${token}` : '';
      const filesToUpload = files.filter((file) => file.fileObj);

      const formData = new FormData();
      const clinickID = useClinicProfileStore.getState().id;
      filesToUpload.forEach((file) => {
        if (file.fileObj) {
          formData.append('certificates', file.fileObj);
        }
      });

      const transformedAboutUs = aboutUs
        .map((item) => {
          const isEmptyTitle = Object.values(item.title).every(
            (v) => (v ?? '').trim() === ''
          );
          const isEmptyDescription = Object.values(item.description).every(
            (v) => (v ?? '').trim() === ''
          );
          if (isEmptyTitle && isEmptyDescription) {
            return item.id ? { id: item.id } : null;
          }
          return item;
        })
        .filter((item) => item !== null);

      const transformedAddress = address
        .map((item) => {
          const isEmptyName = Object.values(item.name).every(
            (v) => (v ?? '').trim() === ''
          );
          if (isEmptyName) {
            return item.id ? { id: item.id } : null;
          }
          return item;
        })
        .filter((item) => item !== null);

      const payload: Partial<Record<keyof IPayload, unknown>> = {
        id: clinickID,
      };

      if (transformedAboutUs.length > 0) {
        payload.aboutUs = transformedAboutUs;
      }

      if (transformedAddress.length > 0) {
        payload.address = transformedAddress;
      }

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

      const photos: { id: number; url: string }[] =
        response.data.data.certificates;
      get().setAllSertificates(photos);

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

  addAdress: () => {
    set((state) => ({
      address: [...state.address, { name: { ru: '', uz: '', en: '' } }],
    }));
  },

  updateAdress: (index, lang, value) => {
    set((state) => {
      const newAddress = [...state.address];
      if (newAddress[index]) {
        newAddress[index] = {
          ...newAddress[index],
          name: { ...newAddress[index].name, [lang]: value },
        };
      }
      return { address: newAddress };
    });
  },

  setAllSertificates: (photos) => {
    const mappedFiles: UploadFile[] = photos.map((photo) => ({
      id: photo.id.toString(),
      backendId: photo.id,
      status: 'success',
      url: photo.url,
      name: photo.url.split('/').pop()?.replace(/^\d+-/, '') || '',
    }));
    set({ files: mappedFiles });
  },

  setAddressAndAbout: (address, aboutUs) => {
    set({ aboutUs: aboutUs, address: address });
  },
}));
