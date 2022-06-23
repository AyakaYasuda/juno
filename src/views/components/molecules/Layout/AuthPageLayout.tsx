import React from 'react';
import topImg from '../../../../assets/images/top-image.png';

type Props = {
  children?: React.ReactNode;
};

const AuthPageLayout: React.FC<Props> = ({ children }) => {
  return (
    <section className="flex sm:relative">
      <div className="w-full h-screen md:w-1/2">
        <img
          src={topImg}
          alt="top-img"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="absolute top-0 left-0 w-full h-screen FlexCenter bg-Pink-default bg-opacity-30 md:bg-gradient-to-b md:from-Pink-lighter md:to-Pink-default md:w-1/2 md:relative">
        <div className="w-3/4 h-4/5 text-center flex flex-col">
          {children}
          <small className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full">
            &copy; Sho, Kyosuke, Fumina, Ayaka 2022 / All Rights Reserved
          </small>
        </div>
      </div>
    </section>
  );
};

export default AuthPageLayout;
