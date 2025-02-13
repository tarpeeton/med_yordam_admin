import { create } from 'zustand';
import axios from 'axios';

export interface ClinicProfileData {
  cityId: number | null;
  name: string;
  experience: number | null;
  phone: string;
  phone2: string;
  workStart: string;
  workEnd: string;
  logo: string | File | null;
  photo: string | File | null;
}

export interface ClinicProfileActions {
  setFormData: (data: Partial<ClinicProfileData>) => void;
  saveClinicProfile: () => Promise<boolean>;
}

export type ClinicProfileStore = ClinicProfileData & ClinicProfileActions;

export const useClinicProfileStore = create<ClinicProfileStore>((set, get) => ({
  cityId: 1,
  name: '',
  experience: null,
  phone: '',
  phone2: '',
  workStart: '',
  workEnd: '',
  logo: null,
  photo: null,

  setFormData: (data) => {
    set((state) => ({
      ...state,
      ...data,
    }));
  },

  saveClinicProfile: async () => {
    const token = sessionStorage.getItem('token');
    const {
      cityId,
      name,
      experience,
      phone,
      phone2,
      workStart,
      workEnd,
      logo,
      photo,
    } = get();

    try {
      const formData = new FormData();
      const profileData = {
        cityId,
        name,
        experience,
        phone,
        phone2,
        workStart,
        workEnd,
      };
      const profileJson = JSON.stringify(profileData);
      formData.append('json', profileJson);
      if (logo instanceof File) {
        formData.append('logo', logo);
      } else if (typeof logo === 'string' && logo) {
        formData.append('logoUrl', logo);
      }
      if (photo instanceof File) {
        formData.append('photo', photo);
      } else if (typeof photo === 'string' && photo) {
        formData.append('photoUrl', photo);
      }
      const response = await axios.put(
        'https://medyordam.result-me.uz/api/clinic',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token ?? ''}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      );

      if (response.data?.logo) {
        set({ logo: response.data.logo });
      }
      if (response.data?.photo) {
        set({ photo: response.data.photo });
      }

      return true;
    } catch (error) {
      console.error('saveClinicProfile error:', error);
      return false;
    }
  },
}));
