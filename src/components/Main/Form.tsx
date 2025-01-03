"use client";
import { FC, useEffect, useState } from "react";
import Image from "next/image";
import { useLocale } from "next-intl";

import DoctorImage from '@/public/Doctor.png'
import Mobile from '@/public/form/Mobile.svg'
import Desktop from '@/public/form/Desktop.svg'
import { GoPencil } from "react-icons/go";
import { MdOutlinePhone } from "react-icons/md";



const SUBTITLE = {
  item: {
    ru: "Зарегистрируйтесь сейчас и получите доступ к первым преимуществам. Ваша анкета будет сразу активна после запуска, и вы сможете привлекать новых пациентов и управлять своим профилем легко и удобно.",
    uz: "Hozir ro'yxatdan o'ting va birinchi imtiyozlarga ega bo'ling. Profilingiz ishga tushirilgandan so'ng darhol faollashadi va siz yangi bemorlarni jalb qilishingiz hamda profilingizni oson va qulay boshqarishingiz mumkin.",
    en: "Register now and get access to the first benefits. Your profile will be immediately active after launch, and you will be able to attract new patients and manage your profile easily and conveniently."
  }
}

type InputFieldId = "name" | "lastName" | "fatherName" | "phoneNumber";

type InputField = {
  id: InputFieldId;
  label: Record<"ru" | "uz" | "en", string>;
  type?: string; // optional "type" property
};

// Data for the form fields
const inputFields: InputField[] = [
  { id: "name", label: { ru: "Имя", uz: "Ism", en: "Name" } },
  { id: "lastName", label: { ru: "Фамилия", uz: "Familiya", en: "Last Name" } },
  { id: "fatherName", label: { ru: "Отчество", uz: "Otasining ismi", en: "Father's Name" } },
  { id: "phoneNumber", type: "tel", label: { ru: "Номер телефона", uz: "Telefon raqami", en: "Phone Number" } },
];


const Form: FC = () => {
  const locale = useLocale() as "ru" | "uz" | "en";

  // State for focus
  const [isFocused, setIsFocused] = useState<Record<InputFieldId, boolean>>({
    name: false,
    lastName: false,
    fatherName: false,
    phoneNumber: false,
  });

  // State for values
  const [value, setValue] = useState<Record<InputFieldId, string>>({
    name: "",
    lastName: "",
    fatherName: "",
    phoneNumber: "",
  });

  const handleFocus = (field: InputFieldId) => {
    setIsFocused((prev) => ({ ...prev, [field]: true }));
  };

  const handleBlur = (field: InputFieldId) => {
    setIsFocused((prev) => ({ ...prev, [field]: false }));
  };


  return (
    <section className='mt-[80px] mdl:mt-[120px] 3xl:mt-[150px] bg-white rounded-[20px]'>

      <div className='py-[20px] px-[16px] slg:p-[40px] 2xl:px-[40px] 2xl:py-[52px] flex flex-col 2xl:flex-row 2xl:justify-between'>
        <div className='relative flex flex-col slg:flex-row'>
          
          <div className='h-[192px] w-[160px]  slg:min-w-[300px] slg:h-[360px] 2xl:h-[400px]'>
            <Image src={DoctorImage} alt="Docotr Image" width={1200} height={1200} quality={100} className='w-full h-full object-cover' />


          </div>
          <div className='flex flex-col gap-[20px] 2xl:gap-[24px] mt-[20px] slg:mt-0 relative'>
            <div className='absolute  z-10 top-[-150px] right-[30px] h-[180px] w-[90px] slg:hidden'>
              <Image src={Mobile} alt="Docotr Image" width={1200} height={1200} quality={100} className='w-full h-full object-cover' />
            </div>
            <div className='hidden  z-10 top-[250px] right-[30px] h-[200px] w-[100px] slg:block slg:absolute 2xl:hidden'>
              <Image src={Mobile} alt="Docotr Image" width={1200} height={1200} quality={100} className='w-full h-full object-cover' />
            </div>
            <div className='hidden  z-10 top-[250px] right-[30px] h-[220px] w-[151px] 2xl:block 2xl:absolute '>
              <Image src={Desktop} alt="Docotr Image" width={1200} height={1200} quality={100} className='w-full h-full object-cover' />
            </div>
            {/* DOCtoR TITLE */}
            <div className='2xl:w-[363px] 4xl:w-[620px]'>
            <p className='bg-gradient-to-r from-[#050B2B] to-[#112591] bg-clip-text text-transparent text-2xl font-bold slg:text-[32px]'>
              {locale === 'ru'
                ? "Вы врач?"
                : locale === 'uz'
                  ? "Siz shifokormisiz?"
                  : "Are you a doctor?"}

            </p>
            <p className='text-[15px] slg:mt-[24px] mt-[20px] text-[#050B2B] leading-[21px] slg:text-[16px] slg:leading-[22.4px]  2x 2xl:text-[20px] 2xl:leading-[28px] '>
              {SUBTITLE.item[locale]}
            </p>
            </div>
            
          </div>
        </div>
       
          <div className=' mt-[20px] slg:mt-[80px] slg:w-[70%] 2xl:w-[40%]  2xl:mt-0'>
            <form className='flex flex-col gap-[16px] slg:gap-[24px]'>
            {inputFields.map((field) => (
            <div key={field.id} className="relative w-full cursor-pointer">
              <input
                id={field.id}
                type={field.type || "text"}
                value={value[field.id]}
                onChange={(e) => setValue({ ...value, [field.id]: e.target.value })}
                onFocus={() => handleFocus(field.id)}
                onBlur={() => handleBlur(field.id)}
                className="h-[73px] w-full rounded-2xl bg-[#F6FAFF] px-[25px] pt-[25px] outline-none drop-shadow"
              />
              <label
                className={`absolute left-[25px] flex items-center gap-[10px] transition-all ${
                  isFocused[field.id] || value[field.id] ? "top-3 text-xs text-gray-500" : "top-[26px] text-base text-gray-400"
                }`}
              >
                {field.type === "tel" ? <MdOutlinePhone /> : <GoPencil />}
                
                 {field.label[locale]} <span className="text-red-500">*</span>
              </label>
            </div>
          ))}
            <button type='button' className='py-[20px] px-[40px] bg-[#1960EB]  text-white font-bold rounded-[16px] '>
            {locale === 'ru'
          ? "Далее"
          : locale === 'uz'
            ? "Keyingi"
            : "Next"}
            </button>

            </form>
          </div>
      </div>

    </section>
  );
};

export default Form;
