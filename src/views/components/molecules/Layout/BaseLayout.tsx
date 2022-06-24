import React from 'react';
import TempCopyright from 'views/components/atoms/TempCopyright';

// import Button from '../../atoms/Button';
import Navbar from '../Navbar';

type Props = {
  bgClassName: string;
  navbarBgColor: string;
  navbarLink: JSX.Element;
  navbarRedirectPath: string;
  copyrightClassName: string;
  children: React.ReactNode;
};

const BaseLayout: React.FC<Props> = ({
  bgClassName,
  navbarBgColor,
  navbarLink,
  navbarRedirectPath,
  copyrightClassName,
  children,
}) => {
  return (
    <section className={bgClassName}>
      <Navbar
        bgColor={navbarBgColor}
        link={navbarLink}
        redirectPath={navbarRedirectPath}
      />
      {children}
      <TempCopyright className={copyrightClassName} />
    </section>
  );
};

export default BaseLayout;
