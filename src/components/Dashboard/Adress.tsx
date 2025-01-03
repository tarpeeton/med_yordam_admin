"use client";
import YandexMap from "@/components/Dashboard/YandexMap";
import { useAddressStore } from "@/store/createAddressStore";
import { FC } from "react";
import { GoPencil } from "react-icons/go";
import { IoClose } from "react-icons/io5";
import { v4 as uuidv4 } from "uuid";

interface IAddressProps {
  selectedInputLang: "ru" | "uz" | "en";
}

const daysOfWeek = [
  { key: "MONDAY", label: { ru: "Понедельник", uz: "Dushanba", en: "Monday" } },
  { key: "TUESDAY", label: { ru: "Вторник", uz: "Seshanba", en: "Tuesday" } },
  { key: "WEDNESDAY", label: { ru: "Среда", uz: "Chorshanba", en: "Wednesday" } },
  { key: "THURSDAY", label: { ru: "Четверг", uz: "Payshanba", en: "Thursday" } },
  { key: "FRIDAY", label: { ru: "Пятница", uz: "Juma", en: "Friday" } },
  { key: "SATURDAY", label: { ru: "Суббота", uz: "Shanba", en: "Saturday" } },
  { key: "SUNDAY", label: { ru: "Воскресенье", uz: "Yakshanba", en: "Sunday" } },
];

