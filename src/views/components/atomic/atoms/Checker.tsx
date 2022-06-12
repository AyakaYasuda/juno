import React from 'react';

type CheckerProps = {
  containerChecker: string;
  valueChecker: string;
  classChecker: string;
  typeChecker: string;
  labelChecker: string;
};

const Checker: React.FC<CheckerProps> = ({
  containerChecker,
  valueChecker,
  classChecker,
  typeChecker,
  labelChecker,
}) => {
  return (
    <div className={`flex ${containerChecker}`}>
      <input type={typeChecker} value={valueChecker} className={classChecker} />
      <label className="mb-1 text-Yellow-dark">{labelChecker}</label>
    </div>
  );
};

export default Checker;
