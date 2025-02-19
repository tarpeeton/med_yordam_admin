import { create } from 'zustand';
import axios from 'axios';
import { useAddressStore, AddressEntry } from './address';
import { useUploadFiles } from './gallery';
import { clinickServiceStore, BackendServiceResponse } from './service';
import { useSertificatesStore, AboutUsItem, IAdress } from './sertificates';

export interface ImageData {
  id: number;
  url: string;
}

export interface ClinicProfileData {
  id: string | number | null;
  cityId: number | null;
  name: string;
  experience: number | null;
  phone: string;
  phone2: string;
  workFrom: string;
  workTo: string;
  logo: string | File | ImageData | null;
  photo: string | File | ImageData | null;
  receptionTimes: AddressEntry[];
  photos?: { id: number; url: string }[];
  certificates?: { id: number; url: string }[];
  services: BackendServiceResponse[];
  aboutUs: AboutUsItem[];
  address: IAdress[];
}

export interface ClinicProfileResponseData extends Partial<ClinicProfileData> {
  slug?: string;
  mainPhoto?: string | ImageData;
  logo?: string | ImageData;
}

export interface ApiResponse<T> {
  data: T;
}

export interface ClinicProfileActions {
  setFormData: (data: Partial<ClinicProfileData>) => void;
  saveClinicProfile: () => Promise<boolean>;
  getclinickWithslug: (slug: string) => Promise<boolean>;
}

export type ClinicProfileStore = ClinicProfileData & ClinicProfileActions;

const buildFormData = (data: Partial<ClinicProfileData>): FormData => {
  const formData = new FormData();

  const profileData: Record<string, any> = {
    cityId: data.cityId,
    name: data.name,
    experience: data.experience,
    phone: data.phone,
    phone2: data.phone2,
    workFrom: data.workFrom,
    workTo: data.workTo,
  };

  if (data.id !== null && data.id !== undefined) {
    profileData.id = data.id;
  }

  formData.append('json', JSON.stringify(profileData));

  if (data.logo !== undefined) {
    if (data.logo instanceof File) {
      formData.append('logo', data.logo);
    } else if (typeof data.logo === 'string' && data.logo) {
      formData.append('logoUrl', data.logo);
    }
  }

  if (data.photo !== undefined) {
    if (data.photo instanceof File) {
      formData.append('mainPhoto', data.photo);
    } else if (typeof data.photo === 'string' && data.photo) {
      formData.append('photoUrl', data.photo);
    }
  }

  return formData;
};

export const useClinicProfileStore = create<ClinicProfileStore>((set, get) => {
  let savedData: ClinicProfileData = {
    id: null,
    cityId: 1,
    name: '',
    experience: null,
    phone: '',
    phone2: '',
    workFrom: '',
    workTo: '',
    logo: null,
    photo: null,
    receptionTimes: [],
    services: [],
    certificates: [],
    address: [],
    aboutUs: [],
  };

  return {
    ...savedData,

    setFormData: (data: Partial<ClinicProfileData>) => {
      set((state) => ({
        ...state,
        ...data,
      }));
    },

    saveClinicProfile: async () => {
      const token = sessionStorage.getItem('token') || '';
      const currentState = get();

      if (currentState.id) {
        const diff: Partial<ClinicProfileData> = {};
        (Object.keys(currentState) as (keyof ClinicProfileData)[]).forEach(
          (key) => {
            if (currentState[key] !== savedData[key]) {
              (diff as any)[key] = currentState[key];
            }
          }
        );

        if (Object.keys(diff).length === 0) {
          console.log('No changes detected, skipping update.');
          return true;
        }

        (diff as any).id = currentState.id;

        const formData = buildFormData(diff);
        try {
          const response = await axios.put<
            ApiResponse<ClinicProfileResponseData>
          >('https://medyordam.result-me.uz/api/clinic', formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          });

          const responseData = response.data.data;
          set({
            id: responseData.id ?? currentState.id,
            cityId: responseData.cityId ?? currentState.cityId,
            name: responseData.name ?? currentState.name,
            experience: responseData.experience ?? currentState.experience,
            phone: responseData.phone ?? currentState.phone,
            phone2: responseData.phone2 ?? currentState.phone2,
            workFrom: responseData.workFrom ?? currentState.workFrom,
            workTo: responseData.workTo ?? currentState.workTo,
            logo: responseData.logo ?? currentState.logo,
            photo: responseData.mainPhoto ?? currentState.photo,
          });
          if (responseData.slug) {
            localStorage.setItem('slug', responseData.slug);
          }
          savedData = get();
          return true;
        } catch (error) {
          console.error('Update (PUT) error:', error);
          return false;
        }
      } else {
        const formData = buildFormData(currentState);
        try {
          const response = await axios.post<
            ApiResponse<ClinicProfileResponseData>
          >('https://medyordam.result-me.uz/api/clinic', formData, {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'multipart/form-data',
            },
          });

          const responseData = response.data.data;
          set({
            id: responseData.id,
            cityId: responseData.cityId ?? currentState.cityId,
            name: responseData.name ?? currentState.name,
            experience: responseData.experience ?? currentState.experience,
            phone: responseData.phone ?? currentState.phone,
            phone2: responseData.phone2 ?? currentState.phone2,
            workFrom: responseData.workFrom ?? currentState.workFrom,
            workTo: responseData.workTo ?? currentState.workTo,
            logo: responseData.logo ?? currentState.logo,
            photo: responseData.mainPhoto ?? currentState.photo,
          });
          if (responseData.slug) {
            localStorage.setItem('slug', responseData.slug);
          }
          savedData = get();
          return true;
        } catch (error) {
          console.error('Creation (POST) error:', error);
          return false;
        }
      }
    },

    getclinickWithslug: async (slug: string) => {
      const token = sessionStorage.getItem('token') || '';
      try {
        const response = await axios.get<
          ApiResponse<ClinicProfileResponseData>
        >(`https://medyordam.result-me.uz/api/clinic/${slug}`, {
          headers: {
            'Accept-Language': '',
            Authorization: `Bearer ${token}`,
          },
        });
        const responseData = response.data.data;
        if (responseData) {
          const newState: ClinicProfileData = {
            id: responseData.id ?? null,
            cityId: responseData.cityId ?? 1,
            name: responseData.name ?? '',
            experience: responseData.experience ?? null,
            phone: responseData.phone ?? '',
            phone2: responseData.phone2 ?? '',
            workFrom: responseData.workFrom ?? '',
            workTo: responseData.workTo ?? '',
            logo: responseData.logo ?? null,
            photo: responseData.mainPhoto ?? null,
            receptionTimes: responseData.receptionTimes ?? [],
            services: responseData.services ?? [],
            address: responseData.address ?? [],
            aboutUs: responseData.aboutUs ?? [],
          };
          clinickServiceStore
            .getState()
            .setAllServiceList(responseData?.services || []);
          useUploadFiles.getState().setAllGallery(responseData?.photos || []);
          useSertificatesStore
            .getState()
            .setAllSertificates(responseData?.certificates || []);
          useSertificatesStore
            .getState()
            .setAddressAndAbout(
              responseData?.address || [],
              responseData?.aboutUs || []
            );

          useAddressStore
            .getState()
            .setAllData(responseData?.receptionTimes || []);

          set(newState);
          savedData = newState;
          return true;
        }
        return false;
      } catch (error) {
        console.error('getclinickWithslug error:', error);
        return false;
      }
    },
  };
});
