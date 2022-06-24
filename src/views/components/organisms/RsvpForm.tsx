import React from 'react';
import useForm from 'hooks/useForm';
import { useNavigate } from 'react-router';
import { useAppDispatch } from 'hooks/hooks';

const formInitialValues = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  message: '',
  allergy: '',
  isAttending: false,
};

type Props = {};

const RsvpForm: React.FC<Props> = (props) => {
  const { values, inputChangeHandler } = useForm(formInitialValues);
  const {
    firstName,
    lastName,
    email,
    password,
    message,
    allergy,
    isAttending,
  } = values;

  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="FlexCenter flex-col md:flex-row md:gap-6">
          <Input
            type="text"
            labelName="First Name"
            inputName="firstName"
            valueInput={firstName}
            containerInput=""
            classInput={classInput}
            labelColor="text-Yellow-dark"
            disabledInput={disabledInput}
            onChangeHandler={onChangeFirstName}
          />
          <Input
            type="text"
            labelName="Last Name"
            inputName="lastName"
            valueInput={lastName}
            containerInput=""
            classInput={classInput}
            labelColor="text-Yellow-dark"
            disabledInput={disabledInput}
            onChangeHandler={onChangeLastName}
          />
        </div>
        <div className="FlexJustify flex-col md:flex-row  items-center md:items-start md:w-96 md:gap-8">
          <Checker
            labelChecker="accepts with pleasure"
            valueChecker={true}
            containerChecker="gap-1 items-center"
            classChecker="hidden mr-1"
            typeChecker="radio"
            name="isAttending"
            onChange={onInputChange}
            isChecked={isAttending}
          />
          <Checker
            labelChecker="declines with regret"
            valueChecker={false}
            containerChecker="gap-1 items-center"
            classChecker="hidden mr-1"
            typeChecker="radio"
            name="isAttending"
            onChange={onInputChange}
            isChecked={!isAttending}
          />
        </div>
        <div className="flex flex-col items-center md:items-start">
          <Desc
            containerDesc="w-3/5 md:w-full"
            classDesc={classInput}
            labelName="Message"
            nameDesc="message"
            rowsDesc={3}
            valueDesc={message}
            disabledDesc={disabledDesc}
            onChangeHandler={onChangeMessage}
          />
          <Desc
            containerDesc="w-3/5 md:w-full"
            classDesc={classInput}
            labelName="If you have food allergy"
            nameDesc="allergy"
            valueDesc={allergy}
            rowsDesc={2}
            disabledDesc={disabledDesc}
            onChangeHandler={onChangeAllergy}
          />
        </div>
        <div className="FlexCenter flex-col md:flex-row md:gap-6">
          <Input
            type="email"
            labelName="Email"
            inputName="email"
            valueInput={email}
            containerInput="flex-col"
            classInput={classInput}
            labelColor="text-Yellow-dark"
            disabledInput={disabledInput}
            onChangeHandler={onChangeEmail}
          />
          <Input
            type="password"
            labelName="Password"
            inputName="password"
            valueInput={password}
            containerInput="flex-col"
            classInput={classInput}
            labelColor="text-Yellow-dark"
            disabledInput={disabledInput}
            onChangeHandler={onChangePassword}
          />
        </div>

        <div className={`flex justify-center ${spacing} gap-12 `}>
          <ButtonFlexible
            typeButton="submit"
            onClickButton={onClickButton}
            styleButton={styleButton}
          >
            {textButton}
          </ButtonFlexible>
          <ButtonFlexible
            typeButton="button"
            onClickButton={onClickCancel}
            styleButton={styleButtonCancel}
          >
            {textButtonCancel}
          </ButtonFlexible>
        </div>
      </form>
    </div>
  );
};

export default RsvpForm;
