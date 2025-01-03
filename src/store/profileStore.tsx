import { create } from 'zustand';
import axios from 'axios'
import { multiLang } from '@/interface/multiLang';
import { useRegisterLinks } from '@/store/createLinksStore';
import {useProInfoStore} from '@/store/useProInfoStore';


interface ServerResponse {
  id: number;
  slug: string;
  name: multiLang;
  surname: multiLang;
  patronymic: multiLang;
  exp: number;
  gender: "MALE" | "FEMALE";
  city: {
    id: number;
    name: multiLang;
  } | null;
  photo: {
    id: number;
    url: string;
  } | null;
  contact: {
    id: number;
    phone: string | null;
    instagram: string | null;
    telegram: string | null;
    facebook: string | null;
    youtube: string | null;
  };
  phone: string;
 
}




interface ProfileState {
  id: number;
  name: multiLang;
  surname: multiLang;
  patronymic: multiLang;
  success: boolean;
  slug: string;
  phone: string;
  gender: multiLang;
  exp: number | null;
  image: File | null | string;
  contactId: null | number;
  selectedLang: "ru" | "uz" | "en"; // Current language
  setName: (name: multiLang) => void;
  setSurname: (surname: multiLang) => void;
  setPatronymic: (patronymic: multiLang) => void;
  setPhone: (phone: string) => void;
  setGender: (gender: multiLang) => void;
  setImage: (image: File | null) => void; // Add function to set image
  setLang: (lang: "ru" | "uz" | "en") => void;
  saveProfile: () => void; // To save the profile via an API
  setStage: (exp: number) => void; // To save the profile via an API
  setProfile: (data: ServerResponse) => void;
  setSuccess: (success: boolean) => void;
  getAllDataWithSlug: (slug: string) => void;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  id: 0,
  name: { ru: "", uz: "", en: "" },
  surname: { ru: "", uz: "", en: "" },
  patronymic: { ru: "", uz: "", en: "" },
  slug: "",
  phone: "",
  contactId: null,
  success:false,
  exp: null, 
  gender: { ru: "Мужчина", uz: "Erkak", en: "Male" },
  image: null, 
  selectedLang: "ru", // Default language
  setName: (name) => set({ name }),
  setSuccess: (success) => set({ success }),
  setSurname: (surname) => set({ surname }),
  setProfile: (data: ServerResponse) => {
    set({
      id: data.id,
      contactId: data.contact ? data.contact.id : null, 
      slug: data.slug,
      name: data.name,
      surname: data.surname,
      patronymic: data.patronymic,
      exp: data.exp,
      phone: data.phone,
      image: data.photo?.url || null,
      gender: {
        ru: data.gender === "MALE" ? "Мужчина" : "Женщина",
        uz: data.gender === "MALE" ? "Erkak" : "Ayol",
        en: data.gender === "MALE" ? "Male" : "Female",
      },
    });
  },
  
  
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
  setStage: (exp: number) => set({ exp }), // Explicitly type stage as string

  // Save Profile function
  saveProfile: async () => {
    try {
      const { name, surname, patronymic, phone, image, exp, gender} = get();
      const token = localStorage.getItem("token");
      if (!exp) {
        alert("Experience date is required.");
        return;
      }
  
    
  
      
      const genderEnum = gender.en.toUpperCase(); // Convert gender to MALE/FEMALE
  
      const profileData = {
        name,
        surname,
        patronymic,
        exp: exp, // Send years of experience as an integer
        phone,
        gender: genderEnum,
        cityId: 13, // Assuming cityId is constant
      };
  
      const formData = new FormData();
      formData.append("json", JSON.stringify(profileData));
  
      if (image instanceof File) {
        formData.append("photo", image);
      }
  
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
      set({success:true})

      // Update the profile directly in the store
      const updatedProfile: ServerResponse = response.data.data;
      localStorage.setItem("slug", response.data.data.slug);
      get().setProfile(updatedProfile); // Call setProfile directly
  
      alert("Profile saved successfully!");
    } catch (error) {
      console.error("Error saving profile:", error);
      alert("An error occurred while saving the profile.");
    }
  },
  
  
  
  getAllDataWithSlug: async  (slug:string) => {
    const res = await axios.get(`https://medyordam.result-me.uz/api/doctor/${slug}` , {headers: {"Accept-Language": ""}});
    console.log(res.data.data , 'BU GET ALL DATA WITH SLUG')
    


    get().setProfile(res.data.data);

    useRegisterLinks.getState().setAll(res.data.data.contact.phone, res.data.data.contact.instagram, res.data.data.contact.telegram, res.data.data.contact.facebook, res.data.data.contact.youtube);

    useProInfoStore.getState().setAllData(res.data.data.experience , res.data.data.education , res.data.data.language , res.data.data.speciality , res.data.data.achievement);
  }
  
  
  
}));
