import React from 'react';
import Title from 'views/components/atomic/atoms/Title';
import Input from 'views/components/atomic/atoms/Input';
import Checker from 'views/components/atomic/atoms/Checker';
import Desc from 'views/components/atomic/atoms/Desc';
import ButtonFlexible from 'views/components/atomic/atoms/ButtonFlexible';

type FormAttendanceProps = {
  classInput: string;
  sectionTitle: string;
  sectionTitleColor: string;
  textButton: string;
  textButtonCancel: string;
  styleButton: string;
  styleButtonCancel: string;
  typeButton: 'button' | 'submit' | 'reset';
  spacing: string;
  firstName: string;
  lastName: string;
  message: string;
  allergy: string;
  email: string;
  password: string;
  disabledInput: boolean;
  disabledDesc: boolean;
  submitHandler: (params: any) => any;
  onClickButton: (params: any) => any;
  onChangeFirstName: (params: any) => any;
  onChangeLastName: (params: any) => any;
  onChangeEmail: (params: any) => any;
  onChangePassword: (params: any) => any;
  onChangeMessage: (params: any) => any;
  onChangeAllergy: (params: any) => any;
};

const FormAttendance: React.FC<FormAttendanceProps> = ({
  classInput,
  sectionTitle,
  sectionTitleColor,
  textButton,
  textButtonCancel,
  styleButton,
  styleButtonCancel,
  typeButton,
  spacing,
  firstName,
  lastName,
  message,
  allergy,
  email,
  password,
  disabledInput,
  submitHandler,
  onClickButton,
  onChangeFirstName,
  onChangeLastName,
  onChangeEmail,
  onChangePassword,
  onChangeMessage,
  onChangeAllergy,
  disabledDesc,
}) => {
  return (
    <div>
      <form action="/guest" method="post" onSubmit={submitHandler}>
        <div className="flex flex-col md:items-start">
          <Title classTitle="my-4" textColor={sectionTitleColor}>
            {sectionTitle}
          </Title>
          <div className="FlexCenter flex-col md:flex-row md:gap-6">
            <Input
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
              valueChecker=""
              containerChecker="gap-1 items-center"
              classChecker=""
              typeChecker="checkbox"
            />
            <Checker
              labelChecker="declines with regret"
              valueChecker=""
              containerChecker="gap-1 items-center"
              classChecker=""
              typeChecker="checkbox"
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
        </div>
        <div className={`flex justify-center ${spacing} gap-12 `}>
          <ButtonFlexible
            typeButton={typeButton}
            onClickButton={onClickButton}
            styleButton={styleButton}
          >
            {textButton}
          </ButtonFlexible>
          <ButtonFlexible
            typeButton={typeButton}
            onClickButton={onClickButton}
            styleButton={styleButtonCancel}
          >
            {textButtonCancel}
          </ButtonFlexible>
        </div>
      </form>
    </div>
  );
};

export default FormAttendance;
