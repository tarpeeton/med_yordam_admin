import { create } from 'zustand';
import axios from 'axios';
import { multiLang } from '@/interface/multiLang';
import { useRegisterLinks } from '@/store/createLinksStore';
import { Achievement, useProInfoStore } from '@/store/useProInfoStore';
import { useServiceStore } from '@/store/createServiceStore';




const transformAchievements = (data: {
  ru: string[];
  uz: string[];
  en: string[];
}): Achievement[] => {
  const length = Math.max(data.ru.length, data.uz.length, data.en.length);
  return Array.from({ length }, (_, i) => ({
    ru: data.ru[i] ? [data.ru[i]] : [],
    uz: data.uz[i] ? [data.uz[i]] : [],
    en: data.en[i] ? [data.en[i]] : [],
  }));
};

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
  selectedLang: "ru" | "uz" | "en";
  setName: (name: multiLang) => void;
  setSurname: (surname: multiLang) => void;
  setPatronymic: (patronymic: multiLang) => void;
  setPhone: (phone: string) => void;
  photo: null | ServerResponse["photo"];
  setGender: (gender: multiLang) => void;
  setImage: (image: File | null) => void;
  setLang: (lang: "ru" | "uz" | "en") => void;
  setStage: (exp: number) => void;
  setProfile: (data: ServerResponse) => void;
  setSuccess: (success: boolean) => void;
  getAllDataWithSlug: (slug: string) => void;
  saveProfile: () => Promise<boolean>;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  id: 0,
  name: { ru: "", uz: "", en: "" },
  surname: { ru: "", uz: "", en: "" },
  patronymic: { ru: "", uz: "", en: "" },
  slug: "",
  phone: "",
  contactId: null,
  success: false,
  photo: null,
  exp: null,
  gender: { ru: "Мужчина", uz: "Erkak", en: "Male" },
  image: null,
  selectedLang: "ru",
  setName: (name) => set({ name }),
  setSurname: (surname) => set({ surname }),
  setPatronymic: (patronymic) => set({ patronymic }),
  setPhone: (phone) => {
    let sanitized = phone.replace(/[^\d\s+]/g, '');
    if (!sanitized.startsWith('+')) sanitized = `+${sanitized}`;
    sanitized = sanitized.replace(/\s+/g, ' ').trim();
    set({ phone: sanitized });
  },
  setGender: (gender) => set({ gender }),
  setImage: (image) => set({ image }),
  setLang: (lang) => set({ selectedLang: lang }),
  setStage: (exp) => set({ exp }),
  setSuccess: (success) => set({ success }),

  setProfile: (data: ServerResponse) => {
    set({
      id: data.id,
      contactId: data.contact?.id || null,
      slug: data.slug,
      name: data.name,
      surname: data.surname,
      patronymic: data.patronymic,
      exp: data.exp,
      phone: data.phone,
      image: data.photo?.url || null,
      photo: data?.photo || null,
      gender: {
        ru: data.gender === "MALE" ? "Мужчина" : "Женщина",
        uz: data.gender === "MALE" ? "Erkak" : "Ayol",
        en: data.gender === "MALE" ? "Male" : "Female",
      },
    });
  },

  saveProfile: async (): Promise<boolean> => {
    const { id, name, surname, patronymic, phone, exp, gender  , image , photo} = get();
    const token = localStorage.getItem("token");
  
    if (!exp) {
      toastr.error("Experience date is required.");
      return false; // Возвращаем false при ошибке
    }
   
  
    const genderEnum = gender.en.toUpperCase();
    
    // Формирование данных профиля
    const profileData = {
      id: id > 0 ? id : undefined, // Include id only for updates
      name,
      surname,
      patronymic,
      exp,
      phone,
      gender: genderEnum,
      ...(id === 0 && { cityId: 13 }),
    };
  
    try {

      if (image instanceof File) {
        const formData = new FormData();
        formData.append("new-photo", image); // The key should match your API requirements
  
        // API endpoint for image update
        const imageUploadEndpoint = `https://medyordam.result-me.uz/api/photo/${photo?.id}`;
  
        const headers = {
          Authorization: `Bearer ${token}`,
        };
  
        // Upload the image
        const imageResponse = await axios.put(imageUploadEndpoint, formData, { headers });
        console.log("Image updated successfully:", imageResponse.data);
      }


      const endpoint = "https://medyordam.result-me.uz/api/doctor";
      const headers = {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      };
  
      let response;
      if (id === 0) {
        response = await axios.post(endpoint, profileData, { headers });
      } else {
        response = await axios.put(endpoint, profileData, { headers });
      }
  
      set({ success: true });
      const updatedProfile: ServerResponse = response.data.data;
      localStorage.setItem("slug", updatedProfile.slug);
      get().setProfile(updatedProfile);
      return true; // Возвращаем true при успехе
    } catch (error) {
      console.error("Error saving profile:", error);
      return false; // Возвращаем false при ошибке
    }
  },
  



  getAllDataWithSlug: async (slug) => {
    try {
      const response = await axios.get(`https://medyordam.result-me.uz/api/doctor/${slug}`, {
        headers: { "Accept-Language": "" },
      });

      const data = response.data.data;
      get().setProfile(data);

      const { phone, instagram, telegram, facebook, youtube } = data.contact;
      useRegisterLinks.getState().setAll(phone, instagram, telegram, facebook, youtube);

      useProInfoStore.getState().setAllData(
        data.experience,
        data.education,
        data.language,
        data.speciality,
        transformAchievements(data.achievement)
      );

      useServiceStore.getState().setServicesFromOtherStore(data.priceList);
    } catch (error) {
      console.error("Error loading profile data:", error);
    }
  },
}));
