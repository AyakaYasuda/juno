import { ChangeEventHandler } from 'react';

type Props = {
  label: string;
  name: string;
  className: string;
  rows: number;
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement>;
};

const LabeledTextarea = (props: Props) => {
  const { label, name, className, rows, value, onChange } = props;
  
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-Yellow-dark">{label}</label>
      <textarea
        onChange={onChange}
        name={name}
        className={className}
        rows={rows}
        cols={45}
        value={value}
      />
    </div>
  );
};

export default LabeledTextarea;
