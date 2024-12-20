import { create } from 'zustand';

interface multiLang {
  ru: string;
  uz: string;
  en: string;
}

interface ProfileState {
  name: multiLang;
  surname: multiLang;
  patronymic: multiLang;
  phone: string;
  age: number | string;
  gender: "male" | "female" | "other";
  image: string; // Store the profile image URL
  selectedLang: "ru" | "uz" | "en"; // Current language
  setName: (name: multiLang) => void;
  setSurname: (surname: multiLang) => void;
  setPatronymic: (patronymic: multiLang) => void;
  setPhone: (phone: string) => void;
  setAge: (age: number | string) => void;
  setGender: (gender: "male" | "female" | "other") => void;
  setImage: (image: string) => void; // Add function to set image
  setLang: (lang: "ru" | "uz" | "en") => void;
  saveProfile: () => void; // To save the profile via an API
}

export const useProfileStore = create<ProfileState>((set) => ({
  name: { ru: "", uz: "", en: "" },
  surname: { ru: "", uz: "", en: "" },
  patronymic: { ru: "", uz: "", en: "" },
  phone: "",
  age: "",
  gender: "male",
  image: "", // Initialize image as an empty string
  selectedLang: "ru", // Default language
  setName: (name) => set({ name }),
  setSurname: (surname) => set({ surname }),
  setPatronymic: (patronymic) => set({ patronymic }),
  setPhone: (phone) => set({ phone }),
  setAge: (age) => set({ age }),
  setGender: (gender) => set({ gender }),
  setImage: (image) => set({ image }), // Set image function
  setLang: (lang) => set({ selectedLang: lang }),

  // Save Profile function
  saveProfile: async () => {
    const profileData = {
      name: useProfileStore.getState().name,
      surname: useProfileStore.getState().surname,
      patronymic: useProfileStore.getState().patronymic,
      phone: useProfileStore.getState().phone,
      age: useProfileStore.getState().age,
      gender: useProfileStore.getState().gender,
      image: useProfileStore.getState().image, // Include image data
    };

    // Example API POST request
    try {
      const response = await fetch('https://your-api-endpoint.com/profile', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save profile');
      }

      // Handle success (optional)
      alert('Profile saved successfully');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('An error occurred while saving the profile');
    }
  },
}));
