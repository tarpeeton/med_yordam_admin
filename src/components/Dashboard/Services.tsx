'use client';
import { useServiceStore } from '@/store/createServiceStore';
import { GoPencil } from 'react-icons/go';
import { IoClose } from 'react-icons/io5';
import { useLocale } from 'next-intl';
import toastr from 'toastr';

import { ILangTopProps } from '@/interface/langtopProps';
import SaveButton from '@/ui/saveButton';

const DashboardServices = ({ selectedInputLang }: ILangTopProps) => {
  const locale = useLocale();

  const {
    services,
    addService,
    updateServiceFieldByIndex,
    deleteServiceByIndex,
    save,
  } = useServiceStore();

  const SaveChanges = async () => {
    const success = await save();
    const message =
      locale === 'ru'
        ? success
          ? 'успешно сохранён!'
          : 'Ошибка при сохранении'
        : locale === 'uz'
          ? success
            ? 'muvaffaqiyatli saqlandi!'
            : 'Saqlashda xatolik yuz berdi.'
          : success
            ? 'saved successfully!'
            : 'Error saving profile.';

    toastr[success ? 'success' : 'error'](message);
  };

  return (
    <div className="mt-[25px] 2xl:mt-[37px]">
      <div className="flex flex-col 2xl:flex-row 2xl:flex-wrap 2xl:gap-[2%]">
        {/* inputs */}
        <div className="mt-[20px] flex w-full flex-col gap-[12px] rounded-[18px] bg-white p-[15px] 2xl:mt-0 2xl:gap-[20px] 2xl:px-[25px] 2xl:py-[37px]">
          <div className="flex flex-col gap-[12px] 2xl:gap-[15px]">
            {services.map((item, index) => (
              <div
                key={index}
                className="flex flex-col gap-[12px] 2xl:flex-row 2xl:items-center 2xl:justify-between"
              >
                <div className="flex h-[25px] w-[25px] flex-row items-center gap-[8px] text-[17px] text-[#0129E3] 2xl:order-1">
                  <p className="font-medium 2xl:hidden">Услуга</p>
                  <button
                    onClick={() => deleteServiceByIndex(index)}
                    className="text-[#0129E3] text-[] 2xl:text-[]"
                  >
                    <IoClose className="h-[20px] w-[20px] 2xl:h-[25px] 2xl:w-[25px]" />
                  </button>
                </div>
                <div className="relative 2xl:w-[48%]">
                  <input
                    value={item.name[selectedInputLang]}
                    onChange={(e) =>
                      updateServiceFieldByIndex(
                        index,
                        'name',
                        selectedInputLang,
                        e.target.value
                      )
                    }
                    placeholder={
                      selectedInputLang === 'ru'
                        ? 'Название услуги'
                        : selectedInputLang === 'uz'
                          ? 'Xizmat nomi'
                          : 'Service Name'
                    }
                    className="focus:ring-ring w-full rounded-[12px] bg-[#F8F8F8] px-[15px] py-[18px] pl-[50px] text-[#747474] focus:outline-none focus:ring-1"
                  />
                  <GoPencil className="text-muted-foreground absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#0129E3]" />
                </div>
                <div className="relative 2xl:w-[48%]">
                  <input
                    value={item.price}
                    onChange={(e) => {
                      const value = Number(e.target.value); // Convert string to number
                      if (!isNaN(value)) {
                        updateServiceFieldByIndex(index, 'price', null, value); // Pass the converted number
                      }
                    }}
                    placeholder={
                      selectedInputLang === 'ru'
                        ? 'Цена'
                        : selectedInputLang === 'uz'
                          ? 'Narxi'
                          : 'Price'
                    }
                    className="focus:ring-ring w-full rounded-[12px] bg-[#F8F8F8] px-[15px] py-[18px] pl-[50px] text-[#747474] focus:outline-none focus:ring-1"
                  />
                  <GoPencil className="text-muted-foreground absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#0129E3]" />
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={addService}
            className="mt-[15px] h-[50px] w-full rounded-[12px] border border-[#0129E3] text-[15px] font-medium text-[#0129E3] 2xl:w-[220px] 2xl:text-[16px]"
          >
            {selectedInputLang === 'ru'
              ? 'Добавить услугу'
              : selectedInputLang === 'uz'
                ? "Xizmat qo'shish"
                : 'Add Service'}
          </button>
        </div>
        {/* BUTTON SAVE */}
        <div className="mt-[25px] flex w-full items-center 2xl:order-[3] 2xl:w-[100%] 2xl:justify-end">
          <SaveButton
            selectedInputLang={selectedInputLang}
            onClick={SaveChanges}
          />
        </div>
      </div>
    </div>
  );
};

export default DashboardServices;
