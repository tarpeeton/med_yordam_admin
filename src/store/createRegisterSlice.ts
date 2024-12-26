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
  setPhoneNumber: (phoneNumber) => {
    // Allow only digits, spaces, parentheses, and "+"
    const sanitized = phoneNumber.replace(/[^\d\s()+-]/g, '');
  
    // Automatically format phone number to +998 (XX) XXX-XX-XX
    let formatted = sanitized;
    if (sanitized.startsWith('+998')) {
      formatted = sanitized
        // Full format: +998 (XX) XXX-XX-XX
        .replace(/^(\+998)(\d{2})(\d{3})(\d{2})(\d{2})$/, '$1 ($2) $3-$4-$5')
        // Progressive formats for intermediate typing states
        .replace(/^(\+998)(\d{2})(\d{0,3})$/, '$1 ($2) $3')
        .replace(/^(\+998)(\d{2})$/, '$1 ($2)');
    }
  
    // Validate full phone number format
    const isValidPhoneNumber = /^\+998 \(\d{2}\) \d{3}-\d{2}-\d{2}$/.test(formatted);
  
    set({
      phoneNumber: formatted,
      buttonDisabled: !isValidPhoneNumber, // Disable button if the phone number is invalid
    });
  
   
  },
  




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
