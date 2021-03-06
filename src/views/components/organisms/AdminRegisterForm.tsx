import useForm from 'hooks/useForm';
import { Form } from '../atoms/Form';
import { signup } from 'redux/adminAuthSlice';
import { Link, useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'hooks/hooks';
import LabeledInput from '../molecules/LabeledInput';
import Card from '../atoms/Card';
import Button from '../atoms/Button';
import SessionServices from 'services/session.services';

type Props = {
  onShowModal: () => void;
};

const initialFormState = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
};

const AdminRegisterForm: React.FC<Props> = ({ onShowModal }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { values, inputChangeHandler } = useForm(initialFormState);

  const { firstName, lastName, email, password } = values;

  const submitHandler = async (e: React.SyntheticEvent) => {
    e.preventDefault();

    console.log('register submit');

    const result = await dispatch(
      signup({
        firstName: firstName as string,
        lastName: lastName as string,
        email: email as string,
        password: password as string,
        isAdmin: true,
      })
    );

    // signup success
    if (signup.fulfilled.match(result)) {
      const { userId, token } = result.payload;

      SessionServices.setAdminTokenWithExpirationDate(token);
      SessionServices.setAdminUserId(userId);

      navigate('/admin/create');
    }

    // signup failed
    if (signup.rejected.match(result)) {
      onShowModal();
    }
  };

  return (
    <Card className="opacity-90">
      <Form
        className="flex flex-col text-left mb-8 w-full md:w-4/5 mx-auto pt-4"
        onSubmit={submitHandler}
      >
        <LabeledInput
          type="text"
          label="First Name"
          name="firstName"
          value={firstName as string}
          onChange={inputChangeHandler}
          inputStyle="InputBorder"
          labelStyle="text-Pink-default"
        />
        <LabeledInput
          type="text"
          label="Last Name"
          name="lastName"
          value={lastName as string}
          onChange={inputChangeHandler}
          inputStyle="InputBorder"
          labelStyle="text-Pink-default"
        />
        <LabeledInput
          type="email"
          label="Email"
          name="email"
          value={email as string}
          onChange={inputChangeHandler}
          inputStyle="InputBorder"
          labelStyle="text-Pink-default"
        />
        <LabeledInput
          type="password"
          label="Password"
          name="password"
          value={password as string}
          onChange={inputChangeHandler}
          inputStyle="InputBorder"
          labelStyle="text-Pink-default"
        />
        <div className="w-3/4 mx-auto pt-4 text-Pink-default text-center">
          <Button customStyle="bg-Pink-default text-White-default mb-4">
            Start Creating Invitations
          </Button>
          <Link to={'/admin/login'}>You already have an account?</Link>
        </div>
      </Form>
    </Card>
  );
};

export default AdminRegisterForm;
