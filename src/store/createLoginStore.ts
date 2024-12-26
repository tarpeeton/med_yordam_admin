import { create } from 'zustand';

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
}

export const useLoginStore = create<LoginState>((set, get) => ({
  phoneNumber: getPersistedPhoneNumber(),  // Retrieve phoneNumber from localStorage
  password: '',
  repeatPassword: '',
  loginVerifyCode: '',
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
        // Progressive formats
        .replace(/^(\+998)(\d{2})(\d{0,3})$/, '$1 ($2) $3')
        .replace(/^(\+998)(\d{2})$/, '$1 ($2)');
    }

    // Validate full phone number
    const isValidPhoneNumber = /^\+998 \(\d{2}\) \d{3}-\d{2}-\d{2}$/.test(formatted);

    set({
      phoneNumber: formatted,
      buttonDisabled: !isValidPhoneNumber, // Disable button if phone number is invalid
    });

    // Save the phoneNumber to localStorage whenever it changes
    if (isValidPhoneNumber) {
      localStorage.setItem('phoneNumber', JSON.stringify(formatted));
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

  setError: () => set({ error: true, success: false }),
  setSuccess: () => set({ success: true, error: false }),
}));
