import { ChangeEventHandler } from 'react';

type Props = {
  label: string;
  value: string;
  type: string;
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  labelStyle?: string;
  inputStyle?: string;
};

const LabeledInput = (props: Props) => {
  const { label, value, onChange, type, name, labelStyle, inputStyle } = props;

  return (
    <div className="flex flex-col">
      <label className={`mb-2 ${labelStyle}`}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={inputStyle}
      />
    </div>
  );
};

export default LabeledInput;
