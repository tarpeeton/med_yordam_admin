import { ILangTopProps } from '@/interface/langtopProps';
import Main from './Main';

export const Doctors = ({ selectedInputLang }: ILangTopProps) => {
  return (
    <div>
      <Main selectedInputLang={selectedInputLang} />
    </div>
  );
};
