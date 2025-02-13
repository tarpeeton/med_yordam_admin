import { create } from 'zustand';
import axios from 'axios';

export enum UserRole {
  ROLE_ROOT = 'ROLE_ROOT',
  ROLE_CLINIC = 'ROLE_CLINIC',
  ROLE_DOCTOR = 'ROLE_DOCTOR',
}

interface LoginState {
  phoneNumber: string;
  password: string;
  role: UserRole;
  repeatPassword: string;
  isPasswordMatch: boolean;
  success: boolean;
  error: boolean;
  loginVerifyCode: string;
  buttonDisabled: boolean;
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
  role: UserRole.ROLE_DOCTOR,
  repeatPassword: '',
  loginVerifyCode: '',
  success: false,
  error: false,
  buttonDisabled: true,
  isPasswordMatch: true,

  setPhoneNumber: (phoneNumber) => {
    let sanitized = phoneNumber.replace(/[^\d+]/g, '');

    if (!sanitized.startsWith('+')) {
      sanitized = '+' + sanitized;
    }

    sanitized = sanitized.replace(/\s+/g, '');

    const isValidPhoneNumber = /^[+]\d+$/.test(sanitized);

    set({
      phoneNumber: sanitized,
      buttonDisabled: !isValidPhoneNumber,
    });

    if (isValidPhoneNumber) {
      localStorage.setItem('phoneNumber', sanitized);
    }
  },

  setLoginCode: (loginVerifyCode) => {
    const isValidCode = /^[0-9]{6}$/.test(loginVerifyCode);
    set({
      loginVerifyCode,
      buttonDisabled: !isValidCode,
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
      const { token, role } = response.data.data;
      sessionStorage.setItem('token', token);
      set({ success: true, error: false, role: role });
    } catch (error) {
      console.error('Login failed:', error);
      set({ success: false, error: true });
    }
  },

  setError: () => set({ error: true, success: false }),
  setSuccess: () => set({ success: true, error: false }),
}));
