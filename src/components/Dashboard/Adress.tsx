'use client';
import YandexMap from '@/components/Dashboard/YandexMap';
import { useAddressStore } from '@/store/createAddressStore';
import { FC } from 'react';
import { GoPencil } from 'react-icons/go';
import { IoClose } from 'react-icons/io5';

interface IAddressProps {
  selectedInputLang: 'ru' | 'uz' | 'en';
}

const daysOfWeek = [
  { key: 'MONDAY', label: { ru: 'Понедельник', uz: 'Dushanba', en: 'Monday' } },
  { key: 'TUESDAY', label: { ru: 'Вторник', uz: 'Seshanba', en: 'Tuesday' } },
  {
    key: 'WEDNESDAY',
    label: { ru: 'Среда', uz: 'Chorshanba', en: 'Wednesday' },
  },
  {
    key: 'THURSDAY',
    label: { ru: 'Четверг', uz: 'Payshanba', en: 'Thursday' },
  },
  { key: 'FRIDAY', label: { ru: 'Пятница', uz: 'Juma', en: 'Friday' } },
  { key: 'SATURDAY', label: { ru: 'Суббота', uz: 'Shanba', en: 'Saturday' } },
  {
    key: 'SUNDAY',
    label: { ru: 'Воскресенье', uz: 'Yakshanba', en: 'Sunday' },
  },
];

