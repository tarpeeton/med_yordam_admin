'use client';
import { useDocumentStore } from '@/store/createDocumentStore';
import { useUploadFiles } from '@/store/createFilesStore';
import { MdOutlineAttachFile } from 'react-icons/md';
import { MoonLoader } from 'react-spinners';
import { IoCloseOutline } from 'react-icons/io5';
import React from 'react';
import { ILangTopProps } from '@/interface/langtopProps';
import SaveButton from '@/ui/saveButton';

interface DocumentType {
  id: string;
  file: File | null;
  status: 'idle' | 'uploading' | 'success' | 'error';
  previewUrl?: string;
  url?: string;
}

const DashboardFiles = ({ selectedInputLang }: ILangTopProps) => {
  const { files, addFiles } = useUploadFiles();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const filesList = event.target.files;
    if (filesList) {
      addFiles(filesList);
    }
  };

  const {
    documents,
    addDocument,
    updateDocument,
    removeDocument,
    saveDocuments,
  } = useDocumentStore();

  const handleFileChange = (id: string, file: File | null) => {
    if (!file) return;
    const previewUrl = URL.createObjectURL(file);
    updateDocument(id, {
      file,
      status: 'uploading',
      previewUrl,
    } as Partial<DocumentType>);
    setTimeout(() => {
      updateDocument(id, { status: 'success' } as Partial<DocumentType>);
      URL.revokeObjectURL(previewUrl);
    }, 600);
  };

  const handleFileRemoval = (id: string) => {
    updateDocument(id, { file: null, status: 'idle' } as Partial<DocumentType>);
  };

  return (
    <div>
      <div className="rounded-bl-[18px] rounded-br-[18px] bg-white px-[15px] py-[25px] 2xl:px-[25px] 2xl:py-[37px]">
        <div>
          <h1 className="mb-[12px] text-[17px] font-medium 2xl:pb-[15px] 2xl:text-[20px]">
            {selectedInputLang === 'ru'
              ? 'Лицензия'
              : selectedInputLang === 'uz'
                ? 'Litsensiyalar'
                : 'Licenses'}
          </h1>
          <div className="grid grid-cols-2 gap-[8px] 2xl:grid-cols-6 2xl:gap-[20px]">
            {files.map((file) => (
              <div
                key={file.id}
                className="h-[145px] rounded-[16px] bg-gray-100 2xl:h-[200px] 2xl:w-[200px]"
              >
                {file.status === 'uploading' ? (
                  <div className="flex h-full items-center justify-center">
                    <MoonLoader size={30} color="#0129E3" />
                  </div>
                ) : file.status === 'success' && file.url ? (
                  <img
                    src={file.url}
                    alt={file.name}
                    className="h-full w-full rounded-[8px] object-cover"
                  />
                ) : file.previewUrl ? (
                  <img
                    src={file.previewUrl}
                    alt={file.name}
                    className="h-full w-full rounded-[8px] object-cover"
                  />
                ) : (
                  <p className="pl-[10px] pt-[10px]">{file.name}</p>
                )}
              </div>
            ))}
            <button className="relative flex h-[145px] items-center justify-center rounded-[16px] border border-dashed border-[#0129E3] bg-[#F8F8F8] 2xl:h-[200px] 2xl:w-[200px]">
              <input
                type="file"
                onChange={handleFileUpload}
                className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
              />
              <div className="flex w-[50%] flex-col items-center justify-center">
                <MdOutlineAttachFile className="h-[20px] w-[20px] rotate-45 text-[#0129E3] 2xl:h-[30px] 2xl:w-[30px]" />
                <p className="text-[15px] font-medium text-[#0129E3] 2xl:text-[16px] 2xl:leading-[20px]">
                  {selectedInputLang === 'ru'
                    ? 'Прикрепить изображение'
                    : selectedInputLang === 'uz'
                      ? 'Rasm qo`shish'
                      : 'Attach Image'}
                </p>
              </div>
            </button>
          </div>
        </div>
        <div className="mt-[25px] 2xl:mt-[60px]">
          <h2 className="mb-[12px] text-[17px] font-medium 2xl:pb-[15px] 2xl:text-[20px]">
            {selectedInputLang === 'ru'
              ? 'Другие документы'
              : selectedInputLang === 'uz'
                ? 'Boshqa xujjatlar'
                : 'Other documents'}
          </h2>
          <div className="flex flex-col gap-[25px] 2xl:gap-[15px]">
            <div className="grid grid-cols-1 gap-[20px] 2xl:grid-cols-6">
              {documents.map((doc: DocumentType) => (
                <div
                  key={doc.id}
                  className="flex flex-col items-start gap-[12px] 2xl:flex-row 2xl:gap-[20px]"
                >
                  <div className="relative flex h-[145px] w-[145px] items-center justify-center rounded-[16px] bg-[#F8F8F8] 2xl:h-[200px] 2xl:min-w-[200px]">
                    {doc.status === 'uploading' ? (
                      <div className="flex h-full items-center justify-center">
                        <MoonLoader size={30} color="#0129E3" />
                      </div>
                    ) : doc.file || doc.previewUrl ? (
                      <img
                        src={doc.previewUrl || URL.createObjectURL(doc.file!)}
                        alt={doc.file ? doc.file.name : 'Документ'}
                        className="h-full w-full rounded-[16px] object-cover"
                      />
                    ) : (
                      <p className="text-[#B0B0B0]">
                        {selectedInputLang === 'ru'
                          ? 'Загрузить'
                          : selectedInputLang === 'uz'
                            ? 'Yuklash'
                            : 'Upload'}
                      </p>
                    )}
                    <input
                      type="file"
                      onChange={(e) =>
                        handleFileChange(doc.id, e.target.files?.[0] || null)
                      }
                      className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    />
                    <div
                      onClick={() => handleFileRemoval(doc.id)}
                      className="absolute right-[10px] top-[10px] z-[99] flex h-[30px] w-[30px] cursor-pointer items-center justify-center rounded-full bg-[#050B2B80] bg-opacity-50"
                    >
                      <IoCloseOutline className="text-white" size={20} />
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <button
              onClick={addDocument}
              className="mt-[15px] h-[50px] w-full rounded-[12px] border border-[#0129E3] text-[15px] font-medium text-[#0129E3] 2xl:w-[220px] 2xl:text-[16px]"
            >
              {selectedInputLang === 'ru'
                ? 'Добавить документ'
                : selectedInputLang === 'uz'
                  ? "Xujjat qo'shish"
                  : 'Add document'}
            </button>
          </div>
        </div>
      </div>
      <div className="mt-[25px] flex w-full items-center 2xl:w-[100%] 2xl:justify-end">
        <SaveButton
          selectedInputLang={selectedInputLang}
          onClick={saveDocuments}
        />
      </div>
    </div>
  );
};

export default DashboardFiles;
