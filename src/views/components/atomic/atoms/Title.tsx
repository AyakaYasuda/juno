import React from 'react';

type propsTitle = {
  classTitle: string;
  classColor: string;
  children: string;
};

const Title: React.FC<propsTitle> = ({ classTitle, classColor, children }) => {
  return (
    <div className={classTitle}>
      <p
        className={`${classColor} font-allura text-4xl font-normal text-center`}
      >
        {children}
      </p>
    </div>
  );
};

export default Title;