const DashboardAddress: FC<IAddressProps> = ({ selectedInputLang }) => {
  const { mapData, addAddress, updateAddress, deleteAddress, save } =
    useAddressStore();

  const handleAddAddress = () => {
    addAddress({
      clinicName: '',
      address: { ru: '', uz: '', en: '' },
      days: daysOfWeek.map(({ key }) => ({
        dayOfWeek: key,
        from: '',
        to: '',
      })),
      price: '',
      landmark: '',
      location: { latitude: 41.351424, longitude: 69.288937 },
      addressLink: '',
      orientir: { ru: '', uz: '', en: '' },
    });
  };

  return (
    <div>
      {mapData.map((entry, index) => (
        <div
          key={index}
          className="mb-[20px] rounded-bl-[18px] rounded-br-[18px] bg-white px-[15px] py-[25px] 2xl:px-[25px] 2xl:py-[37px]"
        >
          <div className="mb-[10px] flex flex-row items-center">
            <h1 className="text-[17px] font-semibold text-[#0129E3] 2xl:text-[20px]">
              {selectedInputLang === 'ru'
                ? `Место приема №${index + 1}`
                : selectedInputLang === 'uz'
                  ? `Qabul joyi №${index + 1}`
                  : `Reception Place №${index + 1}`}
            </h1>
            <button onClick={() => deleteAddress(entry?.id || '0')}>
              <IoClose className="ml-[10px] text-[20px] text-[#0129E3] 2xl:h-[25px] 2xl:w-[25px]" />
            </button>
          </div>
          <div className="grid grid-cols-1 gap-[12px] 2xl:grid-cols-2">
            {/* Clinic Name */}
            <div className="relative">
              <input
                value={entry.clinicName}
                onChange={(e) =>
                  updateAddress(index, { clinicName: e.target.value })
                }
                placeholder={
                  selectedInputLang === 'ru'
                    ? 'Название клиники'
                    : selectedInputLang === 'uz'
                      ? 'Klinik nomi'
                      : 'Clinic Name'
                }
                className="focus:ring-ring w-full rounded-[12px] bg-[#F8F8F8] px-[15px] py-[18px] pl-[50px] text-[#747474] focus:outline-none focus:ring-1"
              />
              <GoPencil className="text-muted-foreground absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#0129E3]" />
            </div>

            {/* Cost */}
            <div className="relative">
              <input
                value={entry.price}
                onChange={(e) =>
                  updateAddress(index, { price: e.target.value })
                }
                placeholder={
                  selectedInputLang === 'ru'
                    ? 'Стоимость консультации'
                    : selectedInputLang === 'uz'
                      ? 'Konsultatsiya narxi'
                      : 'Consultation Cost'
                }
                className="focus:ring-ring w-full rounded-[12px] bg-[#F8F8F8] px-[15px] py-[18px] pl-[50px] text-[#747474] focus:outline-none focus:ring-1"
              />
              <GoPencil className="text-muted-foreground absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#0129E3]" />
            </div>
            <div className="relative">
              <input
                value={entry.address[selectedInputLang]}
                onChange={(e) =>
                  updateAddress(index, {
                    address: {
                      ...entry.address, // Keep existing values for other languages
                      [selectedInputLang]: e.target.value, // Update only the selected language
                    },
                  })
                }
                placeholder={
                  selectedInputLang === 'ru'
                    ? 'Адрес'
                    : selectedInputLang === 'uz'
                      ? 'Manzil'
                      : 'Address'
                }
                className="focus:ring-ring w-full rounded-[12px] bg-[#F8F8F8] px-[15px] py-[18px] pl-[50px] text-[#747474] focus:outline-none focus:ring-1"
              />
              <GoPencil className="text-muted-foreground absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#0129E3]" />
            </div>
            <div className="relative">
              <input
                value={entry.orientir[selectedInputLang]}
                onChange={(e) =>
                  updateAddress(index, {
                    orientir: {
                      ...entry.orientir, // Keep existing values for other languages
                      [selectedInputLang]: e.target.value, // Update only the selected language
                    },
                  })
                }
                placeholder={
                  selectedInputLang === 'ru'
                    ? 'Ориентир'
                    : selectedInputLang === 'uz'
                      ? 'Orientir'
                      : 'Orientir'
                }
                className="focus:ring-ring w-full rounded-[12px] bg-[#F8F8F8] px-[15px] py-[18px] pl-[50px] text-[#747474] focus:outline-none focus:ring-1"
              />
              <GoPencil className="text-muted-foreground absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#0129E3]" />
            </div>

            {entry.days.map((dayEntry, dayIndex) => (
              <div key={`${entry.id}-${dayIndex}`} className="relative">
                <div className="grid grid-cols-3 items-center gap-4">
                  {/* From Time */}
                  {dayEntry.dayOfWeek}
                  <div className="relative">
                    <input
                      type="time"
                      value={dayEntry.from}
                      onChange={(e) =>
                        updateAddress(index, {
                          days: entry.days.map((d, i) =>
                            i === dayIndex ? { ...d, from: e.target.value } : d
                          ),
                        })
                      }
                      className="focus:ring-ring w-full rounded-[12px] bg-[#F8F8F8] px-[10px] py-[17px] text-[#747474] focus:outline-none focus:ring-1"
                    />
                  </div>
                  {/* To Time */}
                  <div className="relative">
                    <input
                      type="time"
                      value={dayEntry.to}
                      onChange={(e) =>
                        updateAddress(index, {
                          days: entry.days.map((d, i) =>
                            i === dayIndex ? { ...d, to: e.target.value } : d
                          ),
                        })
                      }
                      className="focus:ring-ring w-full rounded-[12px] bg-[#F8F8F8] px-[10px] py-[17px] text-[#747474] focus:outline-none focus:ring-1"
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
                  updateAddress(index, { location: coords })
                }
              />
            </div>
          </div>
        </div>
      ))}

      {/* Add new address button */}
      <button
        onClick={handleAddAddress}
        className="mt-[15px] h-[50px] w-full rounded-[12px] border border-[#0129E3] text-[15px] font-medium text-[#0129E3] 2xl:w-[220px] 2xl:text-[16px]"
      >
        {selectedInputLang === 'ru'
          ? 'Добавить место приема'
          : selectedInputLang === 'uz'
            ? "Qabul joyini qo'shish"
            : 'Add Reception Place'}
      </button>

      {/* Save changes button */}
      <div className="mt-[25px] flex w-full items-center 2xl:w-[100%] 2xl:justify-end">
        <button
          onClick={save}
          className="w-full rounded-[12px] bg-[#0129E3] py-[20px] text-center font-medium text-white 2xl:w-[245px]"
        >
          {selectedInputLang === 'ru'
            ? 'Сохранить изменения'
            : selectedInputLang === 'uz'
              ? "O'zgarishlarni saqlash"
              : 'Save changes'}
        </button>
      </div>
    </div>
  );
};

export default DashboardAddress;
