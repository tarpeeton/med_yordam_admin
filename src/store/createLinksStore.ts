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

  save: async () => {
    try {
      set({ isLoading: true });

      // Collect the data
      const { phone, instagram, telegram, facebook, youtube } = get();
      const token = localStorage.getItem('token'); // Replace with the actual bearer token

      // Prepare the payload
      const contactData = {
        phone,
        instagram,
        telegram,
        facebook,
        youtube,
      };

      // Send the POST request with the bearer token
      const response = await axios.post(
        'https://example.com/api/social-links',
        contactData,
        {
          headers: {
            Authorization: `Bearer ${token}`, // Include the bearer token
            'Content-Type': 'application/json',
          },
        }
      );
      console.log('Social links saved successfully:', response.data);

      alert('Social links saved successfully!');
    } catch (error) {
      console.error('Error saving social links:', error);
      alert('An error occurred while saving the social links.');
      set({ isLoading: false });
    }
  },
}));
