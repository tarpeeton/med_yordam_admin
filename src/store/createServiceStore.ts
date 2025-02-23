import { create } from 'zustand';
import axios from 'axios';
import { multiLang } from '@/interface/multiLang';
import { useProfileStore } from '@/store/profileStore';

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
  percent: number;
  photo: {
    id: number;
    url: string;
  } | null;
}

interface IPromotions {
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

export interface ServiceCategory {
  id: number;
  slug: string;
  name: multiLang;
}

interface BackendService {
  id: number;
  service: {
    id: number;
    categoryId: number;
    slug: string;
    name: multiLang;
    description?: multiLang;
  };
  price: number;
}

interface Service {
  id?: number;
  name: multiLang;
  price: number;
}

export interface SelectedServiceItem {
  id?: number;
  service: {
    id?: number;
    categoryId?: number;
  };
  price?: number;
}

interface ServiceStoreType {
  /*** --- Promotions --- ***/
  serviceCategories: ServiceCategory[];
  fetchServiceCategories: () => Promise<void>;
  promotions: IPromotions[];
  newPromotion: IPromotions;
  setAllPromotion: (promotionList: BackendPromotion[]) => void;
  addPromotion: () => void;
  deletePromotionByIndex: (index: number) => Promise<boolean>;
  setAllServiceList: (serviceList: BackendService[]) => void;
  updatePromotionFieldByIndex: (
    index: number,
    field: keyof IPromotions,
    lang: keyof multiLang | null,
    value: string | number | File
  ) => void;
  save: () => Promise<boolean>;

  services: Service[];
  newService: Service;
  selectedServiceCategory: ServiceCategory | null;
  selectedService: Service | null;
  servicesByCategory: { [key: number]: Service[] };
  fetchServicesByCategory: (categoryId: number) => Promise<void>;
  setSelectedServiceCategory: (category: ServiceCategory | null) => void;
  setSelectedService: (service: Service | null) => void;
  deleteServiceByIndex: (index: number) => Promise<boolean>;
  updateServiceFieldByIndex: (
    index: number,
    field: keyof Service,
    value: string | number
  ) => void;
  setAllService: (serviceList: BackendService[]) => void;

