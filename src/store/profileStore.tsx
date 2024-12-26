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

export const useProfileStore = create<ProfileState>((set, get) => ({
  name: { ru: "", uz: "", en: "" },
  surname: { ru: "", uz: "", en: "" },
  patronymic: { ru: "", uz: "", en: "" },
  phone: "",
  stage: "", // Initialize stage with an empty string
  gender: { ru: "Мужчина", uz: "Erkak", en: "Male" },
  image: "", // Initialize image as an empty string
  selectedLang: "ru", // Default language
  setName: (name) => set({ name }),
  setSurname: (surname) => set({ surname }),
  setPatronymic: (patronymic) => set({ patronymic }),
  setPhone: (phone) => {
    // Allow only digits, spaces, parentheses, and "+"
    const sanitized = phone.replace(/[^\d\s()+-]/g, '');

    // Automatically format phone number to +998 (XX) XXX-XX-XX
    let formatted = sanitized;
    if (sanitized.startsWith('+998')) {
      formatted = sanitized
        .replace(/^(\+998)(\d{2})(\d{3})(\d{2})(\d{2})$/, '$1 ($2) $3-$4-$5') // Full format
        .replace(/^(\+998)(\d{2})(\d{0,3})$/, '$1 ($2) $3') // Partial formats
        .replace(/^(\+998)(\d{2})$/, '$1 ($2)'); // Handle first few digits
    }

    set({ phone: formatted });
  },


  setGender: (gender) => set({ gender }),
  setImage: (image) => set({ image }), // Set image function
  setLang: (lang) => set({ selectedLang: lang }),
  setStage: (stage: string) => set({ stage }), // Explicitly type stage as string

  // Save Profile function
  saveProfile: async () => {
    try {
      const { name, surname, patronymic, phone, image, stage } = get();
      const token = localStorage.getItem("token"); // Replace with the actual token
  
      // Validate and format the `stage` value
      let exp = stage.trim(); // Remove any extra spaces
      if (!/^\d{4}\/\d{2}\/\d{2}$/.test(stage)) {
        const parsedDate = new Date(stage);
        if (isNaN(parsedDate.getTime())) {
          // If `stage` is invalid, set a fallback or throw an error
          console.error("Invalid stage value:", stage);
          alert("Invalid experience date. Please use a valid date format.");
          return;
        }
        const year = parsedDate.getFullYear();
        const month = String(parsedDate.getMonth() + 1).padStart(2, "0"); // Month is 0-indexed
        const day = String(parsedDate.getDate()).padStart(2, "0");
        exp = `${year}/${month}/${day}`;
      }
  
      // Create the JSON data
      const profileData = {
        name,
        surname,
        patronymic,
        exp, // Formatted experience date in YYYY/MM/DD format
        phone,
      };
  
      // Create FormData
      const formData = new FormData();
      formData.append("json", JSON.stringify(profileData));
  
      // Append the photo file (if available)
      if (image) {
        formData.append("photo", image);
      }
  
      // Send the POST request to the API
      const response = await axios.post(
        "https://medyordam.result-me.uz/api/doctor",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      console.log("Profile saved successfully:", response.data);
      alert("Profile saved successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("An error occurred while saving the profile.");
    }
  }
  

}));
