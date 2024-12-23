import { create } from 'zustand';
import axios from 'axios'


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
  gender: multiLang;
  stage: string;
  image: string; // Store the profile image URL
  selectedLang: "ru" | "uz" | "en"; // Current language
  setName: (name: multiLang) => void;
  setSurname: (surname: multiLang) => void;
  setPatronymic: (patronymic: multiLang) => void;
  setPhone: (phone: string) => void;
  setGender: (gender: multiLang) => void;
  setImage: (image: string) => void; // Add function to set image
  setLang: (lang: "ru" | "uz" | "en") => void;
  saveProfile: () => void; // To save the profile via an API
  setStage: (stage: string) => void; // To save the profile via an API
}

export const useProfileStore = create<ProfileState>((set) => ({
  name: { ru: "", uz: "", en: "" },
  surname: { ru: "", uz: "", en: "" },
  patronymic: { ru: "", uz: "", en: "" },
  phone: "",
  stage: "", // Initialize stage as an empty string
  gender: { ru: "Мужчина", uz: "Erkak", en: "Male" },
  image: "", // Initialize image as an empty string
  selectedLang: "ru", // Default language
  setName: (name) => set({ name }),
  setSurname: (surname) => set({ surname }),
  setPatronymic: (patronymic) => set({ patronymic }),
  setPhone: (phone) => set({ phone }),
  setGender: (gender) => set({ gender }),
  setImage: (image) => set({ image }), // Set image function
  setLang: (lang) => set({ selectedLang: lang }),
  setStage: (stage: string) => set({ stage }), // Explicitly type stage as string

  // Save Profile function
  saveProfile: async () => {
    const profileData = {
      name: useProfileStore.getState().name,
      surname: useProfileStore.getState().surname,
      patronymic: useProfileStore.getState().patronymic,
      phone: useProfileStore.getState().phone,
      gender: useProfileStore.getState().gender,
      image: useProfileStore.getState().image, 
      stage: useProfileStore.getState().stage,
    };

    // Example API POST request
    try {
      const response = await axios.post('https://medyordam.result-me.uz/api/doctor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/form-data',
        },
        body: JSON.stringify(profileData),
      });

      // if (!response.ok) {
      //   throw new Error('Failed to save profile');
      // }

      // Handle success (optional)
      alert('Profile saved successfully');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('An error occurred while saving the profile');
    }
  },
}));
