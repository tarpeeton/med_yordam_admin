import { create } from 'zustand';
import axios from 'axios';

// Интерфейс для изображения
export interface ImageData {
  id: number;
  url: string;
}

// Основной интерфейс для данных клиники
export interface ClinicProfileData {
  id: string | number | null | undefined;
  cityId: number | null;
  name: string;
  experience: number | null;
  phone: string;
  phone2: string;
  workFrom: string;
  workTo: string;
  // logo и photo могут быть файлом, строкой или объектом с id и url
  logo: string | File | ImageData | null;
  photo: string | File | ImageData | null;
}

// Интерфейс для данных, возвращаемых с сервера. Он расширяет ClinicProfileData,
// но сервер может возвращать дополнительные поля (например, slug) или переименованные (mainPhoto вместо photo).
export interface ClinicProfileResponseData extends Partial<ClinicProfileData> {
  slug?: string;
  // Если сервер возвращает фото под именем mainPhoto:
  mainPhoto?: string | ImageData;
  // Если сервер возвращает logo по-другому:
  logo?: string | ImageData;
}

// Универсальный интерфейс для ответа API.
// Если сервер возвращает данные сразу (без вложенного объекта), то используем такую структуру:
export interface ApiResponse<T> {
  data: T;
}

export interface ClinicProfileActions {
  setFormData: (data: Partial<ClinicProfileData>) => void;
  saveClinicProfile: () => Promise<boolean>;
  getclinickWithslug: (slug: string) => Promise<boolean>;
}

export type ClinicProfileStore = ClinicProfileData & ClinicProfileActions;

/**
 * Функция buildFormData формирует FormData, в которое помещается одно поле "json"
 * (содержащее сериализованный JSON с основными данными, включая id, если оно есть),
 * а также прикрепляются файлы (logo и photo) отдельно.
 */
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

  // Если id задан – включаем его в JSON
  if (data.id !== undefined && data.id !== null) {
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
              diff[key] = currentState[key];
            }
          }
        );

        if (Object.keys(diff).length === 0) {
          console.log('No changes detected, skipping update.');
          return true;
        }

        diff.id = currentState.id;

        const formData = buildFormData(diff);
        try {
          const response = await axios.put<
            ApiResponse<ClinicProfileResponseData>
          >(`https://medyordam.result-me.uz/api/clinic`, formData, {
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
            id: responseData.id,
            cityId: responseData.cityId ?? 1,
            name: responseData.name ?? '',
            experience: responseData.experience ?? null,
            phone: responseData.phone ?? '',
            phone2: responseData.phone2 ?? '',
            workFrom: responseData.workFrom ?? '',
            workTo: responseData.workTo ?? '',
            logo: responseData.logo ?? null,
            photo: responseData.mainPhoto ?? null,
          };
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
