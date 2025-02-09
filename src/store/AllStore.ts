import { create } from 'zustand';
import axios from 'axios';

// Multi-language interface
interface MultiLang {
  ru: string;
  uz: string;
  en: string;
}

// Profile interface
interface Profile {
  id: number;
  name: MultiLang;
  surname: MultiLang;
  patronymic: MultiLang;
  slug: string;
  phone: string;
  gender: MultiLang;
  exp: number | null;
  photo: string | null;
  contact: {
    phone: string | null;
    instagram: string | null;
    telegram: string | null;
    facebook: string | null;
    youtube: string | null;
  };
}

// Address interfaces
interface AddressDay {
  id?: string;
  dayOfWeek: string;
  from: string;
  to: string;
}

interface Address {
  id?: string;
  address: MultiLang;
  clinicName: string;
  days: AddressDay[];
  price: string;
  landmark: string;
  location: { latitude: number; longitude: number };
  orientir: MultiLang;
}

// Service interface
interface Service {
  id?: number;
  name: MultiLang;
  price: number;
}

// Document interface
interface Document {
  id: string;
  text: MultiLang;
  file: File | null;
  status: 'idle' | 'uploading' | 'success' | 'error';
}

// Unified Zustand store interface
interface UnifiedState {
  // State
  profile: Profile;
  addresses: Address[];
  services: Service[];
  documents: Document[];

  // Methods
  addOrUpdateProfile: (profile: Profile) => void;
  addOrUpdateAddresses: (addresses: Address[]) => void;
  addOrUpdateServices: (services: Service[]) => void;
  addOrUpdateDocuments: (documents: Document[]) => void;

  // API Methods
  fetchProfile: (slug: string) => Promise<void>;
  saveProfile: () => Promise<boolean>;
  saveAddresses: () => Promise<boolean>;
  saveServices: () => Promise<boolean>;
  saveDocuments: () => Promise<boolean>;
}

// Zustand store implementation
export const useUnifiedStore = create<UnifiedState>((set, get) => ({
  // Initial state
  profile: {
    id: 0,
    name: { ru: '', uz: '', en: '' },
    surname: { ru: '', uz: '', en: '' },
    patronymic: { ru: '', uz: '', en: '' },
    slug: '',
    phone: '',
    gender: { ru: 'Мужчина', uz: 'Erkak', en: 'Male' },
    exp: null,
    photo: null,
    contact: {
      phone: null,
      instagram: null,
      telegram: null,
      facebook: null,
      youtube: null,
    },
  },
  addresses: [],
  services: [],
  documents: [],

  // Add or update profile
  addOrUpdateProfile: (profile) =>
    set(() => ({
      profile,
    })),

  // Add or update addresses
  addOrUpdateAddresses: (addresses) =>
    set((state) => ({
      addresses: addresses.map((address) => {
        const existing = state.addresses.find((a) => a.id === address.id);
        return existing ? { ...existing, ...address } : address;
      }),
    })),

  // Add or update services
  addOrUpdateServices: (services) =>
    set((state) => ({
      services: services.map((service) => {
        const existing = state.services.find((s) => s.id === service.id);
        return existing ? { ...existing, ...service } : service;
      }),
    })),

  // Add or update documents
  addOrUpdateDocuments: (documents) =>
    set((state) => ({
      documents: documents.map((doc) => {
        const existing = state.documents.find((d) => d.id === doc.id);
        return existing ? { ...existing, ...doc } : doc;
      }),
    })),

  // Fetch profile data from API
  fetchProfile: async (slug) => {
    try {
      const response = await axios.get(
        `https://medyordam.result-me.uz/api/doctor/${slug}`
      );
      const data = response.data.data;

      // Update profile
      get().addOrUpdateProfile({
        id: data.id,
        name: data.name,
        surname: data.surname,
        patronymic: data.patronymic,
        slug: data.slug,
        phone: data.phone,
        gender: {
          ru: data.gender === 'MALE' ? 'Мужчина' : 'Женщина',
          uz: data.gender === 'MALE' ? 'Erkak' : 'Ayol',
          en: data.gender === 'MALE' ? 'Male' : 'Female',
        },
        exp: data.exp,
        photo: data.photo?.url || null,
        contact: data.contact || {},
      });

      // Update addresses
      get().addOrUpdateAddresses(
        data.receptionTime.map((item: any) => ({
          id: item.id,
          address: item.address,
          clinicName: item.clinicName,
          days: item.days.map((day: any) => ({
            id: day.id,
            dayOfWeek: day.dayOfWeek,
            from: day.from,
            to: day.to,
          })),
          price: item.price || '',
          landmark: item.landmark || '',
          location: item.location || { latitude: 0, longitude: 0 },
          orientir: item.orientir,
        }))
      );

      // Update services
      get().addOrUpdateServices(data.priceList || []);

      // Update documents
      get().addOrUpdateDocuments(data.documents || []);
    } catch (error) {
      console.error('Failed to fetch profile:', error);
    }
  },

  // Save profile data to API
  saveProfile: async () => {
    try {
      const profile = get().profile;
      await axios.put(`https://medyordam.result-me.uz/api/doctor`, profile);
      return true;
    } catch (error) {
      console.error('Failed to save profile:', error);
      return false;
    }
  },

  // Save addresses to API
  saveAddresses: async () => {
    try {
      const addresses = get().addresses;
      await axios.put(`https://medyordam.result-me.uz/api/doctor/addresses`, {
        addresses,
      });
      return true;
    } catch (error) {
      console.error('Failed to save addresses:', error);
      return false;
    }
  },

  // Save services to API
  saveServices: async () => {
    try {
      const services = get().services;
      await axios.put(`https://medyordam.result-me.uz/api/doctor/services`, {
        services,
      });
      return true;
    } catch (error) {
      console.error('Failed to save services:', error);
      return false;
    }
  },

  // Save documents to API
  saveDocuments: async () => {
    try {
      const documents = get().documents;
      const formData = new FormData();
      documents.forEach((doc) => {
        if (doc.file) {
          formData.append('files', doc.file);
        }
        formData.append('data', JSON.stringify(doc.text));
      });

      await axios.post(
        `https://medyordam.result-me.uz/api/documents`,
        formData
      );
      return true;
    } catch (error) {
      console.error('Failed to save documents:', error);
      return false;
    }
  },
}));
