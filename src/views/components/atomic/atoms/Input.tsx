import React from 'react';

type InputProps = {
  containerInput: string;
  valueInput: string;
  classInput: string;
  labelName: string;
  inputName: string;
};

const Input: React.FC<InputProps> = ({
  containerInput,
  valueInput,
  classInput,
  labelName,
  inputName,
}) => {
  return (
    <div className={`flex flex-col ${containerInput}`}>
      <label className="mb-1 text-Yellow-dark">{labelName}</label>
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
