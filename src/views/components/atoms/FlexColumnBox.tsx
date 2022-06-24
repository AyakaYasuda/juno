import React from 'react';

type Props = {
  children: React.ReactNode;
  className: string;
};

const FlexColumnBox = (props: Props) => {
  const { children, className } = props;

  return <div className={`flex flex-col ${className} `}>{children}</div>;
};

export default FlexColumnBox;
