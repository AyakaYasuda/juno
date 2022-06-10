import React from 'react';

type Props = {
  styleButton: string;
  children?: React.ReactNode;
};

const Button: React.FC<Props> = ({ children, styleButton }) => {
  return (
    <button className={`rounded-3xl py-3 px-6 w-full ${styleButton}`}>
      {children}
    </button>
  );
};

export default Button;
