import { create } from 'zustand';
import axios from 'axios';
import { useProfileStore } from '@/store/clinick/doctor/profileStore';
import { useClinicProfileStore } from '../profile';

interface RegisterState {
  phone: string;
  instagram: string;
  telegram: string;
  facebook: string;
  youtube: string;
  isLoading: boolean;
  success: boolean;
  setPhone: (phone: string) => void;
  setInstagram: (instagram: string) => void;
  setTelegram: (telegram: string) => void;
  setFacebook: (facebook: string) => void;
  setYoutube: (youtube: string) => void;
  save: () => Promise<boolean>;
  setAll: (
    phone: string,
    instagram: string,
    telegram: string,
    facebook: string,
    youtube: string
  ) => void;
}

export const useRegisterLinks = create<RegisterState>((set, get) => ({
  phone: '',
  instagram: '',
  telegram: '',
  facebook: '',
  youtube: '',
  isLoading: false,
  success: false,

  setPhone: (phone) => {
    let sanitized = phone.replace(/[^\d\s+]/g, '');

    if (!sanitized.startsWith('+')) {
      sanitized = `+${sanitized}`;
    }
    sanitized = sanitized.replace(/\s+/g, ' ').trim();
    set({ phone: sanitized });
  },

  setInstagram: (instagram) => set({ instagram }),
  setTelegram: (telegram) => set({ telegram }),
  setFacebook: (facebook) => set({ facebook }),
  setYoutube: (youtube) => set({ youtube }),

  save: async () => {
    set({ isLoading: true });
    try {
      const { phone, instagram, telegram, facebook, youtube } = get();
      const { id, contactId } = useProfileStore.getState();
      const token = localStorage.getItem('token');
      const formData = new FormData();
      const clinicId = useClinicProfileStore.getState().id;
      const payload = {
        id,
        contact: {
          id: contactId,
          phone,
          instagram,
          telegram,
          facebook,
          youtube,
        },
      };

      formData.append('json', JSON.stringify(payload));
      formData.append('clinicId', String(clinicId));

      await axios.put(
        'https://medyordam.result-me.uz/api/clinic/update-doctor',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
            'Accept-Language': '',
          },
        }
      );

      return true;
    } catch (error) {
      console.error('Save error:', error);
      return false;
    } finally {
      set({ isLoading: false });
    }
  },

  setAll: (
    phone: string,
    instagram: string,
    telegram: string,
    facebook: string,
    youtube: string
  ) => {
    set({ phone, instagram, telegram, facebook, youtube });
  },
}));
