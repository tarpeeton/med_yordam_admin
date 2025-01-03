import { create } from "zustand";
import axios from "axios";
import { multiLang } from '@/interface/multiLang';
import { useProfileStore } from '@/store/profileStore';

interface Service {
  id?: number;
  name: multiLang;
  price: string;
}

interface ServiceStoreType {
  services: Service[];
  newService: Service;
  setNewServiceName: (lang: keyof multiLang, value: string) => void;
  setNewServicePrice: (price: string) => void;
  addService: () => void;
  setServicesFromOtherStore: (priceList: Service[]) => void;
  updateServiceFieldByIndex: (
    index: number,
    field: keyof Service,
    lang: keyof multiLang | null,
    value: string
  ) => void;
  deleteServiceByIndex: (index: number) => void;
  save: () => Promise<void>;
}

export const useServiceStore = create<ServiceStoreType>((set, get) => ({
  services: [
    {
      
      name: { ru: "", uz: "", en: "" },
      price: "",
    },
  ],
  newService: {

    name: { ru: "", uz: "", en: "" },
    price: "",
  },

  setNewServiceName: (lang, value) => {
    set((state) => ({
      newService: {
        ...state.newService,
        name: { ...state.newService.name, [lang]: value },
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
      newService: { name: { ru: "", uz: "", en: "" }, price: "" },
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

  deleteServiceByIndex: async (index) => {
    const state = get();
    const { services } = state;
    const serviceToDelete = services[index];
    if (serviceToDelete?.id) {
      try {
        const { id: profileId } = useProfileStore.getState();
        const token = localStorage.getItem("token");

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

        await axios.put("https://medyordam.result-me.uz/api/doctor", payload, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        // Удаляем сервис локально
        set((state) => ({
          services: state.services.filter((_, i) => i !== index),
        }));

        alert("Service deleted successfully!");
      } catch (error) {
        console.error("Failed to delete service:", error);
        alert("Failed to delete service. Please try again.");
      }
    } else {
      // Если ID нет, просто удаляем локально
      set((state) => ({
        services: state.services.filter((_, i) => i !== index),
      }));
    }
  },
  save: async () => {
    try {
      const { services } = get();
      const { id } = useProfileStore.getState();
      const token = localStorage.getItem("token");

      if (!services.length) {
        alert("Нет услуг для сохранения!");
        return;
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
        "https://medyordam.result-me.uz/api/doctor",
        { id, priceList },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
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

      alert("Services saved successfully!");
    } catch (error) {
      console.error("Failed to save services", error);
      alert("Failed to save services. Please try again.");
    }
  },


  setServicesFromOtherStore: (priceList: Service[]) => {
    const transformedServices = priceList.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price.toString(), // Преобразуем цену в строку
    }));

    set({ services: transformedServices });
  },



}));
