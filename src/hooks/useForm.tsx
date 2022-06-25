import { ChangeEvent, useState } from 'react';

type Props = { [key: string]: string | number | boolean };

const useForm = (props: Props) => {
  const initialValues = props;
  const [values, setValues] = useState(initialValues);

  const toBooleanIfValueIsBoolean = (value: string): string | boolean => {
    if (value === 'true') {
      return true;
    }

    if (value === 'false') {
      return false;
    }

    return value;
  };

  // FIXME: using input type textarea instead of textarea tag?
  const inputChangeHandler = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    const convertedValue = toBooleanIfValueIsBoolean(value);

    setValues((prevState) => ({ ...prevState, [name]: convertedValue }));
  };

  return { values, inputChangeHandler };
};

export default useForm;
