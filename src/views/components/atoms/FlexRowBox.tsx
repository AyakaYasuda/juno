import React from 'react';

type Props = {
  children: React.ReactNode;
  className: string;
};

const FlexRowBox = (props: Props) => {
  const { children, className } = props;

  return <div className={`flex flex-row ${className} `}>{children}</div>;
};

export default FlexRowBox;
