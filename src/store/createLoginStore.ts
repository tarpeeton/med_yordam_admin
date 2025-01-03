import { create } from 'zustand';
import axios from 'axios'

// Helper function to get the stored phoneNumber from localStorage
const getPersistedPhoneNumber = () => {
  if (typeof window !== 'undefined') {
    const storedPhoneNumber = localStorage.getItem('phoneNumber');
    return storedPhoneNumber ? JSON.parse(storedPhoneNumber) : '';
  }
  return '';
};

interface LoginState {
  phoneNumber: string;
  password: string;
  repeatPassword: string;
  isPasswordMatch: boolean;
  success: boolean;
  error: boolean;
  loginVerifyCode: string;
  buttonDisabled: boolean; // Added buttonDisabled state
  setPhoneNumber: (phoneNumber: string) => void;
  setPassword: (password: string) => void;
  setLoginCode: (loginVerifyCode: string) => void;
  setRepeatPassword: (repeatPassword: string) => void;
  resetForm: () => void;
  save: () => Promise<void>;
  setError: () => void;
  setSuccess: () => void;
}

export const useLoginStore = create<LoginState>((set, get) => ({
  phoneNumber: '',  
  password: '',
  repeatPassword: '',
  loginVerifyCode: '',
  success: false,
  error: false,
  buttonDisabled: true,  // Initial button state is disabled
  isPasswordMatch: true,
  
  setPhoneNumber: (phoneNumber) => {
    const sanitized = phoneNumber.replace(/[^\d\s+]/g, ''); // Allow only digits, spaces, and +

    const isValidPhoneNumber = /^[+]?\d[\d\s]+$/.test(sanitized); // Validate number format

    set({
      phoneNumber: sanitized,
      buttonDisabled: !isValidPhoneNumber, // Disable button if phone number is invalid
    });

    if (isValidPhoneNumber) {
      localStorage.setItem('phoneNumber', JSON.stringify(sanitized));
    }
  },

  setLoginCode: (loginVerifyCode) => {
    const isValidCode = /^[0-9]{6}$/.test(loginVerifyCode); // Validate 6-digit code
    set({ 
      loginVerifyCode, 
      buttonDisabled: !isValidCode  // Disable button if the code is invalid
    });
  },

  setPassword: (password) => {
    set({ password });
    const { repeatPassword } = get();
    set({ isPasswordMatch: password === repeatPassword });
  },

  setRepeatPassword: (repeatPassword) => {
    set({ repeatPassword });
    const { password } = get();
    set({ isPasswordMatch: password === repeatPassword });
  },

  resetForm: () => {
    set({
      phoneNumber: '',
      password: '',
      repeatPassword: '',
      isPasswordMatch: true,
      loginVerifyCode: ''
    });
    // Clear phoneNumber from localStorage as well when resetting the form
    localStorage.removeItem('phoneNumber');
  },

  save: async () => {
    const { phoneNumber, password } = get();
    try {
      const formData = new FormData();
      formData.append('username', phoneNumber);
      formData.append('password', password);

      const response = await axios.post('https://medyordam.result-me.uz/api/auth/login', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const { token } = response.data.data;

      // Save token to localStorage and sessionStorage
      localStorage.setItem('token', token);
      sessionStorage.setItem('token', token);

      set({ success: true, error: false });
    } catch (error) {
      console.error('Login failed:', error);
      set({ success: false, error: true });
    }
  },

  setError: () => set({ error: true, success: false }),
  setSuccess: () => set({ success: true, error: false }),
}));
