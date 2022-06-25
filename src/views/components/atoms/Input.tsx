import React from 'react';

type InputProps = {
  type: string;
  containerInput: string;
  valueInput: string;
  classInput: string;
  labelName: string;
  labelColor: string;
  inputName: string;
  disabledInput: boolean;
  onChangeHandler: (params: any) => any;
};

// FIXME: delete me, use labeled input instead
const Input: React.FC<InputProps> = ({
  type,
  containerInput,
  valueInput,
  classInput,
  labelName,
  labelColor,
  inputName,
  disabledInput,
  onChangeHandler,
}) => {
  return (
    <div className={`flex flex-col ${containerInput}`}>
      <label className={`mb-1 ${labelColor}`}>{labelName}</label>
      <input
        type={type}
        name={inputName}
        value={valueInput}
        onChange={onChangeHandler}
        className={classInput}
        disabled={disabledInput}
      />
    </div>
  );
};

export default Input;
