import React from 'react';

type Props = {
  children?: React.ReactNode;
  className?: string;
};

const Card: React.FC<Props> = ({ children, className }) => (
  <div
    className={`bg-White-default drop-shadow-lg shadow-gray-600 p-8 rounded-3xl ${className}`}
  >
    {children}
  </div>
);

export default Card;
