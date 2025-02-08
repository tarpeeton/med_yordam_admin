import { create } from 'zustand';
import axios from 'axios';

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
  buttonDisabled: true, // Initial button state is disabled
  isPasswordMatch: true,

  setPhoneNumber: (phoneNumber) => {
    // Remove all non-digit characters except the leading +
    let sanitized = phoneNumber.replace(/[^\d+]/g, '');

    // Automatically add a + if it's missing
    if (!sanitized.startsWith('+')) {
      sanitized = '+' + sanitized;
    }

    // Ensure no extra spaces and digits-only format
    sanitized = sanitized.replace(/\s+/g, ''); // Remove all spaces

    // Validate the phone number format
    const isValidPhoneNumber = /^[+]\d+$/.test(sanitized); // Must start with + and have only digits after

    set({
      phoneNumber: sanitized,
      buttonDisabled: !isValidPhoneNumber, // Disable button if the phone number is invalid
    });

    // Save to localStorage if valid
    if (isValidPhoneNumber) {
      localStorage.setItem('phoneNumber', sanitized); // Save sanitized number
    }
  },

  setLoginCode: (loginVerifyCode) => {
    const isValidCode = /^[0-9]{6}$/.test(loginVerifyCode); // Validate 6-digit code
    set({
      loginVerifyCode,
      buttonDisabled: !isValidCode, // Disable button if the code is invalid
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
      loginVerifyCode: '',
    });
  },

  save: async () => {
    const { phoneNumber, password } = get();

    try {
      const formData = new FormData();
      formData.append('username', phoneNumber);
      formData.append('password', password);

      const response = await axios.post(
        'https://medyordam.result-me.uz/api/auth/login',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      const { token } = response.data.data;

      // Save token to localStorage and sessionStorage
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
