'use client';
import { useEffect, useState } from 'react';
import { useServiceStore } from '@/store/clinick/doctor/createServiceStore';
import { GoPencil } from 'react-icons/go';
import { IoClose } from 'react-icons/io5';
import { IoIosArrowDown } from 'react-icons/io';
import { FaCheck } from 'react-icons/fa6';
import { useLocale } from 'next-intl';
import toastr from 'toastr';
import { BiSolidPencil } from 'react-icons/bi';
import Image from 'next/image';
import { ILangTopProps } from '@/interface/langtopProps';
import SaveButton from '@/ui/saveButton';
import { ServiceCategory } from '@/store/createServiceStore';

const DashboardServices = ({ selectedInputLang }: ILangTopProps) => {
  const locale = useLocale();
  const {
    serviceCategories,
    fetchServiceCategories,
    save,
    promotions,
    updatePromotionFieldByIndex,
    deletePromotionByIndex,
    addPromotion,
    serviceList,
    addServiceList,
    setSelectedServiceCategory,
    updateServiceListFieldByIndex,
    fetchServicesByCategory,
    deleteServiceListByIndex,
    servicesByCategory,
  } = useServiceStore();

  useEffect(() => {
    fetchServiceCategories();
  }, [fetchServiceCategories]);

  const [openCategoryIndex, setOpenCategoryIndex] = useState<number | null>(
    null
  );
  const [openServiceIndex, setOpenServiceIndex] = useState<number | null>(null);

  useEffect(() => {
    const uniqueCategoryIds = Array.from(
      new Set(
        serviceList
          .map((item) => item.service?.categoryId)
          .filter((catId): catId is number => catId !== undefined)
      )
    );
    uniqueCategoryIds.forEach((catId) => {
      fetchServicesByCategory(catId);
    });
  }, [serviceList, fetchServicesByCategory]);

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
        <div className="mt-[20px] flex w-full flex-col gap-[12px] rounded-t-[18px] bg-white p-[15px] 2xl:mt-0 2xl:gap-[20px] 2xl:px-[25px] 2xl:py-[37px]">
          <div className="flex flex-col gap-[20px]">
            {serviceList.map((item, index) => {
              const selectedCategory =
                item.service && item.service.categoryId
                  ? serviceCategories.find(
                      (cat) => cat.id === item.service.categoryId
                    )
                  : null;
              const selectedService =
                item.service && item.service.id
                  ? selectedCategory && servicesByCategory[selectedCategory.id]
                    ? servicesByCategory[selectedCategory.id].find(
                        (s) => s.id === item.service.id
                      )
                    : null
                  : null;

              return (
                <div
                  key={index}
                  className="flex flex-col gap-[12px] 2xl:gap-[20px]"
                >
                  <div className="flex flex-row items-center gap-2 font-medium text-MyBlue">
                    {' '}
                    {selectedInputLang === 'ru'
                      ? 'Услуга'
                      : selectedInputLang === 'uz'
                        ? 'Xizmat'
                        : 'Service'}{' '}
                    {index + 1}
                    <button
                      className="2xl:hidden"
                      onClick={() => deleteServiceListByIndex(index)}
                    >
                      <IoClose className="h-6 w-6" />
                    </button>
                  </div>
                  <div className="flex flex-col gap-[12px] 2xl:grid 2xl:grid-cols-[1fr_1fr_1fr_40px] 2xl:gap-[20px]">
                    <div className="relative flex flex-col">
                      <button
                        type="button"
                        onClick={() =>
                          setOpenCategoryIndex(
                            openCategoryIndex === index ? null : index
                          )
                        }
                        className="focus:ring-ring flex w-full items-center justify-between rounded-[12px] bg-[#F8F8F8] px-[15px] py-[18px] text-left text-[#747474] focus:outline-none focus:ring-1"
                      >
                        <div className="relative flex items-center pl-[30px] 2xl:pl-[35px]">
                          <GoPencil className="absolute left-1 top-1/2 h-5 w-5 -translate-y-1/2 text-[#747474]" />
                          {selectedCategory ? (
                            <span>
                              {selectedCategory.name[selectedInputLang]}
                            </span>
                          ) : (
                            <span>
                              {selectedInputLang === 'ru'
                                ? 'Выберите категорию'
                                : selectedInputLang === 'uz'
                                  ? 'Kategoriya tanlang'
                                  : 'Select a category'}
                            </span>
                          )}
                        </div>
                        <IoIosArrowDown
                          className={`ml-2 h-4 w-4 transition-transform ${
                            openCategoryIndex === index ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {openCategoryIndex === index && (
                        <div
                          onMouseLeave={() => setOpenCategoryIndex(null)}
                          className="absolute top-[70px] z-[99999] w-full overflow-y-auto rounded-[12px] bg-white p-[10px] shadow-xl 2xl:top-[80px] 2xl:h-[420px] 2xl:max-h-[420px]"
                        >
                          {serviceCategories.length ? (
                            serviceCategories.map(
                              (category: ServiceCategory) => (
                                <button
                                  key={category.id}
                                  onClick={() => {
                                    updateServiceListFieldByIndex(
                                      index,
                                      'service',
                                      {
                                        ...item.service,
                                        categoryId: category.id,
                                        id: undefined,
                                      }
                                    );
                                    setSelectedServiceCategory(category);
                                    setOpenCategoryIndex(null);
                                    setOpenServiceIndex(null);
                                  }}
                                  className="flex w-full items-center justify-between rounded-[12px] px-[24px] py-[20px] text-[15px] text-[#747474] hover:bg-[#F8F8F8] 2xl:text-[16px]"
                                >
                                  {category.name[selectedInputLang]}
                                  {selectedCategory &&
                                    selectedCategory.id === category.id && (
                                      <FaCheck className="h-4 w-4" />
                                    )}
                                </button>
                              )
                            )
                          ) : (
                            <p className="px-[24px] py-[20px] text-[15px] text-[#747474]">
                              No categories available.
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Выпадающий список для выбора услуги */}
                    <div className="relative flex flex-col">
                      <button
                        type="button"
                        onClick={() =>
                          setOpenServiceIndex(
                            openServiceIndex === index ? null : index
                          )
                        }
                        className="focus:ring-ring flex w-full items-center justify-between rounded-[12px] bg-[#F8F8F8] px-[15px] py-[18px] text-left text-[#747474] focus:outline-none focus:ring-1"
                      >
                        <div className="relative flex items-center pl-[30px] 2xl:pl-[35px]">
                          <GoPencil className="absolute left-1 top-1/2 h-5 w-5 -translate-y-1/2 text-[#747474]" />
                          {selectedService ? (
                            <span>
                              {selectedService.name[selectedInputLang]}
                            </span>
                          ) : (
                            <span>
                              {selectedInputLang === 'ru'
                                ? 'Выберите услугу'
                                : selectedInputLang === 'uz'
                                  ? 'Xizmatni tanlang'
                                  : 'Select a service'}
                            </span>
                          )}
                        </div>
                        <IoIosArrowDown
                          className={`ml-2 h-4 w-4 transition-transform ${
                            openServiceIndex === index ? 'rotate-180' : ''
                          }`}
                        />
                      </button>
                      {openServiceIndex === index && (
                        <div
                          onMouseLeave={() => setOpenServiceIndex(null)}
                          className="absolute top-[70px] z-[99999] w-full overflow-y-auto rounded-[12px] bg-white p-[10px] shadow-xl 2xl:top-[80px] 2xl:h-[420px] 2xl:max-h-[420px]"
                        >
                          {selectedCategory ? (
                            (servicesByCategory[selectedCategory.id] || [])
                              .length ? (
                              (
                                servicesByCategory[selectedCategory.id] || []
                              ).map((service) => (
                                <button
                                  key={service.id}
                                  onClick={() => {
                                    updateServiceListFieldByIndex(
                                      index,
                                      'service',
                                      {
                                        ...item.service,
                                        ...service,
                                      }
                                    );
                                    setOpenServiceIndex(null);
                                  }}
                                  className="flex w-full items-center justify-between rounded-[12px] px-[24px] py-[20px] text-[15px] text-[#747474] hover:bg-[#F8F8F8] 2xl:text-[16px]"
                                >
                                  {service.name[selectedInputLang]}
                                  {selectedService &&
                                    selectedService.id === service.id && (
                                      <FaCheck className="h-4 w-4" />
                                    )}
                                </button>
                              ))
                            ) : (
                              <p className="px-[24px] py-[20px] text-[15px] text-[#747474]">
                                {selectedInputLang === 'ru'
                                  ? 'Нет доступных услуг.'
                                  : selectedInputLang === 'uz'
                                    ? 'Xizmatlar mavjud emas.'
                                    : 'No services available.'}
                              </p>
                            )
                          ) : (
                            <p className="px-[24px] py-[20px] text-[15px] text-[#747474]">
                              {selectedInputLang === 'ru'
                                ? 'Сначала выберите категорию.'
                                : selectedInputLang === 'uz'
                                  ? 'Avval kategoriya tanlang.'
                                  : 'Select a category first.'}
                            </p>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Поле ввода цены */}
                    <div className="relative">
                      <input
                        type="number"
                        value={item.price || ''}
                        onChange={(e) => {
                          const value = parseFloat(e.target.value);
                          updateServiceListFieldByIndex(index, 'price', value);
                        }}
                        placeholder={
                          selectedInputLang === 'ru'
                            ? 'Введите цену'
                            : selectedInputLang === 'uz'
                              ? 'Narxni kiriting'
                              : 'Enter price'
                        }
                        className="focus:ring-ring w-full rounded-[12px] bg-[#F8F8F8] px-[15px] py-[18px] pl-[50px] text-[#747474] focus:outline-none focus:ring-1"
                      />
                      <GoPencil className="absolute left-[1.2rem] top-1/2 h-5 w-5 -translate-y-1/2 text-[#0129E3]" />
                    </div>

                    <div className="group col-span-1 hidden items-center justify-center 2xl:flex">
                      <button
                        onClick={() => deleteServiceListByIndex(index)}
                        className="flex h-[40px] w-[40px] items-center justify-center rounded bg-white text-MyBlue group-hover:text-red-900"
                      >
                        <IoClose className="h-6 w-6" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Кнопка добавления сервиса */}
          <button
            onClick={addServiceList}
            className="mt-[15px] h-[50px] w-full rounded-[12px] border border-[#0129E3] text-[15px] font-medium text-[#0129E3] 2xl:w-[220px] 2xl:text-[16px]"
          >
            {selectedInputLang === 'ru'
              ? 'Добавить услугу'
              : selectedInputLang === 'uz'
                ? "Xizmat qo'shish"
                : 'Add Service'}
          </button>
        </div>

        {/* AKSIYALAR */}
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
                    htmlFor={`file-input-${index}`}
                    className="absolute z-[999] h-full w-full cursor-pointer"
                  >
                    <Image
                      src={
                        item.imageFile instanceof File
                          ? URL.createObjectURL(item.imageFile)
                          : item.imageUrl ||
                            'https://ucarecdn.com/568467e3-d7fd-4272-854e-884e5325aa23/-/preview/354x370/'
                      }
                      alt="Profile Preview"
                      width={1000}
                      height={950}
                      loading="lazy"
                      quality={75}
                      className="h-full w-full rounded-[20px] object-cover"
                    />
                    <button
                      aria-hidden="true"
                      className="pointer-events-none absolute right-[20px] top-[20px] flex h-[40px] w-[40px] items-center justify-center rounded-full bg-[#060a2280] bg-opacity-[50%] text-center text-white 2xl:h-[45px] 2xl:w-[45px]"
                    >
                      <BiSolidPencil />
                    </button>
                  </label>
                  <input
                    id={`file-input-${index}`}
                    type="file"
                    accept="image/*"
                    onChange={(e) => {
                      if (e.target.files && e.target.files[0]) {
                        updatePromotionFieldByIndex(
                          index,
                          'imageFile',
                          null,
                          e.target.files[0]
                        );
                      }
                    }}
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
                        className="focus:ring-ring w-full resize-none rounded-[12px] bg-[#F8F8F8] px-[15px] py-[18px] pl-[50px] text-[#747474] focus:outline-none focus:ring-1 2xl:h-[150px]"
                      />
                      <GoPencil className="text-muted-foreground absolute left-3 top-[30px] h-5 w-5 -translate-y-1/2 text-[#0129E3]" />
                    </div>
                    <button
                      onClick={() => deletePromotionByIndex(index)}
                      className="relative rounded-[8px] bg-red-700 py-2 font-medium text-white 2xl:w-56"
                    >
                      {selectedInputLang === 'ru'
                        ? 'Удалить'
                        : selectedInputLang === 'uz'
                          ? "O'chirish"
                          : 'Delete'}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

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
        <div className="2xl:w-64">
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