  /*** --- Service List --- ***/
  serviceList: SelectedServiceItem[];
  addServiceList: () => void;
  deleteServiceListByIndex: (index: number) => void;
  updateServiceListFieldByIndex: (
    index: number,
    field: 'service' | 'price',
    value: any
  ) => void;
}

export const useServiceStore = create<ServiceStoreType>((set, get) => ({
  /*** --- Promotions --- ***/
  serviceCategories: [],
  serviceList: [],
  services: [],
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
    discountPercentage: 20,
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
        discountPercentage: 0,
        description: { ru: '', uz: '', en: '' },
        imageUrl: '',
        imageFile: undefined,
      },
    }));
  },
  fetchServiceCategories: async () => {
    try {
      const response = await axios.get(
        'https://medyordam.result-me.uz/api/service-category',
        { headers: { 'Accept-Language': '' } }
      );
      const categories: ServiceCategory[] = response.data.data;
      set({ serviceCategories: categories });
    } catch (error) {
      console.error('Error fetching service categories:', error);
    }
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
        const { id: profileId } = useProfileStore.getState();
        const token = localStorage.getItem('token');
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

  newService: {
    name: { ru: '', uz: '', en: '' },
    price: 0,
  },
  servicesByCategory: {},
  selectedServiceCategory: null,
  selectedService: null,
  fetchServicesByCategory: async (categoryId: number) => {
    try {
      const response = await axios.get(
        `https://medyordam.result-me.uz/api/service?categoryId=${categoryId}`,
        { headers: { 'Accept-Language': '' } }
      );
      const backendServices = response.data.data;
      const transformedServices: Service[] = backendServices.map((s: any) => ({
        id: s.id,
        name: s.name,
        price: s.price || 0,
      }));
      set((state) => ({
        servicesByCategory: {
          ...state.servicesByCategory,
          [categoryId]: transformedServices,
        },
      }));
    } catch (error) {
      console.error('Error fetching services by category:', error);
    }
  },
  setSelectedServiceCategory: (category: ServiceCategory | null) => {
    set({ selectedServiceCategory: category });
    if (category) {
      if (!get().servicesByCategory[category.id]) {
        get().fetchServicesByCategory(category.id);
      }
    }
  },
  setSelectedService: (service: Service | null) => {
    set({ selectedService: service });
  },
  updateServiceFieldByIndex: (index, field, value) => {
    set((state) => ({
      services: state.services.map((service, i) => {
        if (i !== index) return service;
        return { ...service, [field]: value };
      }),
    }));
  },
  deleteServiceByIndex: async (index: number): Promise<boolean> => {
    const state = get();
    const { services } = state;
    const serviceToDelete = services[index];
    if (serviceToDelete?.id) {
      try {
        const token = localStorage.getItem('token');
        await axios.delete(
          `https://medyordam.result-me.uz/api/service/${serviceToDelete.id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        );
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

  setAllService: (serviceList: BackendService[]) => {
    const transformedServices: Service[] = serviceList.map((s) => ({
      id: s.id,
      name: s.service.name,
      price: s.price,
    }));
    set({ services: transformedServices });
  },

  addServiceList: () => {
    set((state) => ({
      serviceList: [...state.serviceList, { service: {} }],
    }));
  },
  deleteServiceListByIndex: async (index: number): Promise<boolean> => {
    const state = get();
    const serviceItem = state.serviceList[index];

    if (serviceItem && serviceItem.id) {
      try {
        const { id: doctorId } = useProfileStore.getState();
        const token = localStorage.getItem('token');
        const payload = {
          id: doctorId,
          serviceList: [
            {
              id: serviceItem.id,
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
          serviceList: state.serviceList.filter((_, i) => i !== index),
        }));
        return true;
      } catch (error) {
        console.error('Failed to delete service list item:', error);
        return false;
      }
    } else {
      set((state) => ({
        serviceList: state.serviceList.filter((_, i) => i !== index),
      }));
      return true;
    }
  },

  updateServiceListFieldByIndex: (index: number, field, value) => {
    set((state) => ({
      serviceList: state.serviceList.map((item, i) => {
        if (i !== index) return item;
        return { ...item, [field]: value };
      }),
    }));
  },
  setAllServiceList: (backendServiceList: BackendService[]) => {
    const transformedServiceList: SelectedServiceItem[] =
      backendServiceList.map((item) => ({
        id: item.id,
        service: {
          id: item.service.id,
          categoryId: item.service.categoryId,
          slug: item.service.slug,
          name: item.service.name,
        },
        price: item.price,
      }));
    set({ serviceList: transformedServiceList });
  },

  save: async (): Promise<boolean> => {
    try {
      const { promotions, serviceList } = get();
      const { id } = useProfileStore.getState();
      const token = localStorage.getItem('token');

      const promotionList = await Promise.all(
        promotions.map(async (promotion) => {
          let imageId: number | null = null;
          let imageUrl: string = promotion.imageUrl;
          if (promotion.imageFile) {
            const formData = new FormData();
            let uploadResponse;
            try {
              if (promotion.photoId) {
                formData.append('new-photo', promotion.imageFile);
                uploadResponse = await axios.put(
                  `https://medyordam.result-me.uz/api/photo/${promotion.photoId}`,
                  formData,
                  {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
              } else {
                formData.append('photo', promotion.imageFile);
                uploadResponse = await axios.post(
                  'https://medyordam.result-me.uz/api/photo',
                  formData,
                  {
                    headers: {
                      'Content-Type': 'multipart/form-data',
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
              }
              const uploadedData = uploadResponse.data.data[0];
              imageId = uploadedData.id;
              imageUrl = uploadedData.url;
            } catch (uploadError) {
              console.error(
                'Error uploading image for promotion:',
                promotion,
                uploadError
              );
            }
          }
          return {
            id: promotion.id,
            address: promotion.address,
            addressLink: (promotion as any).addressLink || '',
            phone: promotion.phone,
            title: promotion.title,
            description: promotion.description,
            percent: promotion.discountPercentage,
            photo: { id: imageId },
          };
        })
      );

      const transformedServiceList = serviceList.map((item) => {
        const transformedItem: SelectedServiceItem = {
          id: item?.id,
          service: {
            id: item.service?.id,
            ...(item.service?.categoryId && {
              categoryId: item.service.categoryId,
            }),
          },
          price: item.price,
        };

        if (item.id) {
          transformedItem.id = item.id;
        }

        return transformedItem;
      });

      const payload = {
        id,
        promotionList,
        serviceList: transformedServiceList,
      };

      const response = await axios.put(
        'https://medyordam.result-me.uz/api/doctor',
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data.data.promotionList) {
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

      if (response.data.data.serviceList) {
        set({
          serviceList: response.data.data.serviceList.map(
            (item: BackendService) => ({
              id: item.id,
              service: {
                id: item.service.id,
                categoryId: item.service.categoryId,
                slug: item.service.slug,
                name: item.service.name,
              },
              price: item.price,
            })
          ),
        });
      }

      return true;
    } catch (error) {
      console.error('Failed to save services and promotions', error);
      return false;
    }
  },
}));
