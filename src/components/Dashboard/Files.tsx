"use client";
import { useDocumentStore } from '@/store/createDocumentStore';
import { useUploadFiles } from '@/store/createFilesStore';
import { MdOutlineAttachFile } from "react-icons/md";
import { MoonLoader } from 'react-spinners';
import { GoPencil } from 'react-icons/go';
import { IoCloseOutline } from "react-icons/io5";


interface IFileProps {
  selectedInputLang: "ru" | "uz" | "en";
}

const DashboardFiles = ({ selectedInputLang }: IFileProps) => {

  // FILES
  const { files, addFiles } = useUploadFiles();

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      addFiles(files);
    }
  };

  // DOCUMENTS

  const { documents, addDocument, updateDocument, removeDocument, saveDocuments } =
    useDocumentStore();

  // Handle Text Change
  const handleTextChange = (id: string, lang: "ru" | "uz" | "en", value: string) => {
    const currentDocument = documents.find((doc) => doc.id === id);
    if (!currentDocument) return;

    const updatedText = {
      ...currentDocument.text,
      [lang]: value,
    };

    updateDocument(id, { text: updatedText });
  };

  // Handle File Upload
  const handleFileChange = (id: string, file: File | null) => {
    if (!file) return;
    const previewUrl = URL.createObjectURL(file); // Create a preview URL
    updateDocument(id, { file, status: "uploading" });

    // Simulate file upload delay
    setTimeout(() => {
      updateDocument(id, { status: "success" });
      URL.revokeObjectURL(previewUrl); // Clean up preview URL
    }, 600);
  };

  // Handle File Removal
  const handleFileRemoval = (id: string) => {
    updateDocument(id, { file: null, status: "idle" }); // Set file to null
  };

  return (
    <div>
      <div className='px-[15px] py-[25px] bg-white rounded-bl-[18px] rounded-br-[18px] 2xl:py-[37px] 2xl:px-[25px]'>
        {/* LITCENCE */}
        <div>
          <h1 className='mb-[12px] 2xl:pb-[15px] text-[17px] font-medium 2xl:text-[20px]'>
            Лицензия
          </h1>
          <div className='grid grid-cols-2 gap-[8px] 2xl:grid-cols-6 2xl:gap-[20px]'>
            {files.map((file) => (
              <div key={file.id} className='rounded-[16px]  bg-gray-100 h-[145px] 2xl:h-[200px]  2xl:w-[200px]'>
                {file.status === 'uploading' ? (
                  <div className='flex justify-center items-center h-full'>
                    <MoonLoader size={30} color='#0129E3' />
                  </div>
                ) : file.previewUrl ? (
                  <img src={file.previewUrl} alt={file.name} className='w-full h-auto rounded-[8px]' />
                ) : (
                  <p className='pl-[10px] pt-[10px] '>{file.name}</p>
                )}

              </div>
            ))}
            <button className='relative rounded-[16px] flex items-center justify-center border border-dashed bg-[#F8F8F8] border-[#0129E3]  h-[145px] 2xl:h-[200px] 2xl:w-[200px]'>
              <input
                type='file'
                onChange={handleFileUpload}
                className='absolute inset-0 w-full h-full opacity-0 cursor-pointer'
              />
              <div className='flex flex-col w-[50%] items-center justify-center '>
                <MdOutlineAttachFile className='text-[#0129E3] rotate-45 w-[20px] h-[20px]  2xl:w-[30px] 2xl:h-[30px]' />
                <div>
                  <p className='text-[15px] font-medium 2xl:leading-[20px] 2xl:text-[16px] text-[#0129E3]'>
                    Прикрепить изображение
                  </p>
                </div>
              </div>
            </button>
          </div>

        </div>
        {/* DOCUMENT */}
        <div className='mt-[25px] 2xl:mt-[60px]'>
          <h2 className='mb-[12px] 2xl:pb-[15px] text-[17px] font-medium 2xl:text-[20px]'>
            Другие документы
          </h2>
          <div className='flex flex-col gap-[25px] 2xl:gap-[15px]'>
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="flex flex-col gap-[12px] 2xl:flex-row 2xl:gap-[20px] items-start"
              >
                {/* File Upload Area */}
                <div className="w-[145px] h-[145px] 2xl:min-w-[200px] 2xl:h-[200px] relative bg-[#F8F8F8] rounded-[16px] flex items-center justify-center">
                  {doc.status === "uploading" ? (
                    <div className="flex justify-center items-center h-full">
                      <MoonLoader size={30} color="#0129E3" />
                    </div>
                  ) : doc.file ? (
                    <img
                      src={URL.createObjectURL(doc.file)}
                      alt={doc.file.name}
                      className="w-full h-full object-cover rounded-[16px]"
                    />
                  ) : (
                    <p className="text-[#B0B0B0]">Upload</p>
                  )}
                  <input
                    type="file"
                    onChange={(e) =>
                      handleFileChange(doc.id, e.target.files?.[0] || null)
                    }
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  {/* Remove Button */}
                  <div
                    onClick={() => handleFileRemoval(doc.id)}
                    className="w-[30px] h-[30px] bg-[#050B2B80] bg-opacity-50 absolute top-[10px] right-[10px] z-[99] rounded-full flex items-center justify-center cursor-pointer"
                  >
                    <IoCloseOutline className="text-white" size={20} />
                  </div>
                </div>

                {/* Description Inputs */}
                <div className="flex-grow w-full">
                  <div className="relative mb-[12px] 2xl:h-[200px] w-full">
                    <textarea
                      value={doc.text[selectedInputLang]}
                      onChange={(e) =>
                        handleTextChange(doc.id, selectedInputLang, e.target.value)
                      }
                      placeholder="Описание (необязательно)"
                      className="w-full 2xl:h-[200px]  resize-none text-[#747474] rounded-[12px] focus:outline-none focus:ring-1 focus:ring-ring py-[18px] pl-[40px] px-[15px] bg-[#F8F8F8]"
                    />
                    <GoPencil className="absolute text-[#B0B0B0] left-3 top-[18px] h-5 w-5 " />
                  </div>

                </div>
              </div>
            ))}
            <button onClick={addDocument} className='mt-[15px]  w-full 2xl:w-[220px]  rounded-[12px] border border-[#0129E3] text-[15px] 2xl:text-[16px] text-[#0129E3] font-medium h-[50px]'>

              Добавить документ

            </button>
          </div>
        </div>
      </div>


      <div className=' mt-[25px] w-full 2xl:w-[100%] flex items-center 2xl:justify-end'>
        <button onClick={saveDocuments} className='bg-[#0129E3] 2xl:w-[245px] py-[20px] w-full rounded-[12px] font-medium text-center text-white'>
          {selectedInputLang === 'ru' ? 'Сохранить изменения' : selectedInputLang === 'uz' ? 'Ozgartirishlarni saqlash' : 'Save changes'}
        </button>
      </div>

    </div>
  );
};

export default DashboardFiles;
