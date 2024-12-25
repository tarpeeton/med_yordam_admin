import {create} from "zustand";

interface AddressState {
  address: string; // Адрес
  clinicName: string; // Название клиники
  days: string; // Дни приема
  cost: string; // Стоимость консультации
  time: string; // Время приема
  landmark: string; // Ориентир
  location: { latitude: number; longitude: number }; // Место на карте (широта и долгота)
  setField: (field: string, value: any) => void; // Функция для установки значения любого поля
}



export const useAddressStore = create<AddressState>((set) => ({
  address: "",
  clinicName: "",
  days: "",
  cost: "",
  time: "",
  landmark: "",
  location: { latitude: 41.351424, longitude: 69.288937 },
  setField: (field, value) =>
    set((state) => ({
      ...state,
      [field]: value,
    })),
}));
