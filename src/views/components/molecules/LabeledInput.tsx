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
    <>
      <label className={labelStyle}>{label}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={inputStyle}
      />
    </>
  );
};

export default LabeledInput;
