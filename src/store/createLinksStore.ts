import { create } from 'zustand';
import axios from 'axios';
import { useProfileStore } from '@/store/profileStore';

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
    // Удаляем все символы, кроме цифр, пробелов и "+"
    let sanitized = phone.replace(/[^\d\s+]/g, '');

    // Если номер не начинается с "+", добавляем его
    if (!sanitized.startsWith('+')) {
      sanitized = `+${sanitized}`;
    }

    // Удаляем лишние пробелы
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

      await axios.put('https://medyordam.result-me.uz/api/doctor', payload, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

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
