import React from 'react';

type Props = {
  label: string;
  type: string;
  name: string;
};

const FormInput: React.FC<Props> = ({ label, type, name }) => {
  return (
    <>
      <label>{label}</label>
      <input type={type} name={name} />
    </>
  );
};

export default FormInput;
