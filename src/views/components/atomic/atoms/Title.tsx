import React from 'react';

type propsTitle = {
  classTitle: string;
  textColor: string;
  children: string;
};

const Title: React.FC<propsTitle> = ({ classTitle, textColor, children }) => {
  return (
    <div className={classTitle}>
      <p
        className={`${textColor} font-allura text-4xl font-normal text-center`}
      >
        {children}
      </p>
    </div>
  );
};

export default Title;
