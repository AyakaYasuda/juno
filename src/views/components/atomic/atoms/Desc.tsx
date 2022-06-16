import React from 'react';

type DescProps = {
  containerDesc: string;
  classDesc: string;
  labelName: string;
  nameDesc: string;
  rowsDesc: number | undefined;
  valueDesc: string;
  disabledDesc: boolean;
  onChangeHandler: (params: any) => any;
};

const Desc: React.FC<DescProps> = ({
  containerDesc,
  classDesc,
  labelName,
  nameDesc,
  rowsDesc,
  valueDesc,
  disabledDesc,
  onChangeHandler,
}) => {
  return (
    <div className={`flex flex-col ${containerDesc}`}>
      <label className="mb-1 text-Yellow-dark">{labelName}</label>
      <textarea
        onChange={onChangeHandler}
        name={nameDesc}
        className={classDesc}
        rows={rowsDesc}
        cols={45}
        value={valueDesc}
        disabled={disabledDesc}
      />
    </div>
  );
};

export default Desc;
