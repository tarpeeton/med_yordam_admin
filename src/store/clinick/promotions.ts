import { create } from 'zustand';
import axios from 'axios';
import { multiLang } from '@/interface/multiLang';
import { useClinicProfileStore } from '@/store/clinick/profile';

interface BackendPromotion {
  id: number;
  address: {
    ru: string;
    uz: string;
    en: string;
  };
  addressLink: string;
  phone: string;
  title: {
    ru: string;
    uz: string;
    en: string;
  };
  description: {
    ru: string;
    uz: string;
    en: string;
  };
  percent: number;
  photo: {
    id: number;
    url: string;
  } | null;
}

export interface IPromotions {
  id?: string;
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
  discountPercentage?: number;
  description: {
    ru: string;
    uz: string;
    en: string;
  };
  imageUrl: string;
  imageFile?: File;
  photoId?: number;
}

interface PromotionStoreType {
  promotions: IPromotions[];
  newPromotion: IPromotions;
  addPromotion: () => void;
  updatePromotionFieldByIndex: (
    index: number,
    field: keyof IPromotions,
    lang: keyof multiLang | null,
    value: string | number | File
  ) => void;
  deletePromotionByIndex: (index: number) => Promise<boolean>;
  setAllPromotion: (promotionList: BackendPromotion[]) => void;
  savePromotions: () => Promise<boolean>;
}

export const useClinicPromotions = create<PromotionStoreType>((set, get) => ({
  promotions: [
    {
      address: { ru: '', uz: '', en: '' },
      phone: '',
      title: { ru: '', uz: '', en: '' },
      description: { ru: '', uz: '', en: '' },
      imageUrl:
        'https://ucarecdn.com/568467e3-d7fd-4272-854e-884e5325aa23/-/preview/354x370/',
      imageFile: undefined,
    },
  ],
  // Yangi promotion uchun default ob'ekt
  newPromotion: {
    address: { ru: '', uz: '', en: '' },
    phone: '',
    title: { ru: '', uz: '', en: '' },
    discountPercentage: 20,
    description: { ru: '', uz: '', en: '' },
    imageUrl:
      'https://ucarecdn.com/568467e3-d7fd-4272-854e-884e5325aa23/-/preview/354x370/',
    imageFile: undefined,
  },

  // Yangi promotion qo'shish funksiyasi
  addPromotion: () => {
    set((state) => ({
      promotions: [...state.promotions, state.newPromotion],
      newPromotion: {
        address: { ru: '', uz: '', en: '' },
        phone: '',
        title: { ru: '', uz: '', en: '' },
        discountPercentage: 0,
        description: { ru: '', uz: '', en: '' },
        imageUrl: '',
        imageFile: undefined,
      },
    }));
  },

  updatePromotionFieldByIndex: (index, field, lang, value) => {
    set((state) => ({
      promotions: state.promotions.map((promotion, i) => {
        if (i !== index) return promotion;
        if (field === 'imageFile' && value instanceof File) {
          return { ...promotion, imageFile: value };
        }
        if (lang) {
          return {
            ...promotion,
            [field]: {
              ...(promotion[field] as multiLang),
              [lang]: value,
            },
          };
        }
        return { ...promotion, [field]: value };
      }),
    }));
  },

  deletePromotionByIndex: async (index: number): Promise<boolean> => {
    const state = get();
    const { promotions } = state;
    const promotionToDelete = promotions[index];
    if (promotionToDelete?.id) {
      try {
        const { id: profileId } = useClinicProfileStore.getState();
        const token = sessionStorage.getItem('token');
        const payload = {
          id: profileId,
          promotionList: [{ id: promotionToDelete.id.toString() }],
        };
        await axios.put('https://medyordam.result-me.uz/api/doctor', payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        set((state) => ({
          promotions: state.promotions.filter((_, i) => i !== index),
        }));
        return true;
      } catch (error) {
        console.error('Failed to delete promotion:', error);
        return false;
      }
    } else {
      set((state) => ({
        promotions: state.promotions.filter((_, i) => i !== index),
      }));
      return true;
    }
  },

  setAllPromotion: (promotionList: BackendPromotion[]) => {
    const transformedPromotions: IPromotions[] = promotionList.map(
      (promo: BackendPromotion): IPromotions => ({
        id: promo.id.toString(),
        address: promo.address,
        phone: promo.phone,
        title: promo.title,
        discountPercentage: promo.percent,
        description: promo.description,
        imageUrl: promo.photo && promo.photo.url ? promo.photo.url : '',
        imageFile: undefined,
        photoId: promo.photo ? promo.photo.id : undefined,
      })
    );
    set({ promotions: transformedPromotions });
  },

  // Promotionsni saqlash funksiyasi: rasm yuklash va promotion ma'lumotlarini API orqali yuborish
  savePromotions: async (): Promise<boolean> => {
    try {
      const { promotions } = get();
      const { id } = useClinicProfileStore.getState();
      const token = sessionStorage.getItem('token');

      const promotion = promotions[0];

      const payload = {
        clinicId: id,
        ...(promotion.id ? { id: promotion.id } : {}),
        title: promotion.title,
        description: promotion.description,
        phone: promotion.phone,
        discount: promotion.discountPercentage,
        address: promotion.address,
      };
      const formData = new FormData();
      formData.append('json', JSON.stringify(payload));

      promotions.forEach((promotion) => {
        if (promotion.imageFile) {
          formData.append('photos', promotion.imageFile);
        }
      });

      const response = await axios.post(
        'https://medyordam.result-me.uz/api/promotion',
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Accept-Language': '',
          },
        }
      );

      if (response.data.data && response.data.data.promotionList) {
        set({
          promotions: response.data.data.promotionList.map(
            (promo: BackendPromotion) => ({
              id: promo.id.toString(),
              address: promo.address,
              phone: promo.phone,
              title: promo.title,
              discountPercentage: promo.percent,
              description: promo.description,
              imageUrl: promo.photo && promo.photo.url ? promo.photo.url : '',
              imageFile: undefined,
              photoId: promo.photo ? promo.photo.id : undefined,
            })
          ),
        });
      }

      return true;
    } catch (error) {
      console.error('Failed to save promotions', error);
      return false;
    }
  },
}));
