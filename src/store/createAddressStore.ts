import { create } from "zustand";
import axios from 'axios'


import { multiLang } from '@/interface/multiLang';
import { useProfileStore } from '@/store/profileStore';

// Define the structure for an address entry
export interface AddressEntry {
  id: string;
  address: multiLang;
  clinicName: string;
  days: { dayOfWeek: string; from: string; to: string }[]; // Array to store day and time
  price: string;
  landmark: string;
  location: { latitude: number; longitude: number };
  addressLink?: string;
  orientir: multiLang
}

// Define the store structure
interface AddressState {
  mapData: AddressEntry[]; // Array of address entries
  addAddress: (entry: AddressEntry) => void; // Function to add a new address
  updateAddress: (id: string, updatedData: Partial<AddressEntry>) => void; // Function to update an existing address by ID
  deleteAddress: (id: string) => void; // Function to delete an address by ID
  save: () => Promise<boolean>;
  setAllData: (data: AddressEntry[]) => void
}




// Create the store
export const useAddressStore = create<AddressState>((set , get) => ({
  mapData: [], 

  // Add a new address
  addAddress: (entry) =>
    set((state) => ({
      mapData: [
        ...state.mapData,
        {
          ...entry,
          address: {
            ru: entry.address.ru || "",
            uz: entry.address.uz || "",
            en: entry.address.en || "",
          },
          orientir: {
            ru: entry.orientir.ru || "",
            uz: entry.orientir.uz || "",
            en: entry.orientir.en || "",
          },
        },
      ],
    })),

  // Update an existing address by ID
  updateAddress: (id, updatedData) =>
    set((state) => ({
      mapData: state.mapData.map((item) =>
        item.id === id
          ? {
              ...item,
              ...updatedData,
              address: updatedData.address
                ? {
                    ru: updatedData.address.ru || item.address.ru,
                    uz: updatedData.address.uz || item.address.uz,
                    en: updatedData.address.en || item.address.en,
                  }
                : item.address,
              orientir: updatedData.orientir
                ? {
                    ru: updatedData.orientir.ru || item.orientir.ru,
                    uz: updatedData.orientir.uz || item.orientir.uz,
                    en: updatedData.orientir.en || item.orientir.en,
                  }
                : item.orientir,
            }
          : item
      ),
    })),


  // Delete an address by ID
  deleteAddress: (id) =>
    set((state) => ({
      mapData: state.mapData.filter((item) => item.id !== id),
    })),



    save: async (): Promise<boolean> => {
      try {
        const mapData = get().mapData; // Get all address entries from the state
        const {id} = useProfileStore.getState()
        
         const token = sessionStorage.getItem("token");


         
        if (mapData.length === 0) {
          throw new Error("No addresses to save");
        }
    
        // Transform mapData to match the required API format
        const receptionTime = mapData.map((entry) => {
          const baseEntry = {
            dayOfWeek: entry.days[0]?.dayOfWeek?.toUpperCase() || "", // Map days to uppercase
            from: entry.days[0]?.from || "", // Use the first day's from time
            to: entry.days[0]?.to || "", // Use the first day's to time
            address: {
              uz: entry.address.uz,
              ru: entry.address.ru,
              en: entry.address.en,
            },
            addressLink: entry.addressLink || "",
            clinicName: entry.clinicName || "",
            orientir: {
              uz: entry.orientir.uz,
              ru: entry.orientir.ru,
              en: entry.orientir.en,
            },
            price: entry.price || "",
            latitude: entry.location.latitude,
            longitude: entry.location.longitude,
          };
        
          // Add the `id` field only if it exists
          if (entry.id.length < 8) {
            return { ...baseEntry, id: entry.id };
          }
        
          // Return without `id` field if `id` does not exist
          return baseEntry;
        });
        
    
        // API request
        const response = await axios.put(
          "https://medyordam.result-me.uz/api/doctor",
          { id ,  receptionTime }, // Send receptionTime as the payload
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
    
        console.log("Save successful:", response.data);
    
        return true; // Indicate success
      } catch (error) {
        console.error("Error saving addresses:", error);
        return false; // Indicate failure
      }
    },


    setAllData: (data: any[]) => {
      const formattedData: AddressEntry[] = data.map((item) => ({
        id: item.id.toString(), // IDni string ko'rinishida saqlash
        address: {
          uz: item.address?.uz || "",
          ru: item.address?.ru || "",
          en: item.address?.en || "",
        },
        clinicName: item.clinicName || "",
        days: [
          {
            dayOfWeek: item.dayOfWeek || "",
            from: item.from || "",
            to: item.to || "",
          },
        ],
        price: item.price?.toString() || "", // Narxni string ko'rinishida saqlash
        landmark: item.orientir?.ru || "", // Orientirni rus tilida olish
        location: {
          latitude: item.latitude,
          longitude: item.longitude,
        },
        addressLink: item.addressLink || "",
        orientir: {
          uz: item.orientir?.uz || "",
          ru: item.orientir?.ru || "",
          en: item.orientir?.en || "",
        },
      }));
    
      set({ mapData: formattedData });
      console.log("Formatted Data:", formattedData);
    }
    
    
    
}));
