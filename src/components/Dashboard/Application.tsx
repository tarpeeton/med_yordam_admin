'use client';

import Link from 'next/link';

const ApplicationMessage = () => {
  return (
    <div className="grid grid-cols-1 gap-5 2xl:mt-[38px]">
      <div className="rounded-xl border border-[EDEDED] px-[16px] py-[25px]">
        <p className="text-[15px] text-[#747474]">23.01.2023</p>
        <div className="flex flex-col gap-[20px] lg:mt-5 lg:flex-row lg:gap-[120px]">
          <p className="text-base text-[#050B2B] lg:text-xl">
            Rustam Kidiraliyev
          </p>
          <Link href={'sdf'} className="text-base text-[#050B2B] lg:text-xl">
            +998 90 111 76 42
          </Link>
        </div>
        <div className="mt-5 whitespace-pre-wrap rounded-xl bg-[#F8F8F8] p-6 2xl:p-7 2xl:text-[19px]">
          ` Я надеюсь на оперативное рассмотрение данной заявки и получение
          необходимого медицинского обслуживания.\nПрошу связаться со мной по
          указанным контактным данным для обсуждения дальнейших шагов. Спасибо
          за внимание и заботу о здоровье пациентов. С уважением,Григор
          Григорьевич`
        </div>
      </div>
    </div>
  );
};

export default ApplicationMessage;
