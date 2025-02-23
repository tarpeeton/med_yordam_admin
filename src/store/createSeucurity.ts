import { create } from 'zustand';
import axios from 'axios';

interface SecurityState {
  oldPassword: string;
  newPassword: string;
  repeatPassword: string;
  isPasswordMatch: boolean;
  success: boolean;
  error: boolean;
  buttonDisabled: boolean;
  setOldPassword: (oldPassword: string) => void;
  setNewPassword: (newPassword: string) => void;
  setRepeatPassword: (repeatPassword: string) => void;
  resetForm: () => void;
  save: () => Promise<boolean>;
}

export const useSecurityStore = create<SecurityState>((set, get) => ({
  oldPassword: '',
  newPassword: '',
  repeatPassword: '',
  isPasswordMatch: true,
  success: false,
  error: false,
  buttonDisabled: true,

  setOldPassword: (oldPassword) => {
    set({ oldPassword });
  },

  setNewPassword: (newPassword) => {
    set({ newPassword });
    const { repeatPassword } = get();
    set({
      isPasswordMatch: newPassword === repeatPassword,
      buttonDisabled: newPassword === '' || repeatPassword === '',
    });
  },

  setRepeatPassword: (repeatPassword) => {
    set({ repeatPassword });
    const { newPassword } = get();
    set({
      isPasswordMatch: newPassword === repeatPassword,
      buttonDisabled: newPassword === '' || repeatPassword === '',
    });
  },

  resetForm: () => {
    set({
      oldPassword: '',
      newPassword: '',
      repeatPassword: '',
      isPasswordMatch: true,
      success: false,
      error: false,
      buttonDisabled: true,
    });
  },

  save: async (): Promise<boolean> => {
    const { oldPassword, newPassword, isPasswordMatch } = get();
    const token = localStorage.getItem('token');

    if (!isPasswordMatch || !oldPassword || !newPassword) {
      set({ error: true, success: false });
      return false;
    }

    try {
      await axios.put(
        'https://medyordam.result-me.uz/api/user/password',
        { oldPassword, newPassword },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      return true;
    } catch (err) {
      return false;
    }
  },
}));
