import React from 'react';

type CheckerProps = {
  containerChecker: string;
  valueChecker: boolean;
  classChecker: string;
  typeChecker: string;
  labelChecker: string;
  name: string;
  // FIXME: add type
  onChange: any;
};

const Checker: React.FC<CheckerProps> = ({
  containerChecker,
  valueChecker,
  classChecker,
  typeChecker,
  labelChecker,
  name,
  onChange,
}) => {
  return (
    <div className={`flex ${containerChecker}`}>
      <label className="mb-1 text-Yellow-dark">
        <input
          type={typeChecker}
          value={valueChecker as any}
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
