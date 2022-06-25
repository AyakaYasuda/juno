import React, { ChangeEventHandler } from 'react';
import classes from './Checker.module.css';

// FIXME: rename props to simple names
type CheckerProps = {
  containerChecker: string;
  valueChecker: boolean;
  classChecker: string;
  typeChecker: string;
  labelChecker: string;
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  isChecked: boolean;
};

// FIXME: rename to CheckboxRadioButton
const Checker: React.FC<CheckerProps> = ({
  containerChecker,
  valueChecker,
  classChecker,
  typeChecker,
  labelChecker,
  name,
  onChange,
  isChecked,
}) => {
  return (
    // FIXME: change to tailwind
    <div className={`flex ${containerChecker}`}>
      <label
        className={`mb-1 pl-2 text-Yellow-dark  ${classes['label']} ${
          isChecked && classes['checked']
        }`}
      >
        <input
          type={typeChecker}
          value={String(valueChecker)}
          className={classChecker}
          name={name}
          onChange={onChange}
        />
        {labelChecker}
      </label>
    </div>
  );
};

export default Checker;
