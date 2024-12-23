import { create } from 'zustand';
import axios from 'axios';

interface RegisterState {
  phone: string;
  instagram: string;
  telegram: string;
  facebook: string;
  youtube: string;
  isLoading: boolean;
  setPhone: (phone: string) => void;
  setInstagram: (instagram: string) => void;
  setTelegram: (telegram: string) => void;
  setFacebook: (facebook: string) => void;
  setYoutube: (youtube: string) => void;
  save: () => Promise<void>;
}

export const useRegisterLinks = create<RegisterState>((set, get) => ({
  phone: '',
  instagram: '',
  telegram: '',
  facebook: '',
  youtube: '',
  isLoading: false,

  setPhone: (phone) => set({ phone }),
  setInstagram: (instagram) => set({ instagram }),
  setTelegram: (telegram) => set({ telegram }),
  setFacebook: (facebook) => set({ facebook }),
  setYoutube: (youtube) => set({ youtube }),

  save: async () => {
    try {
      set({ isLoading: true });
      const { phone, instagram, telegram, facebook, youtube } = get();
      
      await axios.post('/api/social-links', {
        phone,
        instagram,
        telegram,
        facebook,
        youtube
      });

      // Optional: Clear the form after successful submission
      set({
        phone: '',
        instagram: '',
        telegram: '',
        facebook: '',
        youtube: '',
        isLoading: false
      });
    } catch (error) {
      console.error('Error saving social links:', error);
      set({ isLoading: false });
    }
  }
}));
