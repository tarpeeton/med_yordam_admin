import { create } from 'zustand';
import axios from 'axios';
import { multiLang } from '@/interface/multiLang';
import { useRegisterLinks } from '@/store/createLinksStore';
import { Achievement, useProInfoStore } from '@/store/useProInfoStore';
import { useServiceStore } from '@/store/createServiceStore';
import { useAddressStore } from '@/store/createAddressStore';
import { useUploadFiles } from './createFilesStore';

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
  gender: 'MALE' | 'FEMALE';
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
  selectedLang: 'ru' | 'uz' | 'en';
  setName: (name: multiLang) => void;
  setSurname: (surname: multiLang) => void;
  setPatronymic: (patronymic: multiLang) => void;
  setPhone: (phone: string) => void;
  photo: null | ServerResponse['photo'];
  setGender: (gender: multiLang) => void;
  setImage: (image: File | null) => void;
  setLang: (lang: 'ru' | 'uz' | 'en') => void;
  setStage: (exp: number) => void;
  setProfile: (data: ServerResponse) => void;
  setSuccess: (success: boolean) => void;
  getAllDataWithSlug: (slug: string) => void;
  saveProfile: () => Promise<boolean>;
}

export const useProfileStore = create<ProfileState>((set, get) => ({
  id: 0,
  name: { ru: '', uz: '', en: '' },
  surname: { ru: '', uz: '', en: '' },
  patronymic: { ru: '', uz: '', en: '' },
  slug: '',
  phone: '',
  contactId: null,
  success: false,
  photo: null,
  exp: null,
  gender: { ru: 'Мужчина', uz: 'Erkak', en: 'Male' },
  image: null,
  selectedLang: 'ru',
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
        ru: data.gender === 'MALE' ? 'Мужчина' : 'Женщина',
        uz: data.gender === 'MALE' ? 'Erkak' : 'Ayol',
        en: data.gender === 'MALE' ? 'Male' : 'Female',
      },
    });
  },

  saveProfile: async (): Promise<boolean> => {
    const { id, name, surname, patronymic, phone, exp, gender, image, photo } =
      get();
    const token = localStorage.getItem('token');

    if (!exp) {
      return false;
    }

    try {
      if (id > 0) {
        // Mavjud profilni update qilayotganda:
        // Agar yangi rasm kiritilgan bo'lsa, uni avvalo update qilamiz
        if (image instanceof File && photo?.id) {
          const formData = new FormData();
          formData.append('new-photo', image);
          await axios.put(
            `https://medyordam.result-me.uz/api/photo/${photo.id}`,
            formData,
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );
          // Eski kodda bu yerda "return true" qilinib, keyingi JSON update so'rovi yuborilmay qolardi.
        }
        // Endi profilning qolgan JSON maʼlumotlarini update qilamiz
        const genderEnum = gender.en.toUpperCase();
        const profileData = {
          id, // mavjud profil uchun id ni jo'natamiz
          name,
          surname,
          patronymic,
          exp,
          phone,
          gender: genderEnum,
        };
        const response = await axios.put(
          'https://medyordam.result-me.uz/api/doctor',
          profileData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Accept-Language': '',
              'Content-Type': 'application/json',
            },
          }
        );
        localStorage.setItem('slug', response.data.data.slug);
        return response.data.data.slug;
      } else {
        // Yangi profil yaratish (id === 0)
        const genderEnum = gender.en.toUpperCase();
        const profileData = {
          id: undefined,
          name,
          surname,
          patronymic,
          exp,
          phone,
          gender: genderEnum,
          cityId: 1,
        };
        const formData = new FormData();
        if (image instanceof File) {
          formData.append('photo', image);
        }
        formData.append('json', JSON.stringify(profileData));
        const response = await axios.post(
          'https://medyordam.result-me.uz/api/doctor',
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Accept-Language': '',
            },
          }
        );
        localStorage.setItem('slug', response.data.data.slug);
        return response.data.data.slug;
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      return false;
    }
  },

  getAllDataWithSlug: async (slug: string) => {
    try {
      const response = await axios.get(
        `https://medyordam.result-me.uz/api/doctor/${slug}`,
        {
          headers: { 'Accept-Language': '' },
        }
      );

      const data = response.data.data;
      get().setProfile(data);
      useUploadFiles.getState().setDocuments(data.documents);
      useServiceStore.getState().setAllPromotion(data.promotionList);
      useServiceStore.getState().setAllServiceList(data.serviceList);
      useAddressStore.getState().setAllData(data.receptionTime);

      const { phone, instagram, telegram, facebook, youtube } = data.contact;
      useRegisterLinks
        .getState()
        .setAll(phone, instagram, telegram, facebook, youtube);

      useProInfoStore
        .getState()
        .setAllData(
          data.experience,
          data.education,
          data.language,
          data.speciality,
          transformAchievements(data.achievement),
          data.quote
        );
    } catch (error) {
      console.error('Error loading profile data:', error);
    }
  },
}));
