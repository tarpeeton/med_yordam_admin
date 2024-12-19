import { FC, ReactNode } from 'react';

const StoreProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <>{children}</>; // Bu yerga hozircha boshqa kontekstlar qo'shilmadi
};

export default StoreProvider;
