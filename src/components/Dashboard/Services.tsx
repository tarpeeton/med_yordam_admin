'use client';
import { useServiceStore } from '@/store/createServiceStore';
import { GoPencil } from 'react-icons/go';
import { IoClose } from 'react-icons/io5';
import { useLocale } from 'next-intl';
import toastr from 'toastr';
import { BiSolidPencil } from 'react-icons/bi';
import Image from 'next/image';
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
    promotions,
    updatePromotionFieldByIndex,
    addPromotion,
  } = useServiceStore();

  console.log(promotions, 'PROMOTIONS');

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
    <div className="mt-[25px 2xl:mt-[37px]">
      <div className="flex flex-col 2xl:flex-row 2xl:flex-wrap 2xl:gap-[2%]">
        {/* inputs */}
        <div className="mt-[20px] flex w-full flex-col gap-[12px] rounded-t-[18px] bg-white p-[15px] 2xl:mt-0 2xl:gap-[20px] 2xl:px-[25px] 2xl:py-[37px]">
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

        <div className="w-full rounded-b-[18px] bg-white p-[15px] pt-[25px] mdl:pt-[40px] 2xl:px-[25px] 2xl:pb-[30px] 2xl:pt-[60px]">
          <h2 className="text-[17px] font-medium 2xl:text-[20px]">
            {selectedInputLang === 'ru'
              ? 'Акции'
              : selectedInputLang === 'uz'
                ? 'Aksiya'
                : 'Promotion'}
          </h2>
          {promotions.map((item, index) => (
            <div key={index} className="mt-[20px] w-full 2xl:mt-[60px]">
              <div className="flex w-full flex-col gap-[20px] 2xl:flex-row">
                {/* Image Upload and Display */}
                <div className="relative h-[264px] w-full overflow-hidden bg-white p-[4px] slg:h-[300px] 2xl:h-[350px] 2xl:max-h-[350px] 2xl:w-[38%]">
                  <label
                    htmlFor="file-input"
                    className="absolute z-[99] h-full w-full cursor-pointer"
                  >
                    <Image
                      src={
                        'https://ucarecdn.com/568467e3-d7fd-4272-854e-884e5325aa23/-/preview/354x370/'
                      }
                      alt="Profile Preview"
                      width={1000}
                      height={950}
                      loading="lazy"
                      layout="responsive"
                      quality={75}
                      className="h-full w-full rounded-[20px] object-cover"
                    />
                    <button className="absolute right-[20px] top-[20px] z-10 flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#050B2B80] bg-opacity-[50%] text-center text-white 2xl:h-[45px] 2xl:w-[45px]">
                      <BiSolidPencil />
                    </button>
                  </label>
                  <input
                    id="file-input"
                    type="file"
                    accept="image/*"
                    // onChange={handleFileChange}
                    className="hidden"
                  />
                </div>

                {/* Inputs */}
                <div className="2xl:w-[80%]">
                  <div className="grid w-full grid-cols-1 gap-3 2xl:grid-cols-2">
                    <div className="relative 2xl:h-[60px]">
                      <input
                        value={item.address[selectedInputLang]}
                        onChange={(e) =>
                          updatePromotionFieldByIndex(
                            index,
                            'address',
                            selectedInputLang,
                            e.target.value
                          )
                        }
                        placeholder={
                          selectedInputLang === 'ru'
                            ? 'Адрес'
                            : selectedInputLang === 'uz'
                              ? 'Adres'
                              : 'Address'
                        }
                        className="focus:ring-ring w-full rounded-[12px] bg-[#F8F8F8] px-[15px] py-[18px] pl-[50px] text-[#747474] focus:outline-none focus:ring-1"
                      />
                      <GoPencil className="text-muted-foreground absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#0129E3]" />
                    </div>
                    <div className="relative 2xl:h-[60px]">
                      <input
                        value={item.phone}
                        onChange={(e) =>
                          updatePromotionFieldByIndex(
                            index,
                            'phone',
                            null,
                            e.target.value
                          )
                        }
                        placeholder={
                          selectedInputLang === 'ru'
                            ? 'Телефон '
                            : selectedInputLang === 'uz'
                              ? 'Telefon raqam'
                              : 'Phone'
                        }
                        className="focus:ring-ring w-full rounded-[12px] bg-[#F8F8F8] px-[15px] py-[18px] pl-[50px] text-[#747474] focus:outline-none focus:ring-1"
                      />
                      <GoPencil className="text-muted-foreground absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#0129E3]" />
                    </div>
                    <div className="relative 2xl:h-[60px]">
                      <input
                        value={item.title[selectedInputLang]}
                        onChange={(e) =>
                          updatePromotionFieldByIndex(
                            index,
                            'title',
                            selectedInputLang,
                            e.target.value
                          )
                        }
                        placeholder={
                          selectedInputLang === 'ru'
                            ? 'Заголовок '
                            : selectedInputLang === 'uz'
                              ? 'Sarlavha'
                              : 'Title'
                        }
                        className="focus:ring-ring w-full rounded-[12px] bg-[#F8F8F8] px-[15px] py-[18px] pl-[50px] text-[#747474] focus:outline-none focus:ring-1"
                      />
                      <GoPencil className="text-muted-foreground absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#0129E3]" />
                    </div>
                    <div className="relative 2xl:h-[60px]">
                      <input
                        value={item.discountPercentage}
                        onChange={(e) =>
                          updatePromotionFieldByIndex(
                            index,
                            'discountPercentage',
                            null,
                            e.target.value
                          )
                        }
                        placeholder={
                          selectedInputLang === 'ru'
                            ? '% скидки'
                            : selectedInputLang === 'uz'
                              ? '% chegirma'
                              : '% discout'
                        }
                        className="focus:ring-ring w-full rounded-[12px] bg-[#F8F8F8] px-[15px] py-[18px] pl-[50px] text-[#747474] focus:outline-none focus:ring-1"
                      />
                      <GoPencil className="text-muted-foreground absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#0129E3]" />
                    </div>
                    <div className="relative col-span-full 2xl:h-[150px]">
                      <textarea
                        value={item.description[selectedInputLang]}
                        maxLength={500}
                        onChange={(e) =>
                          updatePromotionFieldByIndex(
                            index,
                            'description',
                            selectedInputLang,
                            e.target.value
                          )
                        }
                        placeholder={
                          selectedInputLang === 'ru'
                            ? 'Описание '
                            : selectedInputLang === 'uz'
                              ? 'Tavsif'
                              : 'Description'
                        }
                        className="focus:ring-ring w-full rounded-[12px] bg-[#F8F8F8] px-[15px] py-[18px] pl-[50px] text-[#747474] focus:outline-none focus:ring-1 2xl:h-[150px]"
                      />
                      <GoPencil className="text-muted-foreground absolute left-3 top-[30px] h-5 w-5 -translate-y-1/2 text-[#0129E3]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}

          <button
            onClick={addPromotion}
            className="mt-[15px] h-[50px] w-full rounded-[12px] border border-[#0129E3] text-[15px] font-medium text-[#0129E3] 2xl:mt-[120px] 2xl:w-[220px] 2xl:text-[16px]"
          >
            {selectedInputLang === 'ru'
              ? 'Добавить еще акции'
              : selectedInputLang === 'uz'
                ? "Ko'proq aktsiyalarni qo'shish"
                : 'Add more promotions'}
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
