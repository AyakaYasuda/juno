import React from 'react';

type propsContainer = {
  classContainer: string;
  classText: string;
};

const Copyright: React.FC<propsContainer> = ({ classContainer, classText }) => {
  return (
    <div className={classContainer}>
      <p className={classText}>
        © Sho, Kyosuke, Fumina, Ayaka 2022 / All Rights Reserved
      </p>
    </div>
  );
};

export default Copyright;
