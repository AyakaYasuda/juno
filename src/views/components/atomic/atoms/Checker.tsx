import React from 'react';
import classes from './Checker.module.css';

type CheckerProps = {
  containerChecker: string;
  valueChecker: boolean;
  classChecker: string;
  typeChecker: string;
  labelChecker: string;
  name: string;
  // FIXME: add type
  onChange: any;
  isChecked: boolean;
};

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
  console.log('valueChecker', valueChecker);

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
