import { create } from 'zustand';
import axios from 'axios';

import { multiLang } from '@/interface/multiLang';
import { useProfileStore } from '@/store/profileStore';

function generateYandexMapsWhatshereLink(
  lat: number,
  lon: number,
  zoom = 16
): string {
  return `
    https://yandex.uz/maps/
    ?ll=${lon}%2C${lat}
    &mode=whatshere
    &whatshere[point]=${lon}%2C${lat}
    &whatshere[zoom]=${zoom}
    &z=${zoom}
  `.replace(/\s+/g, '');
}

export interface AddressDay {
  id?: string;
  dayOfWeek: string;
  from: string;
  to: string;
}

export interface AddressEntry {
  id?: string;
  address: multiLang;
  clinicName: string;
  days: AddressDay[];
  price: string;
  landmark: string;
  location: { latitude: number; longitude: number };
  addressLink?: string;
  orientir: multiLang;
}

interface AddressState {
  mapData: AddressEntry[];
  addAddress: (entry: AddressEntry) => void;
  updateAddress: (index: number, updatedData: Partial<AddressEntry>) => void;
  deleteAddress: (id: string) => void;
  save: () => Promise<boolean>;
  setAllData: (data: AddressEntry[]) => void;
}

export const useAddressStore = create<AddressState>((set, get) => ({
  mapData: [],

  addAddress: (entry) =>
    set((state) => ({
      mapData: [
        ...state.mapData,
        {
          ...entry,
          address: {
            ru: entry.address.ru || '',
            uz: entry.address.uz || '',
            en: entry.address.en || '',
          },
          orientir: {
            ru: entry.orientir.ru || '',
            uz: entry.orientir.uz || '',
            en: entry.orientir.en || '',
          },
        },
      ],
    })),

  updateAddress: (index, updatedData: Partial<AddressEntry>) =>
    set((state) => ({
      mapData: state.mapData.map((item, idx) => {
        if (idx !== index) return item;
        const newLat = updatedData.location?.latitude ?? item.location.latitude;
        const newLon =
          updatedData.location?.longitude ?? item.location.longitude;
        const newLink =
          newLat && newLon
            ? generateYandexMapsWhatshereLink(newLat, newLon)
            : '';
        return {
          ...item,
          ...updatedData,
          location: {
            latitude: newLat,
            longitude: newLon,
          },

          addressLink: updatedData.addressLink ?? newLink,
          address: updatedData.address
            ? {
                ru: updatedData.address.ru ?? item.address.ru,
                uz: updatedData.address.uz ?? item.address.uz,
                en: updatedData.address.en ?? item.address.en,
              }
            : item.address,

          orientir: updatedData.orientir
            ? {
                ru: updatedData.orientir.ru ?? item.orientir.ru,
                uz: updatedData.orientir.uz ?? item.orientir.uz,
                en: updatedData.orientir.en ?? item.orientir.en,
              }
            : item.orientir,

          days: updatedData.days
            ? updatedData.days.map((updDay, i) => {
                const originalDay = item.days[i];
                return {
                  ...originalDay,
                  ...updDay,
                  ...(updDay.id || originalDay?.id
                    ? { id: updDay.id || originalDay?.id }
                    : {}),
                };
              })
            : item.days,
        };
      }),
    })),

  deleteAddress: (id: string) => {
    const state = get();
    const itemToDelete = state.mapData.find(
      (item: AddressEntry) => item.id === id
    );
    if (!itemToDelete) return;

    set({
      mapData: state.mapData.filter((item: AddressEntry) => item.id !== id),
    });

    const doctorId = useProfileStore.getState().id;

    const payload = {
      id: doctorId,
      receptionTime: [{ id: itemToDelete.id }],
    };

    axios
      .put('https://medyordam.result-me.uz/api/doctor', payload, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          'Content-Type': 'application/json',
        },
      })
      .then((response) => {
        console.log('Deletion successful:', response.data);
      })
      .catch((error) => {
        console.error('Error deleting address:', error);
      });
  },

  save: async (): Promise<boolean> => {
    try {
      const mapData = get().mapData;
      const { id } = useProfileStore.getState();
      const token = sessionStorage.getItem('token');

      if (mapData.length === 0) {
        throw new Error('No addresses to save');
      }

      // Готовим данные для отправки на бэкенд
      const receptionTime = mapData.map((entry) => ({
        ...(entry.id ? { id: entry.id } : {}),
        days: entry.days.map((day) => ({
          ...(day.id ? { id: day.id } : {}),
          dayOfWeek: day.dayOfWeek.toUpperCase(),
          from: day.from,
          to: day.to,
        })),
        address: {
          uz: entry.address.uz,
          ru: entry.address.ru,
          en: entry.address.en,
        },
        addressLink: entry.addressLink || '',
        clinicName: entry.clinicName || '',
        orientir: {
          uz: entry.orientir.uz,
          ru: entry.orientir.ru,
          en: entry.orientir.en,
        },
        price: entry.price || '',
        latitude: entry.location.latitude,
        longitude: entry.location.longitude,
      }));

      // Отправляем PUT-запрос на сервер
      const response = await axios.put(
        'https://medyordam.result-me.uz/api/doctor',
        {
          id,
          receptionTime,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      // Если сервер вернул обновлённый массив receptionTime — сохраняем его локально
      if (response.data?.data?.receptionTime) {
        get().setAllData(response.data.data.receptionTime);
      }

      return true;
    } catch (error) {
      console.error('Error saving addresses:', error);
      return false;
    }
  },

  setAllData: (data: any[]) => {
    const formattedData: AddressEntry[] = data.map((item) => ({
      id: item.id.toString(),
      address: {
        uz: item.address?.uz || '',
        ru: item.address?.ru || '',
        en: item.address?.en || '',
      },
      clinicName: item.clinicName || '',
      days: item.days.map((day: any) => ({
        id: day.id,
        dayOfWeek: day.dayOfWeek || '',
        from: day.from || '',
        to: day.to || '',
      })),
      price: item.price?.toString() || '',
      landmark: item.orientir?.ru || '',
      location: {
        latitude: item.latitude || 0,
        longitude: item.longitude || 0,
      },
      addressLink: item.addressLink || '',
      orientir: {
        uz: item.orientir?.uz || '',
        ru: item.orientir?.ru || '',
        en: item.orientir?.en || '',
      },
    }));

    set({ mapData: formattedData });
  },
}));
