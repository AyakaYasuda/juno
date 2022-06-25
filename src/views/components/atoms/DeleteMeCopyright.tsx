import React from 'react';

type propsContainer = {
  textColor: string;
};

// FIXME: delete me, use TempCopyright
const DeleteMeCopyright: React.FC<propsContainer> = ({ textColor }) => {
  return (
    <div className="text-center w-full fixed left-0 bottom-1 ">
      <p className={`text-xs ${textColor}`}>
        © Sho, Kyosuke, Fumina, Ayaka 2022 / All Rights Reserved
      </p>
    </div>
  );
};

export default DeleteMeCopyright;
