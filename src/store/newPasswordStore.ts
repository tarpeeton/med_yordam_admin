import { create } from 'zustand';

interface NewPassword {
  newPhoneNumber: string;
  password: string;
  repeatPassword: string;
  isPasswordMatch: boolean;
  buttonDisabled: boolean; // Added buttonDisabled state
  setPhoneNumber: (phoneNumber: string) => void;
  setPassword: (password: string) => void;
  setRepeatPassword: (repeatPassword: string) => void;
  resetForm: () => void;
}

export const useNewPasswordStore = create<NewPassword>((set, get) => ({
  newPhoneNumber: '',
  password: '',
  repeatPassword: '',
  buttonDisabled: true,  // Initial button state is disabled
  isPasswordMatch: true, 
  setPhoneNumber: (newPhoneNumber) => set({ newPhoneNumber }),
  setPassword: (password) => {
    set({ password });
    const { repeatPassword } = get();
    const isMatch = password === repeatPassword;
    set({ isPasswordMatch: isMatch, buttonDisabled: !isMatch });
  },
  setRepeatPassword: (repeatPassword) => {
    set({ repeatPassword });
    const { password } = get();
    const isMatch = password === repeatPassword;
    set({ isPasswordMatch: isMatch, buttonDisabled: !isMatch });
  },
  resetForm: () => set({ newPhoneNumber: '', password: '', repeatPassword: '', isPasswordMatch: true, buttonDisabled: true }),
}));
