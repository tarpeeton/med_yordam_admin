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
  save: () => Promise<void>;
  setSuccess: (sussess: boolean) => void;
  setAll: (phone: string, instagram: string, telegram: string, facebook: string, youtube: string) => void;
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
    // Allow only digits, spaces, parentheses, and "+"
    const sanitized = phone.replace(/[^\d\s()+-]/g, '');
  
    // Automatically format phone number to +998 (XX) XXX-XX-XX
    let formatted = sanitized;
    if (sanitized.startsWith('+998')) {
      formatted = sanitized
        // Full format: +998 (XX) XXX-XX-XX
        .replace(/^(\+998)(\d{2})(\d{3})(\d{2})(\d{2})$/, '$1 ($2) $3-$4-$5')
        // Partial formats for progressive formatting as the user types:
        .replace(/^(\+998)(\d{2})(\d{0,3})$/, '$1 ($2) $3')
        .replace(/^(\+998)(\d{2})$/, '$1 ($2)');
    }
  
    set({ phone: formatted });
  },
  
  setInstagram: (instagram) => set({ instagram }),
  setTelegram: (telegram) => set({ telegram }),
  setFacebook: (facebook) => set({ facebook }),
  setYoutube: (youtube) => set({ youtube }),
  setSuccess: (success) => set({ success }),




  save: async () => {
    try {
      set({ isLoading: true });

      // Collect contact data
      const { phone, instagram, telegram, facebook, youtube } = get();
      const { id , contactId } = useProfileStore.getState(); // Get the ID from profile store
      const token = localStorage.getItem('token'); // Bearer token for authorization
      // Prepare the payload for contact update
      const contact = {
        id, // Profile ID
        contact: {
          id: contactId,
          phone,
          instagram,
          telegram,
          facebook,
          youtube,
        },
      };

      // Make the PUT request to update contact
      const response = await axios.put(
        'https://medyordam.result-me.uz/api/doctor',
        contact,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include token
            'Content-Type': 'application/json',
          },
        }
      );

      set({ success: true });
      console.log(response.data)
    } catch (error) {
      set({ success: false });
    } finally {
      set({ isLoading: false });
    }
  },

  setAll: (phone:string, instagram:string, telegram:string, facebook:string, youtube:string) => {
    set({ phone, instagram, telegram, facebook, youtube });
  },
  
}));
