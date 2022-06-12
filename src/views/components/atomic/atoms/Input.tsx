import React from 'react';

type InputProps = {
  containerInput: string;
  valueInput: string;
  classInput: string;
  labelName: string;
  labelColor: string;
  inputName: string;
};

const Input: React.FC<InputProps> = ({
  containerInput,
  valueInput,
  classInput,
  labelName,
  labelColor,
  inputName,
}) => {
  return (
    <div className={`flex flex-col ${containerInput}`}>
      <label className={`mb-1 ${labelColor}`}>{labelName}</label>
      <input
        type="text"
        name={inputName}
        value={valueInput}
        className={classInput}
      />
    </div>
  );
};

export default Input;
