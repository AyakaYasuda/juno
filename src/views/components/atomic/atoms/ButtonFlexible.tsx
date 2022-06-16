import React from 'react';

type Props = {
  styleButton: string;
  children?: React.ReactNode;
  typeButton: 'submit' | 'reset' | 'button';
};

const Button: React.FC<Props> = ({ children, styleButton, typeButton }) => {
  return (
    <button
      type={typeButton}
      className={`rounded-3xl py-2 px-6 ${styleButton}`}
    >
      {children}
    </button>
  );
};

export default Button;
