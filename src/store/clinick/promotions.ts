import { create } from 'zustand';
import axios from 'axios';
import { multiLang } from '@/interface/multiLang';
import { useClinicProfileStore } from '@/store/clinick/profile';

export interface BackendPromotion {
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
  discount?: number;
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
  discount?: number;
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
  errorMessage: multiLang;
  addPromotion: () => void;
  updatePromotionFieldByIndex: (
    index: number,
    field: keyof IPromotions,
    lang: keyof multiLang | null,
    value: string | number | File
  ) => void;
  deletePromotionByIndex: (index: number) => Promise<boolean>;
  setAllPromotion: (promotionList: BackendPromotion[]) => void;
  savePromotions: () => Promise<{ status: boolean; message: multiLang }>;
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
  newPromotion: {
    address: { ru: '', uz: '', en: '' },
    phone: '',
    title: { ru: '', uz: '', en: '' },
    discount: 20,
    description: { ru: '', uz: '', en: '' },
    imageUrl:
      'https://ucarecdn.com/568467e3-d7fd-4272-854e-884e5325aa23/-/preview/354x370/',
    imageFile: undefined,
  },

  addPromotion: () => {
    set((state) => ({
      promotions: [...state.promotions, state.newPromotion],
      newPromotion: {
        address: { ru: '', uz: '', en: '' },
        phone: '',
        title: { ru: '', uz: '', en: '' },
        discount: 0,
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
        const token = sessionStorage.getItem('token');
        await axios.delete(
          `https://medyordam.result-me.uz/api/promotion/${promotionToDelete?.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
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
  errorMessage: { ru: '', uz: '', en: '' },

  setAllPromotion: (promotionList: BackendPromotion[]) => {
    const transformedPromotions: IPromotions[] = promotionList.map(
      (promo: BackendPromotion): IPromotions => ({
        id: promo.id.toString(),
        address: promo.address,
        phone: promo.phone,
        title: promo.title,
        discount: promo.discount,
        description: promo.description,
        imageUrl: promo.photo && promo.photo.url ? promo.photo.url : '',
        imageFile: undefined,
        photoId: promo.photo ? promo.photo.id : undefined,
      })
    );
    set({ promotions: transformedPromotions });
  },

  savePromotions: async (): Promise<{
    status: boolean;
    message: multiLang;
  }> => {
    try {
      const { promotions } = get();
      for (const promotion of promotions) {
        if (
          !promotion.title.ru.trim() ||
          !promotion.title.uz.trim() ||
          !promotion.title.en.trim() ||
          !promotion.description.ru.trim() ||
          !promotion.description.uz.trim() ||
          !promotion.description.en.trim() ||
          !promotion.phone.trim() ||
          !promotion.address.ru.trim() ||
          !promotion.address.uz.trim() ||
          !promotion.address.en.trim() ||
          (!promotion.imageFile && !promotion.imageUrl.trim())
        ) {
          const errorMsg = {
            ru: 'Пожалуйста, заполните все обязательные поля полностью на русском, узбекском и английском языках.',
            uz: 'Iltimos, barcha majburiy maydonlarni rus, o‘zbek va ingliz tillarida to‘liq to‘ldiring.',
            en: 'Please fill in all required fields completely in Russian, Uzbek, and English.',
          };
          set({ errorMessage: errorMsg });
          return { status: false, message: errorMsg };
        }
      }
      set({ errorMessage: { ru: '', uz: '', en: '' } });

      const { id: clinicId } = useClinicProfileStore.getState();
      const token = sessionStorage.getItem('token');

      const payloadPromotions = await Promise.all(
        promotions.map(async (promotion) => {
          let photoPayload: { id: number; url: string } = {
            id: promotion.photoId || 0,
            url: promotion.imageUrl,
          };

          // Если задан файл для загрузки, сначала загружаем его
          if (promotion.imageFile) {
            const photoData = new FormData();
            photoData.append('photo', promotion.imageFile);
            const photoResponse = await axios.post(
              'https://medyordam.result-me.uz/api/photo',
              photoData,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  'Accept-Language': '',
                  'Content-Type': 'multipart/form-data',
                },
              }
            );
            console.log('Photo upload response:', photoResponse.data);
            if (
              photoResponse.data &&
              Array.isArray(photoResponse.data.data) &&
              photoResponse.data.data.length > 0
            ) {
              const uploadedPhoto = photoResponse.data.data[0];
              photoPayload = {
                id: uploadedPhoto.id,
                url: uploadedPhoto.url,
              };
            }
          } else {
            if (!promotion.imageUrl) {
              photoPayload = {} as any;
            }
          }

          const basePromotion = {
            title: promotion.title,
            description: promotion.description,
            phone: promotion.phone,
            discount: promotion.discount || 0,
            address: {
              ru: promotion.address.ru,
              uz: promotion.address.uz,
              en: promotion.address.en,
            },
            clinicId: clinicId,
            photo: photoPayload,
          };

          if (promotion.id) {
            return { ...basePromotion, id: Number(promotion.id) };
          }
          return basePromotion;
        })
      );

      const payload = {
        promotions: payloadPromotions,
      };

      console.log('Final payload:', payload);

      const response = await axios.put(
        'https://medyordam.result-me.uz/api/promotion',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Accept-Language': '',
            'Content-Type': 'application/json',
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
              discount: promo.discount,
              description: promo.description,
              imageUrl: promo.photo && promo.photo.url ? promo.photo.url : '',
              imageFile: undefined,
              photoId: promo.photo ? promo.photo.id : undefined,
            })
          ),
        });
      }

      const successMsg = {
        ru: 'Акции успешно сохранены!',
        uz: 'Aksiyalar muvaffaqiyatli saqlandi!',
        en: 'Promotions saved successfully!',
      };
      return { status: true, message: successMsg };
    } catch (error) {
      console.error('Failed to save promotions', error);
      const errorMsg = {
        ru: 'Акции сохранить не удалось.',
        uz: "Aksiyalarni saqlash muvaffaqiyatli bo'lmadi.",
        en: 'Failed to save promotions.',
      };
      return { status: false, message: errorMsg };
    }
  },
}));
