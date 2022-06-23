import React from 'react';

type Props = {
  customStyle: string;
  children?: React.ReactNode;
};

const Button: React.FC<Props> = ({ children, customStyle }) => {
  return (
    <button className={`BaseButtonStyle ${customStyle}`}>{children}</button>
  );
};

export default Button;
