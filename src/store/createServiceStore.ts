import { create } from 'zustand';
import axios from 'axios';
import { multiLang } from '@/interface/multiLang';
import { useProfileStore } from '@/store/profileStore';

interface Service {
  id?: number;
  name: multiLang;
  price: number;
}

interface IPromotions {
  id: string;
  address: {
    ru: string;
    uz: string;
    en: string;
  };
  phone: string;
  title: {
    ru: string;
    uz: string;
    en: string;
  };
  discountPercentage: number;
  description: {
    ru: string;
    uz: string;
    en: string;
  };
  imageUrl: string;
  imageFile?: File;
}

interface ServiceStoreType {
  services: Service[];
  newService: Service;
  newPromotion: IPromotions;
  promotions: IPromotions[];
  setNewServiceName: (lang: keyof multiLang, value: string) => void;
  setNewServicePrice: (price: number) => void;
  addService: () => void;
  addPromotion: () => void;
  setServicesFromOtherStore: (priceList: Service[]) => void;
  updateServiceFieldByIndex: (
    index: number,
    field: keyof Service,
    lang: keyof multiLang | null,
    value: string | number
  ) => void;
  updatePromotionFieldByIndex: (
    index: number,
    field: keyof IPromotions,
    lang: keyof multiLang | null,
    value: string | number | File
  ) => void;
  deleteServiceByIndex: (index: number) => Promise<boolean>;
  save: () => Promise<boolean>;
}

export const useServiceStore = create<ServiceStoreType>((set, get) => ({
  services: [
    {
      name: { ru: '', uz: '', en: '' },
      price: 0,
    },
  ],
  newService: {
    name: { ru: '', uz: '', en: '' },
    price: 0,
  },
  promotions: [
    {
      id: '1',
      address: {
        ru: '',
        uz: '',
        en: '',
      },
      phone: '',
      title: {
        ru: '',
        uz: '',
        en: '',
      },
      discountPercentage: 20,
      description: {
        ru: '',
        uz: '',
        en: '',
      },
      imageUrl: 'https://example.com/image.jpg',
      imageFile: undefined,
    },
  ],
  newPromotion: {
    id: '1',
    address: {
      ru: '',
      uz: '',
      en: '',
    },
    phone: '',
    title: {
      ru: '',
      uz: '',
      en: '',
    },
    discountPercentage: 20,
    description: {
      ru: '',
      uz: '',
      en: '',
    },
    imageUrl: 'https://example.com/image.jpg',
    imageFile: undefined,
  },

  setNewServiceName: (lang, value) => {
    set((state) => ({
      newService: {
        ...state.newService,
        name: { ...state.newService.name, [lang]: value },
      },
    }));
  },

  addPromotion: () => {
    set((state) => ({
      promotions: [...state.promotions, state.newPromotion],
      newPromotion: {
        id: '',
        title: { ru: '', uz: '', en: '' },
        description: { ru: '', uz: '', en: '' },
        discountPercentage: 0,
        imageUrl: '',
        imageFile: undefined,
        address: { ru: '', uz: '', en: '' },
        phone: '',
      },
    }));
  },

  setNewServicePrice: (price) => {
    set((state) => ({
      newService: { ...state.newService, price },
    }));
  },

  addService: () => {
    set((state) => ({
      services: [...state.services, state.newService],
      newService: { name: { ru: '', uz: '', en: '' }, price: 0 },
    }));
  },

  updateServiceFieldByIndex: (index, field, lang, value) => {
    set((state) => ({
      services: state.services.map((service, i) =>
        i === index
          ? {
              ...service,
              [field]: lang
                ? { ...(service[field] as multiLang), [lang]: value }
                : value,
            }
          : service
      ),
    }));
  },

  updatePromotionFieldByIndex: (
    index,
    field: keyof IPromotions,
    lang: keyof multiLang | null,
    value: string | number | File
  ) => {
    set((state) => ({
      promotions: state.promotions.map((promotion, i) =>
        i === index
          ? {
              ...promotion,
              [field]: lang
                ? { ...(promotion[field] as multiLang), [lang]: value }
                : value instanceof File
                  ? { ...promotion, imageFile: value }
                  : value,
            }
          : promotion
      ),
    }));
  },

  deleteServiceByIndex: async (index): Promise<boolean> => {
    const state = get();
    const { services } = state;
    const serviceToDelete = services[index];
    if (serviceToDelete?.id) {
      try {
        const { id: profileId } = useProfileStore.getState();
        const token = sessionStorage.getItem('token');

        const payload = {
          id: profileId,
          priceList: [
            {
              id: serviceToDelete.id.toString(),
              name: { uz: null, ru: null, en: null },
              price: null,
            },
          ],
        };

        await axios.put('https://medyordam.result-me.uz/api/doctor', payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        set((state) => ({
          services: state.services.filter((_, i) => i !== index),
        }));

        return true;
      } catch (error) {
        console.error('Failed to delete service:', error);
        return false;
      }
    } else {
      set((state) => ({
        services: state.services.filter((_, i) => i !== index),
      }));
      return true;
    }
  },

  //  SAVE CHANGES
  save: async (): Promise<boolean> => {
    try {
      const { services } = get();
      const { id } = useProfileStore.getState();
      const token = sessionStorage.getItem('token');

      if (!services.length) {
        return false;
      }

      // Формируем список услуг для отправки
      const priceList = services.map((service) => {
        // Если у сервиса есть id, добавляем его в запрос для обновления
        if (service.id) {
          return {
            id: service.id,
            name: service.name,
            price: service.price,
          };
        }
        // Если id нет, это новый сервис, и он создается без id
        return {
          name: service.name,
          price: service.price,
        };
      });

      // Выполняем запрос
      const response = await axios.put(
        'https://medyordam.result-me.uz/api/doctor',
        { id, priceList },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.data.priceList) {
        set({
          services: response.data.data.priceList.map((service: Service) => ({
            id: service.id,
            name: service.name,
            price: service.price,
          })),
        });
      }

      return true;
    } catch (error) {
      console.error('Failed to save services', error);
      return false;
    }
  },

  setServicesFromOtherStore: (priceList: Service[]) => {
    const transformedServices = priceList.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
    }));

    set({ services: transformedServices });
  },
}));
