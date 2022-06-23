import React from 'react';

type Props = {
  className?: string;
};

const TempCopyright = (props: Props) => {
  const { className } = props;
  return (
    <small className={`text-center w-full mt-8 ${className}`}>
      &copy; Sho, Kyosuke, Fumina, Ayaka 2022 / All Rights Reserved
    </small>
  );
};

export default TempCopyright;
