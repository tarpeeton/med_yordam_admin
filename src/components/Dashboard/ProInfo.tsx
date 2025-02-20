'use client';
import { useState, useEffect } from 'react';
import toastr from 'toastr';

import { IoIosArrowDown } from 'react-icons/io';
import { FaCheck } from 'react-icons/fa6';
import { useProInfoStore } from '@/store/useProInfoStore';
import { IoGlobeOutline } from 'react-icons/io5';
import { GoPencil } from 'react-icons/go';
import { MdOutlineDateRange } from 'react-icons/md';
import { FaPlus } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import { useLocale } from 'next-intl';
import { ILangTopProps } from '@/interface/langtopProps';
import SaveButton from '@/ui/saveButton';

const DashboardProInfo = ({ selectedInputLang }: ILangTopProps) => {
  const locale = useLocale();

  const {
    specialties,
    languages,
    achievements,
    educations,
    toggleSpecialty,
    toggleLanguage,
    addAchievement,
    updateAchievementField,
    updateEducationField,
    save,
    addEducation,
    updateQuote,
    quote,
    addWorkExperience,
    updateWorkExperienceFieldByIndex,
    workExperiences,
    removePositionFromWorkExperience,
    fetchSpecialties,
    addPositionToWorkExperience,
    updatePositionInWorkExperience,
    fetchLanguage,
  } = useProInfoStore();

  const [openSpecialization, setOpenSpecialization] = useState(false);
  const [openLanguage, setOpenLanguage] = useState(false);
  const selectedCount = specialties.filter((s) => s.selected).length;
  const selectedLanguages = languages.filter((l) => l.selected).length;
  const handleAddAchievement = () => {
    addAchievement();
  };

  const handleSave = async () => {
    const success = await save();
    if (success) {
      const successMessage =
        locale === 'ru'
          ? 'успешно сохранён!'
          : locale === 'uz'
            ? 'muvaffaqiyatli saqlandi!'
            : 'saved successfully!';

      toastr.success(successMessage);
    } else {
      const errorMessage =
        locale === 'ru'
          ? 'Ошибка при сохранении'
          : locale === 'uz'
            ? 'Saqlashda xatolik yuz berdi.'
            : 'Error saving profile.';

      toastr.error(errorMessage);
    }
  };

  useEffect(() => {
    fetchSpecialties();
    fetchLanguage();
  }, [locale]);

  return (
    <div className="mt-[25px] 2xl:mt-[37px]">
      <div className="flex flex-col 2xl:flex-row 2xl:flex-wrap 2xl:gap-[2%]">
        {/* inputs */}
        <div className="mt-[20px] flex w-full flex-col gap-[15px] rounded-[18px] bg-white p-[15px] 2xl:mt-0 2xl:gap-[60px] 2xl:px-[25px] 2xl:py-[37px]">
          <div className="flex flex-col gap-[12px] 2xl:flex-row 2xl:gap-[1%]">
            <div className="relative flex flex-col 2xl:w-[49%]">
              <button
                type="button"
                onClick={() => setOpenSpecialization((prev) => !prev)}
                className="focus:ring-ring flex w-full items-center justify-between rounded-[12px] bg-[#F8F8F8] px-[15px] py-[18px] text-left text-[#747474] focus:outline-none focus:ring-1"
              >
                <div className="flex items-center pl-[25px] 2xl:pl-[25px]">
                  <GoPencil className="text-muted-foreground absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#747474]" />
                  {selectedInputLang === 'ru'
                    ? 'Специальность'
                    : selectedInputLang === 'uz'
                      ? 'Muttaxasislik'
                      : 'Speciality'}
                  {selectedCount > 0 ? `(${selectedCount})` : ''}
                </div>
                <IoIosArrowDown
                  className={`ml-2 h-4 w-4 transition-transform ${openSpecialization ? 'rotate-180' : ''}`}
                />
              </button>
              {openSpecialization && (
                <div
                  onMouseLeave={() => setOpenSpecialization(false)}
                  className="absolute top-[70px] z-[222] w-full overflow-y-auto rounded-[12px] bg-white p-[10px] shadow-xl 2xl:top-[80px] 2xl:h-[420px] 2xl:max-h-[420px]"
                >
                  {specialties.map((item, index) => (
                    <button
                      onClick={() => toggleSpecialty(item.id)}
                      key={index}
                      className="flex w-full flex-row flex-nowrap items-center justify-between rounded-[12px] px-[24px] py-[20px] text-[15px] text-[#747474] hover:bg-[#F8F8F8] 2xl:text-[16px]"
                    >
                      {item.name[selectedInputLang]}
                      {item.selected && <FaCheck className="h-4 w-4" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
            <div className="relative flex flex-col 2xl:w-[49%]">
              <button
                type="button"
                onClick={() => setOpenLanguage((prev) => !prev)}
                className="focus:ring-ring flex w-full items-center justify-between rounded-[12px] bg-[#F8F8F8] px-[15px] py-[18px] text-left text-[#747474] focus:outline-none focus:ring-1"
              >
                <div className="flex items-center pl-[25px] 2xl:pl-[25px]">
                  <IoGlobeOutline className="text-muted-foreground absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#747474]" />
                  {selectedInputLang === 'ru'
                    ? 'Языки    '
                    : selectedInputLang === 'uz'
                      ? 'Til '
                      : 'Languages'}
                  {selectedLanguages > 0 ? `(${selectedLanguages})` : ''}
                </div>
                <IoIosArrowDown
                  className={`ml-2 h-4 w-4 transition-transform ${openLanguage ? 'rotate-180' : ''}`}
                />
              </button>
              {openLanguage && (
                <div
                  onMouseLeave={() => setOpenLanguage(false)}
                  className="absolute top-[80px] z-[100] w-full rounded-[12px] bg-white p-[10px] shadow-xl"
                >
                  {languages.map((item, index) => (
                    <button
                      onClick={() => toggleLanguage(item.id)}
                      key={index}
                      className="flex w-full flex-row flex-nowrap items-center justify-between rounded-[12px] px-[24px] py-[20px] text-[15px] text-[#747474] hover:bg-[#F8F8F8] 2xl:text-[16px]"
                    >
                      {item.value}
                      {item.selected && <FaCheck className="h-4 w-4" />}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
          {/* DOSTIJENYA */}
          <div className="flex flex-col">
            <div className="relative">
              <h1 className="text-[17px] font-medium text-[#000000] 2xl:text-[20px]">
                {selectedInputLang === 'ru'
                  ? 'Достижения'
                  : selectedInputLang === 'uz'
                    ? 'Yutug`lar'
                    : 'Achievements'}
              </h1>
              <div className="mt-[15px] grid grid-cols-1 gap-[15px] 2xl:grid-cols-2">
                {achievements.map((achievement, index) => (
                  <div key={index} className="relative w-full">
                    <input
                      value={achievement[selectedInputLang]?.[0] || ''}
                      onChange={(e) =>
                        updateAchievementField(
                          index,
                          selectedInputLang,
                          e.target.value
                        )
                      }
                      placeholder={
                        selectedInputLang === 'ru'
                          ? 'Достижение'
                          : selectedInputLang === 'uz'
                            ? 'Yutuqlar'
                            : 'Achievements'
                      }
                      className="focus:ring-ring w-full rounded-[12px] bg-[#F8F8F8] px-[15px] py-[18px] pl-[40px] text-[#747474] focus:outline-none focus:ring-1"
                    />
                    <GoPencil className="text-muted-foreground absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#747474]" />
                  </div>
                ))}
              </div>
              <button
                onClick={handleAddAchievement}
                className="mt-[15px] h-[50px] w-full rounded-[12px] border border-[#0129E3] text-[15px] font-medium text-[#0129E3] 2xl:w-[220px] 2xl:text-[16px]"
              >
                {selectedInputLang === 'ru'
                  ? ' Добавить'
                  : selectedInputLang === 'uz'
                    ? ' Qo`shish'
                    : 'Add'}
              </button>
            </div>
          </div>
          {/* Образование */}
          <div className="flex flex-col">
            <div className="relative">
              <h1 className="text-[17px] font-medium text-[#000000] 2xl:text-[20px]">
                {selectedInputLang === 'ru'
                  ? 'Образование'
                  : selectedInputLang === 'uz'
                    ? 'Ta`lim'
                    : 'Education'}
              </h1>
              <div className="mt-[15px] flex w-full flex-col gap-[12px] 2xl:gap-[15px]">
                {educations?.map((education) => (
                  <div
                    key={education.id}
                    className="grid w-full grid-cols-1 gap-[12px] 2xl:grid-cols-2 2xl:gap-[15px]"
                  >
                    {/* Education Name */}
                    <div className="relative">
                      <input
                        value={education.name[selectedInputLang]}
                        onChange={(e) =>
                          updateEducationField(
                            education.id,
                            'name',
                            selectedInputLang,
                            e.target.value
                          )
                        }
                        placeholder={
                          selectedInputLang === 'ru'
                            ? 'Название образования'
                            : selectedInputLang === 'uz'
                              ? 'Oquv dargohi nomi'
                              : 'Education Name'
                        }
                        className="focus:ring-ring w-full rounded-[12px] bg-[#F8F8F8] px-[15px] py-[18px] pl-[40px] text-[#747474] focus:outline-none focus:ring-1"
                      />
                      <GoPencil className="absolute left-2 top-1/2 -translate-y-1/2 transform text-gray-500" />
                    </div>
                    {/* Education Direction */}
                    <div className="relative">
                      <input
                        value={education?.faculty?.[selectedInputLang]}
                        onChange={(e) =>
                          updateEducationField(
                            education.id,
                            'faculty',
                            selectedInputLang,
                            e.target.value
                          )
                        }
                        placeholder={
                          selectedInputLang === 'ru'
                            ? 'Направление'
                            : selectedInputLang === 'uz'
                              ? "Yo'nalish"
                              : 'Direction'
                        }
                        className="focus:ring-ring w-full rounded-[12px] bg-[#F8F8F8] px-[15px] py-[18px] pl-[40px] text-[#747474] focus:outline-none focus:ring-1"
                      />
                      <GoPencil className="absolute left-2 top-1/2 -translate-y-1/2 transform text-gray-500" />
                    </div>
                    <div className="relative">
                      {/* Start Year */}
                      <input
                        type="text"
                        value={education.fromYear}
                        onChange={(e) =>
                          updateEducationField(
                            education?.id,
                            'fromYear',
                            null,
                            e.target.value
                          )
                        }
                        placeholder={
                          selectedInputLang === 'ru'
                            ? 'Год начала'
                            : selectedInputLang === 'uz'
                              ? 'Boshlanish yili'
                              : 'Start year'
                        }
                        className="focus:ring-ring w-full rounded-[12px] bg-[#F8F8F8] px-[15px] py-[18px] pl-[40px] text-[#747474] focus:outline-none focus:ring-1"
                      />
                      <GoPencil className="absolute left-2 top-1/2 -translate-y-1/2 transform text-gray-500" />
                    </div>

                    <div className="relative">
                      {/* End Year */}
                      <input
                        type="text"
                        value={education.toYear}
                        onChange={(e) =>
                          updateEducationField(
                            education.id,
                            'toYear',
                            null,
                            e.target.value
                          )
                        }
                        placeholder={
                          selectedInputLang === 'ru'
                            ? 'Год окончания'
                            : selectedInputLang === 'uz'
                              ? 'Tugatilgan yili'
                              : 'End year'
                        }
                        className="focus:ring-ring w-full rounded-[12px] bg-[#F8F8F8] px-[15px] py-[18px] pl-[40px] text-[#747474] focus:outline-none focus:ring-1"
                      />
                      <GoPencil className="absolute left-2 top-1/2 -translate-y-1/2 transform text-gray-500" />
                    </div>
                  </div>
                ))}
              </div>
              <button
                onClick={addEducation}
                className="mt-[15px] h-[50px] w-full rounded-[12px] border border-[#0129E3] text-[15px] font-medium text-[#0129E3] 2xl:w-[220px] 2xl:text-[16px]"
              >
                {selectedInputLang === 'ru'
                  ? ' Добавить'
                  : selectedInputLang === 'uz'
                    ? ' Qo`shish'
                    : 'Add'}
              </button>
            </div>
          </div>
          {/* Work Experience Section */}
          <div className="flex flex-col">
            <h1 className="text-[17px] font-medium text-[#000000] 2xl:text-[20px]">
              {selectedInputLang === 'ru'
                ? 'Опыт работы'
                : selectedInputLang === 'uz'
                  ? 'Ish tajribasi'
                  : 'Work Experience'}
            </h1>
            <div className="mt-[15px] flex flex-col gap-[15px]">
              {workExperiences?.map((experience, index) => (
                <div key={experience.id as number} className="rounded-[12px]">
                  <div className="grid grid-cols-1 gap-[12px] 2xl:grid-cols-4">
                    <div className="relative">
                      <input
                        type="text"
                        value={experience?.name[selectedInputLang]}
                        onChange={(e) =>
                          updateWorkExperienceFieldByIndex(
                            index,
                            'name', // Поле для обновления
                            selectedInputLang, // Язык (например, 'ru', 'uz', 'en')
                            e.target.value // Новое значение
                          )
                        }
                        placeholder={
                          selectedInputLang === 'ru'
                            ? 'Название клиники'
                            : selectedInputLang === 'uz'
                              ? 'Klinika nomi'
                              : 'Clinic Name'
                        }
                        className="AdminInput"
                      />
                      <GoPencil className="text-muted-foreground absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#747474]" />
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        value={experience.city[selectedInputLang]}
                        onChange={(e) =>
                          updateWorkExperienceFieldByIndex(
                            index,
                            'city', // Поле для обновления
                            selectedInputLang, // Язык (например, 'ru', 'uz', 'en')
                            e.target.value // Новое значение
                          )
                        }
                        placeholder={
                          selectedInputLang === 'ru'
                            ? 'Город'
                            : selectedInputLang === 'uz'
                              ? 'Shahar'
                              : 'City'
                        }
                        className="AdminInput"
                      />
                      <GoPencil className="text-muted-foreground absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#747474]" />
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        value={experience.fromYear}
                        onChange={(e) =>
                          updateWorkExperienceFieldByIndex(
                            index,
                            'fromYear', // Поле для обновления
                            null, // Язык (например, 'ru', 'uz', 'en')
                            e.target.value // Новое значение
                          )
                        }
                        placeholder={
                          selectedInputLang === 'ru'
                            ? 'Год начала'
                            : selectedInputLang === 'uz'
                              ? 'Boshlanish yili'
                              : 'Start year'
                        }
                        className="AdminInput"
                      />
                      <MdOutlineDateRange className="text-muted-foreground absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#747474]" />
                    </div>
                    <div className="relative">
                      <MdOutlineDateRange className="text-muted-foreground absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#747474]" />
                      <input
                        type="text"
                        value={experience.toYear}
                        onChange={(e) =>
                          updateWorkExperienceFieldByIndex(
                            index,
                            'toYear',
                            null,
                            e.target.value
                          )
                        }
                        placeholder={
                          selectedInputLang === 'ru'
                            ? 'Год окончания'
                            : selectedInputLang === 'uz'
                              ? 'Tugatilgan yili'
                              : 'End year'
                        }
                        className="AdminInput"
                      />
                    </div>
                  </div>
                  <div className="mt-[15px] flex w-full flex-col items-center justify-between rounded-[12px] bg-[#F8F8F8] p-[7px] 2xl:mt-[12px] 2xl:flex-row 2xl:p-[14px]">
                    <div className="grid grid-cols-2 gap-[10px] 2xl:grid-cols-6">
                      {experience.position[selectedInputLang]?.map(
                        (item, index) => (
                          <div
                            key={index}
                            className="relative flex items-center rounded-[8px] bg-[#0129E3] px-[15px] py-[8px] text-white"
                          >
                            <input
                              value={item}
                              onChange={(e) => {
                                updatePositionInWorkExperience(
                                  experience.id as number,
                                  index,
                                  selectedInputLang,
                                  e.target.value
                                );
                              }}
                              className="w-full bg-transparent text-white focus:outline-none"
                            />
                            <button
                              onClick={() =>
                                removePositionFromWorkExperience(
                                  experience.id as number,
                                  index
                                )
                              }
                              className="ml-[5px] text-white"
                            >
                              <IoClose />
                            </button>
                          </div>
                        )
                      )}
                    </div>
                    <button className="mt-[25px] h-[20px] w-[20px] text-[#0129E3] 2xl:mt-0">
                      <FaPlus
                        onClick={() =>
                          addPositionToWorkExperience(
                            experience.id as number,
                            selectedInputLang
                          )
                        }
                        className="h-full w-full"
                      />
                    </button>
                  </div>
                </div>
              ))}
              <button
                onClick={addWorkExperience}
                className="mt-[15px] h-[50px] w-full rounded-[12px] border border-[#0129E3] text-[15px] font-medium text-[#0129E3] 2xl:w-[220px] 2xl:text-[16px]"
              >
                {selectedInputLang === 'ru'
                  ? ' Добавить'
                  : selectedInputLang === 'uz'
                    ? ' Qo`shish'
                    : 'Add'}
              </button>
            </div>
          </div>

          {/* SITATA */}
          <div className="flex flex-col gap-[12px] 2xl:gap-[15px]">
            <h1 className="text-[17px] font-medium text-[#000000] 2xl:text-[20px]">
              {selectedInputLang === 'ru'
                ? 'Цитата'
                : selectedInputLang === 'uz'
                  ? 'Iqtibos'
                  : 'Quote'}
            </h1>
            <div className="relative w-full">
              <textarea
                value={quote[selectedInputLang] || ''}
                onChange={(e) => updateQuote(selectedInputLang, e.target.value)}
                maxLength={250}
                placeholder={
                  selectedInputLang === 'ru'
                    ? 'Цитата '
                    : selectedInputLang === 'uz'
                      ? 'Iqtibos'
                      : 'Quote'
                }
                className="focus:ring-ring w-full rounded-[12px] bg-[#F8F8F8] px-[15px] py-[18px] pl-[40px] text-[#747474] focus:outline-none focus:ring-1 2xl:h-[150px]"
              />
              <GoPencil className="text-muted-foreground absolute left-3 top-[31px] h-5 w-5 -translate-y-1/2 text-[#747474] 2xl:top-[30px]" />
            </div>
          </div>
        </div>

        {/* BUTTON SAVE */}
        <div className="mt-[25px] flex w-full items-center 2xl:order-[3] 2xl:w-[100%] 2xl:justify-end">
          <div className="w-full lg:w-60 2xl:w-64">
            <SaveButton
              selectedInputLang={selectedInputLang}
              onClick={handleSave}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardProInfo;
