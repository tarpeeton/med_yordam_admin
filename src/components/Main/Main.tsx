"use client"
import { FC } from 'react';

import Banner from './Banner';

import Timer from './Timer';
import About from './About';
import FormAction from './FormAction';
import KeyService from './KeyService';
import WhyChoise from './Choise';
import HowWeWork from './HowWork';
import Map from './Map';
import Form from './Form';
import Invite from './Invite';




const Main: FC = () => {


  return (
    <div className='px-[16px] slg:px-[20px] 2xl:px-[100px]'>
      <Banner />
      <Timer />
      <About />
      <FormAction />
      <KeyService />
      <WhyChoise />
      <HowWeWork />
      <Map />
      <Form />
      <Invite />
    </div>
  );
};

export default Main;