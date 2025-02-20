import { ILangTopProps } from '@/interface/langtopProps';
import { useClinicPromotions } from '@/store/clinick/promotions';
import { GoPencil } from 'react-icons/go';
import Image from 'next/image';
import { BiSolidPencil } from 'react-icons/bi';
import SaveButton from '@/ui/saveButton';
import { useLocale } from 'next-intl';
import toastr from 'toastr';

export const Promotions = ({ selectedInputLang }: ILangTopProps) => {
  const locale = useLocale() as 'ru' | 'uz' | 'en';

  const {
    promotions,
    addPromotion,
    deletePromotionByIndex,
    updatePromotionFieldByIndex,
    savePromotions,
  } = useClinicPromotions();

  const SaveChanges = async () => {
    const { status, message } = await savePromotions();
    toastr[status ? 'success' : 'error'](message[locale]);
  };

  console.log(promotions, 'SALOM SAA');

  return (
    <section>
      <div className="w-full rounded-b-[18px] bg-white p-[15px] pt-[25px] mdl:pt-[40px] 2xl:px-[25px] 2xl:pb-[30px] 2xl:pt-[20px]">
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
                      value={item.address?.[selectedInputLang] || ''}
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
                      value={item.phone || ''}
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
                      value={item.title?.[selectedInputLang] || ''}
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
                      value={item.discount}
                      onChange={(e) =>
                        updatePromotionFieldByIndex(
                          index,
                          'discount',
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
      <div className="mt-[25px] flex w-full items-center 2xl:order-[3] 2xl:w-[100%] 2xl:justify-end">
        <div className="w-full lg:w-60 2xl:w-64">
          <SaveButton
            selectedInputLang={selectedInputLang}
            onClick={SaveChanges}
          />
        </div>
      </div>
    </section>
  );
};
