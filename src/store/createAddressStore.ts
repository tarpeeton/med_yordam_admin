import { create } from "zustand";
import axios from 'axios'


// Define the structure for an address entry
interface AddressEntry {
  id: string; // Unique ID for each entry
  address: string; // Адрес
  clinicName: string; // Название клиники
  days: string; // Дни приема
  cost: string; // Стоимость консультации
  time: string; // Время приема
  landmark: string; // Ориентир
  location: { latitude: number; longitude: number }; // Место на карте (широта и долгота)
}

// Define the store structure
interface AddressState {
  mapData: AddressEntry[]; // Array of address entries
  addAddress: (entry: AddressEntry) => void; // Function to add a new address
  updateAddress: (id: string, updatedData: Partial<AddressEntry>) => void; // Function to update an existing address by ID
  deleteAddress: (id: string) => void; // Function to delete an address by ID
  save: () => Promise<void>;
}

// Create the store
export const useAddressStore = create<AddressState>((set , get) => ({
  mapData: [], 

  // Add a new address
  addAddress: (entry) =>
    set((state) => ({
      mapData: [...state.mapData, entry],
    })),

  // Update an existing address by ID
  updateAddress: (id, updatedData) =>
    set((state) => ({
      mapData: state.mapData.map((item) =>
        item.id === id ? { ...item, ...updatedData } : item
      ),
    })),

  // Delete an address by ID
  deleteAddress: (id) =>
    set((state) => ({
      mapData: state.mapData.filter((item) => item.id !== id),
    })),

  save: async () => {
      try {
        const mapData = get().mapData; // Get all address entries from the state
  
        if (mapData.length === 0) {
          throw new Error("No addresses to save");
        }
  
          console.log(mapData)
        const response = await axios.post("https://example.com/api/addresses", {
          addresses: mapData, // Send all address entries as an array
        });
  
        // Optional: Handle success response
        console.log("Save successful:", response.data);
        alert("Addresses saved successfully!");
      } catch (error) {
        console.error("Error saving addresses:", error);
        alert("An error occurred while saving the addresses.");
      }
    },
    
}));
