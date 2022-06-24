import React from 'react';
import Title from 'views/components/atoms/Title';
import Input from 'views/components/atoms/Input';
import Checker from 'views/components/atoms/Checker';
import Desc from 'views/components/molecules/LabeledTextarea';
import ButtonFlexible from 'views/components/atoms/GreenButton';

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
  isAttending: boolean;
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
  onInputChange: (params: any) => any;
  onClickCancel: (params: any) => any;
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
  isAttending,
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
  onInputChange,
  onClickCancel,
}) => {
  return (
    <div>
      <form onSubmit={submitHandler}>
        <div className="flex flex-col md:items-start">
          <Title classTitle="my-4" textColor={sectionTitleColor}>
            {sectionTitle}
          </Title>
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
          <div className="FlexJustifyCenter flex-col md:flex-row  items-center md:items-start md:w-96 md:gap-8">
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
            {/* <Desc
              className="w-3/5 md:w-full"
              classDesc={classInput}
              label="Message"
              nameDesc="message"
              rowsDesc={3}
              valueDesc={message}
              disabledDesc={disabledDesc}
              onChangeHandler={onChangeMessage}
            />
            <Desc
              className="w-3/5 md:w-full"
              classDesc={classInput}
              label="If you have food allergy"
              nameDesc="allergy"
              valueDesc={allergy}
              rowsDesc={2}
              disabledDesc={disabledDesc}
              onChangeHandler={onChangeAllergy}
            /> */}
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
        </div>
        <div className={`flex justify-center ${spacing} gap-12 `}>
          {/* <ButtonFlexible
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
          </ButtonFlexible> */}
        </div>
      </form>
    </div>
  );
};

export default FormAttendance;
