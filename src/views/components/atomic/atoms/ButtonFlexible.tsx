import React from 'react';

type Props = {
  styleButton: string;
  children?: React.ReactNode;
  typeButton: 'submit' | 'reset' | 'button';
  onClickButton: (params: any) => any;
};

const ButtonFlexible: React.FC<Props> = ({
  children,
  styleButton,
  typeButton,
  onClickButton,
}) => {
  return (
    <button
      type={typeButton}
      onClick={onClickButton}
      className={`rounded-3xl py-2 px-6 ${styleButton}`}
    >
      {children}
    </button>
  );
};

export default ButtonFlexible;
