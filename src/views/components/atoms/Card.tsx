import React from 'react';

type Props = {
  children?: React.ReactNode;
};

const Card: React.FC<Props> = ({ children }) => (
  <div className="bg-White-default drop-shadow-lg shadow-gray-600 p-8 rounded-3xl">
    {children}
  </div>
);

export default Card;
