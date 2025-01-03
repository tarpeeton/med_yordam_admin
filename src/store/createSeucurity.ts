import { create } from 'zustand';

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
  save: () => Promise<void>;
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
    set({ isPasswordMatch: newPassword === repeatPassword, buttonDisabled: newPassword === '' || repeatPassword === '' });
  },

  setRepeatPassword: (repeatPassword) => {
    set({ repeatPassword });
    const { newPassword } = get();
    set({ isPasswordMatch: newPassword === repeatPassword, buttonDisabled: newPassword === '' || repeatPassword === '' });
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

  save: async () => {
    const { oldPassword, newPassword, isPasswordMatch } = get();
    if (!isPasswordMatch || !oldPassword || !newPassword) {
      set({ error: true, success: false });
      return;
    }

    try {
      // Simulate API call
      // Example: await axios.post('/api/change-password', { oldPassword, newPassword });
      set({ success: true, error: false });
    } catch (err) {
      set({ error: true, success: false });
    }
  },
}));
