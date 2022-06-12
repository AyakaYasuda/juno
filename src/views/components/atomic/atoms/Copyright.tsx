import React from 'react';

type propsContainer = {
  textColor: string;
};

const Copyright: React.FC<propsContainer> = ({ textColor }) => {
  return (
    <div className="fixed left-0 bottom-0 text-center w-full">
      <p className={`text-xs ${textColor}`}>
        © Sho, Kyosuke, Fumina, Ayaka 2022 / All Rights Reserved
      </p>
    </div>
  );
};

export default Copyright;
