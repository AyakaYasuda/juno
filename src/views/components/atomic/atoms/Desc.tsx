import React from 'react';

type DescProps = {
  containerDesc: string;
  classDesc: string;
  labelName: string;
  nameDesc: string;
  rowsDesc: number | undefined;
  // children: React.ReactNode | string;
};

const Desc: React.FC<DescProps> = ({
  containerDesc,
  classDesc,
  labelName,
  nameDesc,
  rowsDesc,
  // children,
}) => {
  return (
    <div className={`flex flex-col ${containerDesc}`}>
      <label className="mb-1 text-Yellow-dark">{labelName}</label>
      <textarea name={nameDesc} className={classDesc} rows={rowsDesc} cols={45}>
        {/* {children} */}
      </textarea>
    </div>
  );
};

export default Desc;
