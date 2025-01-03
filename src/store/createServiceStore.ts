import { create } from "zustand";
import axios from "axios";
import { multiLang } from '@/interface/multiLang';
import { useProfileStore } from '@/store/profileStore';


interface Service {
  id: number | null;
  name: multiLang;
  price: string;
}

interface ServiceStoreType {
  services: Service[];
  newService: Service;
  setNewServiceName: (lang: keyof multiLang, value: string) => void;
  setNewServicePrice: (price: string) => void;
  addService: () => void;
  updateServiceField: (
    id: number,
    field: keyof Service,
    lang: keyof multiLang | null,
    value: string
  ) => void;
  deleteService: (id: number) => void;
  save: () => Promise<void>;
}

export const useServiceStore = create<ServiceStoreType>((set, get) => ({
  services: [{id: null, name: {ru: "Шунтирование желудка", uz: "Oshqozon shuntlash amaliyoti", en: ""}, price: "100"}],
  newService: {
    id: null,
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
    set((state) => {
      const { newService, services } = state;

      const newServiceCopy = {
        ...newService,
        id: null,
      };

      return {
        services: [...services, newServiceCopy],
        newService: { id: null, name: { ru: "", uz: "", en: "" }, price: "" },
      };
    });
  },

  updateServiceField: (id, field, lang, value) => {
    set((state) => ({
      services: state.services.map((service) =>
        service.id === id
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

  deleteService: (id) => {
    set((state) => ({
      services: state.services.filter((service) => service.id !== id),
    }));
  },

  save: async () => {
    try {
      const { services } = get();
      const { id } = useProfileStore.getState();
      
      if (!services.length) {
        alert("Нет услуг для сохранения!");
        return;
      }
  
      // Собираем данные о сервисах
      const priceList = services.map((service) => ({
        id: service.id ?? null,
        name: service.name,
        price: service.price,
      }));
  
      // Выполняем запрос
      const response = await axios.put(
        "https://medyordam.result-me.uz/api/doctor",
        {
          id,
          // поменяйте ключ, если бэкенд ожидает другое название поля
          priceList,
          // или, например, priceList: payloadData
        }
      );

      if (response.data.data.priceList) {
        const serverResponseNewPriceList = response.data.data.priceList;


        const updatedServices = serverResponseNewPriceList.map((service: Service) => ({
          id: service.id ?? null,
          name: service.name,
          price: service.price
        }))


        set((prevState) => ({
          ...prevState,
          services: updatedServices,
        }));
      }
  
      alert("Services saved successfully!");
      console.log("Saved services:", response.data);
    } catch (error) {
      console.error("Failed to save services", error);
      alert("Failed to save services. Please try again.");
    }
  },
  
   
})); 
