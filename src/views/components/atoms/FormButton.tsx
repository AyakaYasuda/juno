import React from 'react';

type Props = {
  ctaTxt: string;
  styleFormButton: string;
  submitFunction: {
    event: React.SyntheticEvent;
  };
};

const FormButton: React.FC<Props> = ({ ctaTxt, styleFormButton }) => {
  return (
    <button type="submit" className={styleFormButton}>
      {ctaTxt}
    </button>
  );
};

export default FormButton;
