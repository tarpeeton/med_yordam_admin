import { create } from 'zustand';
import axios from 'axios';
import { multiLang } from '@/interface/multiLang';
import { useRegisterLinks } from '@/store/clinick/doctor/createLinksStore';

import {
  Achievement,
  useProInfoStore,
} from '@/store/clinick/doctor/useProInfoStore';
import { useServiceStore } from '@/store/clinick/doctor/createServiceStore';
import { useAddressStore } from '@/store/clinick/doctor/createAddressStore';
import { useUploadFiles } from './createFilesStore';
import { useClinicProfileStore } from '../profile';

export const transformAchievements = (data: {
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
  refreshDoctorData: () => void;
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
    const { id, name, surname, patronymic, phone, exp, gender, image } = get();
    const token = sessionStorage.getItem('token');

    if (!exp) {
      return false;
    }

    try {
      const formData = new FormData();
      if (image instanceof File) {
        formData.append('photo', image);
      }
      const genderEnum = gender.en.toUpperCase();

      const profileJson = JSON.stringify({
        id: id > 0 ? id : undefined,
        name,
        surname,
        patronymic,
        exp,
        phone,
        gender: genderEnum,
        ...(id === 0 && { cityId: 1 }),
      });
      formData.append('json', profileJson);

      const clinicId = useClinicProfileStore.getState().id;
      formData.append('clinicId', String(clinicId));

      let response;

      if (id > 0) {
        const endpoint = `https://medyordam.result-me.uz/api/clinic/update-doctor`;
        response = await axios.put(endpoint, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Accept-Language': '',
          },
        });
      } else {
        const endpoint = 'https://medyordam.result-me.uz/api/clinic/add-doctor';
        response = await axios.post(endpoint, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Accept-Language': '',
          },
        });
      }
      const clincikSlug = localStorage.getItem('slug');
      useClinicProfileStore.getState().getclinickWithslug(clincikSlug || '');

      set({ success: true });
      const updatedProfile: ServerResponse = response.data.data;
      localStorage.setItem('slug-doctor', updatedProfile.slug);
      get().setProfile(updatedProfile);
      return true;
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

  refreshDoctorData: () => {
    useUploadFiles.getState().setDocuments([]);
    useServiceStore.getState().setAllPromotion([]);
    useServiceStore.getState().setAllServiceList([]);
    useAddressStore.getState().setAllData([]);

    useRegisterLinks.getState().setAll('', '', '', '', '');

    useProInfoStore
      .getState()
      .setAllData([], [], [], [], [], { ru: '', uz: '', en: '' });
    set({
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
    });
  },
}));
