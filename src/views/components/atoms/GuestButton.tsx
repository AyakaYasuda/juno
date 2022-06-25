import React from 'react';

type Props = {
  className: string;
  children?: React.ReactNode;
  type: 'submit' | 'reset' | 'button';
  onClick?: () => void;
};

const GuestButton: React.FC<Props> = ({
  children,
  className,
  type,
  onClick,
}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`rounded-3xl py-2 px-6 ${className}`}
    >
      {children}
    </button>
  );
};

export default GuestButton;
