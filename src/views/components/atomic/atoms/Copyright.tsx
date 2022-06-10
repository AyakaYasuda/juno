import React from 'react';

type propsContainer = {
  classContainer: string;
};

const Copyright: React.FC<propsContainer> = ({ classContainer }) => {
  return (
    <div className={classContainer}>
      <p className="text-Pink-dark text-xs">
        © Sho, Kyosuke, Fumina, Ayaka 2022 / All Rights Reserved
      </p>
    </div>
  );
};

export default Copyright;
