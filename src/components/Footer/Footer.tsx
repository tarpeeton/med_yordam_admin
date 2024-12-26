"use client"
import { FC } from 'react'
import Image from 'next/image'

// icons
import { FaInstagram } from "react-icons/fa"
import { FaTelegramPlane } from "react-icons/fa"
import { BiLogoFacebook } from "react-icons/bi";
import { SiYoutube } from "react-icons/si";
// image
// import FooterLogo from '@/public/footerLOGO.png'
import { Link } from '@/i18n/routing'
import Logo from './Logo.svg'
import { useLocale } from 'next-intl'


const DataSocials = [
    { id: '1', icon: <FaInstagram className='text-white' />, link: 'https://www.instagram.com/med_yordam' },
    { id: '2', icon: <FaTelegramPlane className='text-white' />, link: 'https://t.me/med_yordam' },
    { id: '3', icon: <BiLogoFacebook className='text-white' />, link: '' },
    { id: '4', icon: <SiYoutube className='text-white' />, link: 'https://www.youtube.com/@MedYordam' },
]


const Footer: FC = () => {
    const locale = useLocale()



    return (
        <div className='bg-[#050B2B] flex flex-col mt-[80px] mdl:mt-[120px] 2xl:mt-[150px]'>
            <div className=' py-[40px] 2xl:py-[80px] 2xl:px-[100px] px-[16px] flex flex-col slg:flex-row slg:flex-wrap 2xl:flex-nowrap'>
                <div className='w-full flex-col slg:w-[50%] 2xl:w-[60%] flex-grow-[1] '>
                    <div className='w-[240px] h-[43px]'>
                        <Image src={Logo} alt='logo' width={400} height={100} quality={100} className='w-full h-full object-cover' />

                    </div>
                    <p className='text-[15px] mt-[16px] w-full text-[#F8F8F8] slg:text-[16px]'>
                        {
                            locale === 'ru'
                                ? "Консультация от врачей"
                                : locale === 'uz'
                                    ? "Shifokorlardan maslahat"
                                    : "Consultation from doctors"
                        }

                    </p>
                </div>
                <div className='flex flex-col gap-[10px] mt-[20px] 2xl:mt-[0] 2xl:justify-end slg:mt-[-50px] slg:order-[3] 2xl:order-[2]'>
                    <p className='text-white font-medium text-[20px]'>
                        +998 (99) 838 80 78
                    </p>
                    <div className='flex flex-row gap-[8px]'>
                        {DataSocials.map((item) => (
                            <Link href={item.link} key={item.id} className='w-[45px] border border-[#31385E] h-[45px] rounded-full flex items-center justify-center mt-[16px]'>
                                {item.icon}
                            </Link>
                        ))}
                    </div>
                </div>
                <div className='mt-[60px] slg:w-[50%] slg:mt-[10px] 2xl:w-[40%] 4xl:w-[20%]'>
                    <div className='flex flex-col gap-[16px] mt-[20px]'>
                        <p className='text-[18px] font-medium text-white '>
                            {
                                locale === 'ru'
                                    ? "Информация о проекте"
                                    : locale === 'uz'
                                        ? "Loyiha haqida ma'lumot"
                                        : "Project information"
                            }
                        </p>
                        <Link href={'/register'} className='text-[18px] font-medium text-white '>
                            {
                                locale === 'ru'
                                    ? "Регистрация"
                                    : locale === 'uz'
                                        ? "Ro‘yxatdan o‘tish"
                                        : "Registration"
                            }

                        </Link>
                        <Link href={'/login'} className='text-[18px] font-medium  text-white'>
                            {
                                locale === 'ru'
                                    ? "Вход в личный кабинет"
                                    : locale === 'uz'
                                        ? "Shaxsiy kabinetga kirish"
                                        : "Login to personal cabinet"
                            }
                        </Link>
                    </div>
                </div>
            </div>
            <div className='w-full border-t border-t-[#FFFFFF1A] pt-[33px] slg:py-[30px]  slg:px-[20px] px-[16px] pb-[13px] flex flex-row justify-between 2xl:px-[60px]'>
                <p className='text-white text-[12px] slg:text-[14px] w-[40%]'>
                    {
                        locale === 'ru'
                            ? "Med Yordam 2024 - Все права защищены"
                            : locale === 'uz'
                                ? "Med Yordam 2024 - Barcha huquqlar himoyalangan"
                                : "Med Yordam 2024 - All rights reserved"
                    }
                </p>
                <div className='flex flex-col slg:flex-row items-center justify-between slg:w-[50%]'>
                    <p className='text-white text-[12px] slg:text-[14px]'>
                        {
                            locale === 'ru'
                                ? "Обработка данных"
                                : locale === 'uz'
                                    ? "Ma'lumotlarni qayta ishlash"
                                    : "Data processing"
                        }
                    </p>
                    <Link href='/' className='text-white text-[12px] slg:text-[14px] mt-[3px]'>
                        {
                            locale === 'ru'
                                ? "Условия использования"
                                : locale === 'uz'
                                    ? "Foydalanish shartlari"
                                    : "Terms of use"
                        }
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Footer