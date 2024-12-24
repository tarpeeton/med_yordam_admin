import { create } from "zustand";
import axios from "axios";

interface MultiLang {
  ru: string;
  uz: string;
  en: string;
}

interface Service {
  id: number;
  name: MultiLang;
  price: string;
}

interface ServiceStoreType {
  services: Service[];
  newService: Service;
  setNewServiceName: (lang: keyof MultiLang, value: string) => void;
  setNewServicePrice: (price: string) => void;
  addService: () => void;
  updateServiceField: (
    id: number,
    field: keyof Service,
    lang: keyof MultiLang | null,
    value: string
  ) => void;
  deleteService: (id: number) => void;
  save: () => Promise<void>;
}

export const useServiceStore = create<ServiceStoreType>((set, get) => ({
  services: [],
  newService: {
    id: 0,
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
        id: services.length ? services[services.length - 1].id + 1 : 1,
      };

      return {
        services: [...services, newServiceCopy],
        newService: { id: 0, name: { ru: "", uz: "", en: "" }, price: "" },
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
                ? { ...(service[field] as MultiLang), [lang]: value }
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

      if (!services.length) {
        alert("Нет услуг для сохранения!");
        return;
      }

      const response = await axios.post("/api/services", { services });
      alert("Services saved successfully!");
      console.log("Saved services:", response.data);
    } catch (error) {
      console.error("Failed to save services", error);
      alert("Failed to save services. Please try again.");
    }
  },
}));
