import React from 'react';
import TempCopyright from 'views/components/atoms/TempCopyright';
import topImg from '../../../../assets/images/top-image.png';

type Props = {
  children?: React.ReactNode;
};

const AuthPageLayout: React.FC<Props> = ({ children }) => {
  return (
    <section className="flex flex-col h-full relative bg-Pink-default bg-opacity-30 md:bg-gradient-to-b md:from-Pink-lighter md:to-Pink-default">
      <div className="flex sm:relative">
        <div className="w-full h-screen md:w-1/2">
          <img
            src={topImg}
            alt="top-img"
            className="w-full h-full object-cover"
          />
        </div>
        <div className="min-h-screen flex-col absolute top-0 left-0 w-full FlexCenter md:w-1/2 md:relative">
          <div className="w-3/4 text-center flex flex-col mb-10">
            {children}
          </div>
          <TempCopyright className="bottom-4 absolute" />
        </div>
      </div>
    </section>
  );
};

export default AuthPageLayout;
