"use client"

interface IAddressProps {
  selectedInputLang: "ru" | "uz" | "en";
}


const DashboardAddress = ({ selectedInputLang }: IAddressProps) => {


  return (
    <div>
     


      {/* <div className=' mt-[25px] w-full 2xl:w-[100%] flex items-center 2xl:justify-end'>
        <button onClick={saveDocuments} className='bg-[#0129E3] 2xl:w-[245px] py-[20px] w-full rounded-[12px] font-medium text-center text-white'>
          {selectedInputLang === 'ru' ? 'Сохранить изменения' : selectedInputLang === 'uz' ? 'Ozgartirishlarni saqlash' : 'Save changes'}
        </button>
      </div> */}

    </div>
  );
};

export default DashboardAddress;
