import { ILangTopProps } from '@/interface/langtopProps';
import { GoPencil } from 'react-icons/go';
import { useSertificatesStore } from '@/store/clinick/sertificates';
import { useLocale } from 'next-intl';
import { IoCloseOutline } from 'react-icons/io5';
import toastr from 'toastr';
import { MdOutlineAttachFile } from 'react-icons/md';

export const ProInfoClinic = ({ selectedInputLang }: ILangTopProps) => {
  const { files, addFiles, deleteFile, saveFiles } = useSertificatesStore();
  const locale = useLocale();
  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filesList = event.target.files;
    if (filesList) {
      addFiles(filesList);
    }
  };

  const SaveChanges = async () => {
    const success = await saveFiles();
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
            ? 'Saved successfully!'
            : 'Error saving profile.';

    toastr[success ? 'success' : 'error'](message);
  };
  return (
    <div>
      <div className="mt-[25px] 2xl:mt-[37px]">
        <div className="flex flex-col bg-[#FFFFFF]">
          <div className="p-4 2xl:p-6">
            {/* ABOUT US */}
            <div className="flex flex-col gap-3 2xl:gap-4">
              <p className="text-[17px] font-medium mdl:text-[18px] 2xl:text-[20px]">
                {selectedInputLang === 'ru'
                  ? 'О нас '
                  : selectedInputLang === 'uz'
                    ? 'Biz Haqimizda'
                    : 'About Us'}
              </p>
              <div className="relative">
                <input
                  type="text"
                  placeholder={
                    selectedInputLang === 'ru'
                      ? 'Название клиники'
                      : selectedInputLang === 'uz'
                        ? 'Klinika nomi'
                        : 'Clinic Name'
                  }
                  className="focus:ring-ring w-full rounded-[12px] bg-[#F8F8F8] px-[15px] py-[18px] pl-[50px] text-[#747474] focus:outline-none focus:ring-1"
                />
                <GoPencil className="absolute left-[1.2rem] top-1/2 h-5 w-5 -translate-y-1/2 text-[#0129E3]" />
              </div>
              <div className="relative col-span-full 2xl:h-[150px]">
                <textarea
                  maxLength={500}
                  placeholder={
                    selectedInputLang === 'ru'
                      ? 'Введите текст '
                      : selectedInputLang === 'uz'
                        ? 'Matni kiriting'
                        : ''
                  }
                  className="focus:ring-ring w-full resize-none rounded-[12px] bg-[#F8F8F8] px-[15px] py-[18px] pl-[50px] text-[#747474] focus:outline-none focus:ring-1 2xl:h-[150px]"
                />
                <GoPencil className="text-muted-foreground absolute left-3 top-[30px] h-5 w-5 -translate-y-1/2 text-[#0129E3]" />
              </div>
              {/* button add */}
              <button className="mt-[15px] h-[50px] w-full rounded-[12px] border border-[#0129E3] text-[15px] font-medium text-[#0129E3] 2xl:w-[220px] 2xl:text-[16px]">
                {selectedInputLang === 'ru'
                  ? ' Добавить'
                  : selectedInputLang === 'uz'
                    ? ' Qo`shish'
                    : 'Add'}
              </button>
            </div>
            {/* ADDRESS */}
            <div className="mt-[25px] flex flex-col gap-3 2xl:mt-[60px] 2xl:gap-4">
              <p className="text-[17px] font-medium mdl:text-[18px] 2xl:text-[20px]">
                {selectedInputLang === 'ru'
                  ? 'Адрес'
                  : selectedInputLang === 'uz'
                    ? 'Manzil'
                    : 'Address'}
              </p>
              <div className="relative">
                <input
                  type="text"
                  placeholder={
                    selectedInputLang === 'ru'
                      ? 'Юнусабадский район, ул. Чинобод 10A'
                      : selectedInputLang === 'uz'
                        ? 'Yunusobod tumani, Chinobod ko‘chasi 10A'
                        : 'Yunusobod district, Chinobod street 10A'
                  }
                  className="focus:ring-ring w-full rounded-[12px] bg-[#F8F8F8] px-[15px] py-[18px] pl-[50px] text-[#747474] focus:outline-none focus:ring-1"
                />
                <GoPencil className="absolute left-[1.2rem] top-1/2 h-5 w-5 -translate-y-1/2 text-[#0129E3]" />
              </div>
              {/* button add */}
              <button className="mt-[15px] h-[50px] w-full rounded-[12px] border border-[#0129E3] text-[15px] font-medium text-[#0129E3] 2xl:w-[220px] 2xl:text-[16px]">
                {selectedInputLang === 'ru'
                  ? ' Добавить'
                  : selectedInputLang === 'uz'
                    ? ' Qo`shish'
                    : 'Add'}
              </button>
            </div>
            {/* SERTIFICATES */}
            <div className="mt-[25px] flex flex-col gap-3 2xl:mt-[60px] 2xl:gap-4">
              <p className="mdl:-[18px] text-[17px] font-medium 2xl:text-[20px]">
                {selectedInputLang === 'ru'
                  ? 'Сертификаты '
                  : selectedInputLang === 'uz'
                    ? 'Sertifikatlar'
                    : 'Sertificates'}
              </p>
              <div className="grid grid-cols-2 gap-[8px] 2xl:grid-cols-6 2xl:gap-[20px]">
                {files.map((file) => (
                  <div
                    key={file.id}
                    className="relative h-[145px] rounded-[16px] bg-gray-100 2xl:h-[200px] 2xl:w-[200px]"
                  >
                    <button
                      onClick={() => deleteFile(file.backendId || 0)}
                      className="absolute right-[8px] top-[15px] z-50 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#20212c] mdl:right-[15px]"
                    >
                      <IoCloseOutline className="text-white" />
                    </button>
                    {file.status === 'uploading' ? (
                      <img
                        src={file.previewUrl}
                        alt="Preview"
                        loading="lazy"
                        className="h-full w-full rounded-[8px] object-cover"
                      />
                    ) : (
                      <>
                        <img
                          src={file.url || file.previewUrl}
                          alt={file.name}
                          loading="lazy"
                          className="h-full w-full rounded-[8px] object-cover"
                        />
                        <input
                          type="file"
                          className="absolute inset-0 cursor-pointer opacity-0"
                        />
                      </>
                    )}
                  </div>
                ))}
                <button className="relative flex h-[145px] items-center justify-center rounded-[16px] bg-[#F8F8F8] 2xl:h-[200px] 2xl:w-[200px]">
                  <input
                    type="file"
                    onChange={(e) => handleFileUpload(e)}
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                  />
                  <div className="flex w-[50%] flex-col items-center justify-center">
                    <MdOutlineAttachFile className="h-[20px] w-[20px] rotate-45 text-[#0129E3] 2xl:h-[30px] 2xl:w-[30px]" />
                    <p className="text-[15px] font-medium text-[#0129E3] 2xl:text-[16px] 2xl:leading-[20px]">
                      {selectedInputLang === 'ru'
                        ? 'Прикрепить сертификат'
                        : selectedInputLang === 'uz'
                          ? 'Sertifikatni qo‘shish'
                          : 'Attach certificate'}
                    </p>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
