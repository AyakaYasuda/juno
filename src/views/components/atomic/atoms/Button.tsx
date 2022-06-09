import React from 'react';

type Props = {
  bgColor: string;
  txtColor: string;
  children?: React.ReactNode;
};

const Button: React.FC<Props> = ({ children, bgColor, txtColor }) => {
  return (
    <button className={`rounded-3xl py-3 px-6 w-full ${bgColor} ${txtColor}`}>
      {children}
    </button>
  );
};

export default Button;
