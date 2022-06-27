import React, { ChangeEventHandler } from 'react';
import classes from './Checker.module.css';

type CheckerProps = {
  value: boolean;
  label: string;
  inputType: string;
  className?: string;
  inputStyle?: string;
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  isChecked: boolean;
  readonly?: boolean;
};

// FIXME: rename to CheckboxRadioButton
const Checker: React.FC<CheckerProps> = (props) => {
  const {
    value,
    className,
    label,
    inputType,
    name,
    onChange,
    isChecked,
    readonly = false,
    inputStyle,
  } = props;

  return (
    // FIXME: change to tailwind
    <div className={`flex ${className}`}>
      <label
        className={`mb-1 pl-2 text-Yellow-dark  ${classes['label']} ${
          isChecked && classes['checked']
        }`}
      >
        <input
          type={inputType}
          value={String(value)}
          className={`${classes['visually-hidden']} ${inputStyle}`}
          onChange={onChange}
          name={name}
          readOnly={readonly}
        />
        {label}
      </label>
    </div>
  );
};

export default Checker;
