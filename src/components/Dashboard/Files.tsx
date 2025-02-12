'use client';
import { useUploadFiles } from '@/store/createFilesStore';
import { MdOutlineAttachFile } from 'react-icons/md';
import { IoCloseOutline } from 'react-icons/io5';
import React from 'react';
import { ILangTopProps } from '@/interface/langtopProps';
import { FileUploadType } from '@/store/createFilesStore';

const DashboardFiles = ({ selectedInputLang }: ILangTopProps) => {
  const { files, addFiles, deleteFile, updateFile } = useUploadFiles();

  const handleFileUpload = (
    event: React.ChangeEvent<HTMLInputElement>,
    type: FileUploadType
  ) => {
    const filesList = event.target.files;
    if (filesList) {
      addFiles(filesList, type);
    }
  };

  const handleFileUpdate = async (id: string, file: File) => {
    await updateFile(id, file);
  };

  return (
    <div className="rounded-bl-[18px] rounded-br-[18px] bg-white px-[15px] py-[25px] 2xl:px-[25px] 2xl:py-[37px]">
      <div>
        <div>
          <h1 className="mb-[12px] text-[17px] font-medium 2xl:pb-[15px] 2xl:text-[20px]">
            {selectedInputLang === 'ru'
              ? 'Лицензии'
              : selectedInputLang === 'uz'
                ? 'Litsensiyalar'
                : 'Licenses'}
          </h1>
          <div className="grid grid-cols-2 gap-[8px] 2xl:grid-cols-6 2xl:gap-[20px]">
            {files
              .filter((file) => file.type === 'LICENSE')
              .map((file) => (
                <div
                  key={file.id}
                  className="relative h-[145px] rounded-[16px] bg-gray-100 2xl:h-[200px] 2xl:w-[200px]"
                >
                  <button
                    onClick={() => deleteFile(file?.backendId || 0)}
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
                        onChange={(e) => {
                          const selectedFile = e.target.files?.[0];
                          if (selectedFile)
                            handleFileUpdate(file.id!, selectedFile);
                        }}
                      />
                    </>
                  )}
                </div>
              ))}
            <button className="relative flex h-[145px] items-center justify-center rounded-[16px] border border-dashed border-[#0129E3] bg-[#F8F8F8] 2xl:h-[200px] 2xl:w-[200px]">
              <input
                type="file"
                onChange={(e) => handleFileUpload(e, 'LICENSE')}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
              <div className="flex w-[50%] flex-col items-center justify-center">
                <MdOutlineAttachFile className="h-[20px] w-[20px] rotate-45 text-[#0129E3] 2xl:h-[30px] 2xl:w-[30px]" />
                <p className="text-[15px] font-medium text-[#0129E3] 2xl:text-[16px] 2xl:leading-[20px]">
                  {selectedInputLang === 'ru'
                    ? 'Прикрепить лицензию'
                    : selectedInputLang === 'uz'
                      ? 'Litsenziya qo`shish'
                      : 'Attach License'}
                </p>
              </div>
            </button>
          </div>
        </div>
      </div>

      <div className="mt-[25px] 2xl:mt-[60px]">
        <h2 className="mb-[12px] text-[17px] font-medium 2xl:pb-[15px] 2xl:text-[20px]">
          {selectedInputLang === 'ru'
            ? 'Документы'
            : selectedInputLang === 'uz'
              ? 'Hujjatlar'
              : 'Documents'}
        </h2>
        <div className="grid grid-cols-2 gap-[8px] 2xl:grid-cols-6 2xl:gap-[20px]">
          {files
            .filter((file) => file.type === 'DOCUMENT')
            .map((file) => (
              <div
                key={file.id}
                className="relative h-[145px] rounded-[16px] bg-gray-100 2xl:h-[200px] 2xl:w-[200px]"
              >
                <button
                  onClick={() => deleteFile(file?.backendId || 0)}
                  className="absolute right-[8px] top-[15px] z-50 flex h-[30px] w-[30px] items-center justify-center rounded-full bg-[#20212c] mdl:right-[15px]"
                >
                  <IoCloseOutline className="text-white" />
                </button>
                {file.status === 'uploading' ? (
                  <img
                    src={file.previewUrl}
                    alt="Preview"
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
                      onChange={(e) => {
                        const selectedFile = e.target.files?.[0];
                        if (selectedFile)
                          handleFileUpdate(file.id!, selectedFile);
                      }}
                    />
                  </>
                )}
              </div>
            ))}
          <button className="relative flex h-[145px] items-center justify-center rounded-[16px] border border-dashed border-[#0129E3] bg-[#F8F8F8] 2xl:h-[200px] 2xl:w-[200px]">
            <input
              type="file"
              onChange={(e) => handleFileUpload(e, 'DOCUMENT')}
              className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
            />
            <div className="flex w-[50%] flex-col items-center justify-center">
              <MdOutlineAttachFile className="h-[20px] w-[20px] rotate-45 text-[#0129E3] 2xl:h-[30px] 2xl:w-[30px]" />
              <p className="text-[15px] font-medium text-[#0129E3] 2xl:text-[16px] 2xl:leading-[20px]">
                {selectedInputLang === 'ru'
                  ? 'Прикрепить документ'
                  : selectedInputLang === 'uz'
                    ? 'Hujjat qo`shish'
                    : 'Attach Document'}
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default DashboardFiles;