const DashboardAddress: FC<IAddressProps> = ({ selectedInputLang }) => {
  const { mapData, addAddress, updateAddress, deleteAddress, save } =
    useAddressStore();

  const handleAddAddress = () => {
    addAddress({
      id: uuidv4(),
      clinicName: "",
      address: { ru: "", uz: "", en: "" },
      days: daysOfWeek.map(({ key }) => ({
        dayOfWeek: key,
        from: "",
        to: "",
      })),
      price: "",
      landmark: "",
      location: { latitude: 41.351424, longitude: 69.288937 },
      addressLink: "", 
      orientir: { ru: "", uz: "", en: "" },
    });
  };
  

  return (
    <div>
      {mapData.map((entry, index) => (
        <div
          key={entry.id}
          className="px-[15px] py-[25px] bg-white rounded-bl-[18px] rounded-br-[18px] 2xl:py-[37px] 2xl:px-[25px] mb-[20px]"
        >
          <div className="flex flex-row items-center mb-[10px]">
            <h1 className="text-[#0129E3] text-[17px] 2xl:text-[20px] font-semibold">
              {selectedInputLang === "ru"
                ? `Место приема №${index + 1}`
                : selectedInputLang === "uz"
                ? `Qabul joyi №${index + 1}`
                : `Reception Place №${index + 1}`}
            </h1>
            <button onClick={() => deleteAddress(entry.id)}>
              <IoClose className="text-[#0129E3] ml-[10px] text-[20px] 2xl:w-[25px] 2xl:h-[25px]" />
            </button>
          </div>
          <div className="grid grid-cols-1 2xl:grid-cols-2 gap-[12px]">
            {/* Clinic Name */}
            <div className="relative">
              <input
                value={entry.clinicName}
                onChange={(e) =>
                  updateAddress(entry.id, { clinicName: e.target.value })
                }
                placeholder={
                  selectedInputLang === "ru"
                    ? "Название клиники"
                    : selectedInputLang === "uz"
                    ? "Klinik nomi"
                    : "Clinic Name"
                }
                className="w-full text-[#747474] rounded-[12px] focus:outline-none focus:ring-1 focus:ring-ring py-[18px] pl-[50px] px-[15px] bg-[#F8F8F8]"
              />
              <GoPencil className="absolute text-[#0129E3] left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            </div>

          

            {/* Cost */}
            <div className="relative">
              <input
                value={entry.price}
                onChange={(e) =>
                  updateAddress(entry.id, { price: e.target.value })
                }
                placeholder={
                  selectedInputLang === "ru"
                    ? "Стоимость консультации"
                    : selectedInputLang === "uz"
                    ? "Konsultatsiya narxi"
                    : "Consultation Cost"
                }
                className="w-full text-[#747474] rounded-[12px] focus:outline-none focus:ring-1 focus:ring-ring py-[18px] pl-[50px] px-[15px] bg-[#F8F8F8]"
              />
              <GoPencil className="absolute text-[#0129E3] left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            </div>
            <div className="relative">
              <input
                value={entry.address[selectedInputLang]}
                onChange={(e) =>
                  updateAddress(entry.id, {
                    address: {
                      ...entry.address, // Keep existing values for other languages
                      [selectedInputLang]: e.target.value, // Update only the selected language
                    },
                  })
                }
                placeholder={
                  selectedInputLang === "ru"
                    ? "Адрес"
                    : selectedInputLang === "uz"
                    ? "Manzil"
                    : "Address"
                }
                className="w-full text-[#747474] rounded-[12px] focus:outline-none focus:ring-1 focus:ring-ring py-[18px] pl-[50px] px-[15px] bg-[#F8F8F8]"
              />
              <GoPencil className="absolute text-[#0129E3] left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            </div>
            <div className="relative">
              <input
                value={entry.orientir[selectedInputLang]}
                onChange={(e) =>
                  updateAddress(entry.id, {
                    orientir: {
                      ...entry.orientir, // Keep existing values for other languages
                      [selectedInputLang]: e.target.value, // Update only the selected language
                    },
                  })
                }
                placeholder={
                  selectedInputLang === "ru"
                    ? "Ориентир"
                    : selectedInputLang === "uz"
                    ? "Orientir"
                    : "Orientir"
                }
                
                className="w-full text-[#747474] rounded-[12px] focus:outline-none focus:ring-1 focus:ring-ring py-[18px] pl-[50px] px-[15px] bg-[#F8F8F8]"
              />
              <GoPencil className="absolute text-[#0129E3] left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            </div>


            {entry.days.map((dayEntry, dayIndex) => (
              <div key={`${entry.id}-${dayIndex}`} className="relative">
               
                <div className="grid grid-cols-3 gap-4 items-center">
                  {/* From Time */}
                  {dayEntry.dayOfWeek}
                  <div className="relative">
                    <input
                      type="time"
                      value={dayEntry.from}
                      onChange={(e) =>
                        updateAddress(entry.id, {
                          days: entry.days.map((d, i) =>
                            i === dayIndex
                              ? { ...d, from: e.target.value }
                              : d
                          ),
                        })
                      }
                      className="w-full text-[#747474] rounded-[12px] focus:outline-none focus:ring-1 focus:ring-ring py-[17px] px-[10px] bg-[#F8F8F8]"
                    />
                  </div>
                  {/* To Time */}
                  <div className="relative">
                    <input
                      type="time"
                      value={dayEntry.to}
                      onChange={(e) =>
                        updateAddress(entry.id, {
                          days: entry.days.map((d, i) =>
                            i === dayIndex
                              ? { ...d, to: e.target.value }
                              : d
                          ),
                        })
                      }
                      className="w-full text-[#747474] rounded-[12px] focus:outline-none focus:ring-1 focus:ring-ring py-[17px] px-[10px] bg-[#F8F8F8] "
                    />
                  </div>
                </div>
              </div>
            ))}
            {/* Map */}
            <div className="relative col-span-full w-full">
              <YandexMap
                location={entry.location}
                onLocationChange={(coords) =>
                  updateAddress(entry.id, { location: coords })
                }
              />
            </div>
          </div>
        </div>
      ))}

      {/* Add new address button */}
      <button
        onClick={handleAddAddress}
        className="mt-[15px] w-full 2xl:w-[220px] rounded-[12px] border border-[#0129E3] text-[15px] 2xl:text-[16px] text-[#0129E3] font-medium h-[50px]"
      >
        {selectedInputLang === "ru"
          ? "Добавить место приема"
          : selectedInputLang === "uz"
          ? "Qabul joyini qo'shish"
          : "Add Reception Place"}
      </button>

      {/* Save changes button */}
      <div className="mt-[25px] w-full 2xl:w-[100%] flex items-center 2xl:justify-end">
        <button
          onClick={save}
          className="bg-[#0129E3] 2xl:w-[245px] py-[20px] w-full rounded-[12px] font-medium text-center text-white"
        >
          {selectedInputLang === "ru"
            ? "Сохранить изменения"
            : selectedInputLang === "uz"
            ? "O'zgarishlarni saqlash"
            : "Save changes"}
        </button>
      </div>
    </div>
  );
};

export default DashboardAddress;
