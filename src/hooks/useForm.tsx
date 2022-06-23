import { ChangeEvent, useState } from 'react';

type Props = { [key: string]: string | number | boolean };

const useForm = (props: Props) => {
  const initialValues = props;
  const [values, setValues] = useState(initialValues);

  const inputChangeHandler = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setValues((prevState) => ({ ...prevState, [name]: value }));
  };

  return { values, inputChangeHandler };
};

export default useForm;
