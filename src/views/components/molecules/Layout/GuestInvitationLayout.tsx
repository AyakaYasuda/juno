import React from 'react';
import TempCopyright from 'views/components/atoms/TempCopyright';

import FlowerA from '../../../../assets/images/invitation-flower1.png';
import FlowerB from '../../../../assets/images/invitation-flower2.png';

type Props = {
  bgClassName: string;
  copyrightClassName: string;
  children: React.ReactNode;
};

const GuestInvitationLayout: React.FC<Props> = ({
  bgClassName,
  copyrightClassName,
  children,
}) => {
  return (
    <section className={bgClassName}>
      <img
        src={FlowerA}
        alt="flower"
        className="w-medium fixed top-0 right-0"
      />
      {children}
      <img src={FlowerB} alt="flower" className="w-1/4 fixed bottom-0 left-0" />
      <TempCopyright className={copyrightClassName} />
    </section>
  );
};

export default GuestInvitationLayout;
