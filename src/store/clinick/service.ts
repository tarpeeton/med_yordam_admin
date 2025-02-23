import { create } from 'zustand';
import axios from 'axios';
import { multiLang } from '@/interface/multiLang';
import { useClinicProfileStore } from './profile';

export interface ServiceCategory {
  id: number;
  slug: string;
  name: multiLang;
}

export interface BackendServiceResponse {
  id: number;
  service: {
    id: number;
    categoryId: number;
    slug: string;
    name: multiLang;
  };
  price: number;
}

export interface Service {
  id?: number;
  name: multiLang;
  price: number;
}

export interface SelectedServiceItem {
  id?: number;
  service: {
    id?: number;
    categoryId?: number;
    slug?: string;
    name?: multiLang;
  };
  price?: number;
}

interface ClinickServiceStoreType {
  serviceCategories: ServiceCategory[];
  fetchServiceCategories: () => Promise<void>;

  services: Service[];
  newService: Service;
  selectedServiceCategory: ServiceCategory | null;
  selectedService: Service | null;
  servicesByCategory: { [key: number]: Service[] };
  fetchServicesByCategory: (categoryId: number) => Promise<void>;
  setSelectedServiceCategory: (category: ServiceCategory | null) => void;
  setSelectedService: (service: Service | null) => void;
  updateServiceFieldByIndex: (
    index: number,
    field: keyof Service,
    value: string | number
  ) => void;
  deleteServiceByIndex: (index: number) => Promise<boolean>;
  setAllService: (serviceList: BackendServiceResponse[]) => void;

  serviceList: SelectedServiceItem[];
  addServiceList: () => void;
  deleteServiceListByIndex: (index: number) => Promise<boolean>;
  updateServiceListFieldByIndex: (
    index: number,
    field: 'service' | 'price',
    value: any
  ) => void;
  setAllServiceList: (backendServiceList: BackendServiceResponse[]) => void;

  save: () => Promise<boolean>;
}

export const clinickServiceStore = create<ClinickServiceStoreType>(
  (set, get) => ({
    serviceCategories: [],
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

    services: [],
    newService: {
      name: { ru: '', uz: '', en: '' },
      price: 0,
    },
    selectedServiceCategory: null,
    selectedService: null,
    servicesByCategory: {},
    fetchServicesByCategory: async (categoryId: number) => {
      try {
        const response = await axios.get(
          `https://medyordam.result-me.uz/api/service?categoryId=${categoryId}`,
          { headers: { 'Accept-Language': '' } }
        );
        const backendServices = response.data.data;
        const transformedServices: Service[] = backendServices.map(
          (s: any) => ({
            id: s.id,
            name: s.name,
            price: s.price || 0,
          })
        );
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

    setAllService: (serviceList: BackendServiceResponse[]) => {
      const transformedServices: Service[] = serviceList.map((s) => ({
        id: s.id,
        name: s.service.name,
        price: s.price ?? 0,
      }));
      set({ services: transformedServices });
    },

    serviceList: [],
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
          const { id: doctorId } = useClinicProfileStore.getState();
          const token = localStorage.getItem('token');

          const payload = {
            id: doctorId,
            services: [
              {
                id: serviceItem.id,
              },
            ],
          };
          const formData = new FormData();
          formData.append('json', JSON.stringify(payload));

          await axios.put(
            'https://medyordam.result-me.uz/api/clinic',
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                'Accept-Language': '',
              },
            }
          );

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

    setAllServiceList: (backendServiceList: BackendServiceResponse[]) => {
      const transformedServiceList: SelectedServiceItem[] =
        backendServiceList.map((item) => ({
          id: item.id,
          service: {
            id: item.service.id,
            categoryId: item.service.categoryId,
            slug: item.service.slug,
            name: item.service.name,
          },
          price: item.price ?? 0,
        }));
      set({ serviceList: transformedServiceList });
    },

    save: async (): Promise<boolean> => {
      try {
        const { serviceList } = get();
        const { id } = useClinicProfileStore.getState();
        const token = localStorage.getItem('token');

        const transformedServices = serviceList.map((item) => ({
          ...(item.id ? { id: item.id } : {}),
          service: {
            id: item.service.id,
            categoryId: item.service?.categoryId ?? null,
          },
          price: item.price ?? 0,
        }));

        const formData = new FormData();

        const payload = {
          id,
          services: transformedServices,
        };

        formData.append('json', JSON.stringify(payload));

        const res = await axios.put(
          'https://medyordam.result-me.uz/api/clinic',
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Accept-Language': '',
            },
          }
        );

        if (res.data.data.services) {
          set({
            serviceList: res.data.data.services.map(
              (item: BackendServiceResponse) => ({
                id: item.id,
                service: {
                  id: item.service.id,
                  categoryId: item.service.categoryId,
                  slug: item.service.slug,
                  name: item.service.name,
                },
                price: item.price ?? 0,
              })
            ),
          });
        }

        return true;
      } catch (error) {
        console.error('Failed to save services', error);
        return false;
      }
    },
  })
);
