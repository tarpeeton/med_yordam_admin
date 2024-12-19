import { create } from 'zustand';

interface RegisterState {
  phoneNumber: string;
  password: string;
  repeatPassword: string;
  isPasswordMatch: boolean;
  setPhoneNumber: (phoneNumber: string) => void;
  setPassword: (password: string) => void;
  setRepeatPassword: (repeatPassword: string) => void;
  resetForm: () => void;
}

export const useRegisterStore = create<RegisterState>((set, get) => ({
  phoneNumber: '',
  password: '',
  repeatPassword: '',
  isPasswordMatch: true, // Dastlab bir xil deb hisoblanadi
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  setPassword: (password) => {
    set({ password });
    const { repeatPassword } = get();
    // Parol mosligini tekshirish
    set({ isPasswordMatch: password === repeatPassword });
  },
  setRepeatPassword: (repeatPassword) => {
    set({ repeatPassword });
    const { password } = get();
    // Parol mosligini tekshirish
    set({ isPasswordMatch: password === repeatPassword });
  },
  resetForm: () => set({ phoneNumber: '', password: '', repeatPassword: '', isPasswordMatch: true }),
}));
