import { create } from 'zustand';

interface RegisterState {
  phoneNumber: string;
  password: string;
  repeatPassword: string;
  isPasswordMatch: boolean;
  success: boolean;
  error: boolean;
  registerVerifyCode: string;
  buttonDisabled: boolean; // Added buttonDisabled state
  setPhoneNumber: (phoneNumber: string) => void;
  setPassword: (password: string) => void;
  setRegisterCode: (code: string) => void;
  setRepeatPassword: (repeatPassword: string) => void;
  setError: () => void;
  setSuccess: () => void;
  resetForm: () => void;
}

export const useRegisterStore = create<RegisterState>((set, get) => ({
  phoneNumber: '',
  password: '',
  repeatPassword: '',
  registerVerifyCode: '',
  success: false,
  error: false,
  buttonDisabled: true,  // Initial button state is disabled
  isPasswordMatch: true, 
  setPhoneNumber: (phoneNumber) => set({ phoneNumber }),
  setRegisterCode: (registerVerifyCode) => {
    const isValidCode = /^[0-9]{6}$/.test(registerVerifyCode); // Validate 6-digit code
    set({ 
      registerVerifyCode, 
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
  resetForm: () => set({ phoneNumber: '', password: '', repeatPassword: '', isPasswordMatch: true, registerVerifyCode: '' }),
  setError: () => set({ error: true, success: false }),
  setSuccess: () => set({ success: true, error: false }),
}));
