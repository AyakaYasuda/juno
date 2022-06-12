import React from 'react';
import Title from 'views/components/atomic/atoms/Title';
import Input from 'views/components/atomic/atoms/Input';
import Checker from 'views/components/atomic/atoms/Checker';
import Desc from 'views/components/atomic/atoms/Desc';
import ButtonFlexible from 'views/components/atomic/atoms/ButtonFlexible';

const FormAttendance = () => {
  return (
    <div>
      <div className="flex flex-col md:items-start">
        <Title classTitle="mb-4" textColor="text-Yellow-dark">
          RSVP
        </Title>
        <div className="FlexCenter flex-col md:flex-row md:gap-6">
          <Input
            labelName="First Name"
            inputName="First Name"
            valueInput=""
            containerInput=""
            classInput="InputDark"
            labelColor="text-Yellow-dark"
          />
          <Input
            labelName="Last Name"
            inputName="Last Name"
            valueInput=""
            containerInput=""
            classInput="InputDark"
            labelColor="text-Yellow-dark"
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
            classDesc="InputDark"
            labelName="Message"
            nameDesc="Message"
            rowsDesc={3}
          />
          <Desc
            containerDesc="w-3/5 md:w-full"
            classDesc="InputDark"
            labelName="If you have food allergy"
            nameDesc="allergy"
            rowsDesc={2}
          />
        </div>
        <div className="FlexCenter flex-col md:flex-row md:gap-6">
          <Input
            labelName="Email"
            inputName="Email"
            valueInput=""
            containerInput="flex-col"
            classInput="InputDark"
            labelColor="text-Yellow-dark"
          />
          <Input
            labelName="Password"
            inputName="Password"
            valueInput=""
            containerInput="flex-col"
            classInput="InputDark"
            labelColor="text-Yellow-dark"
          />
        </div>
      </div>
      <div className="flex justify-center md:w-extraLarge">
        <ButtonFlexible styleButton="bg-Green-default text-white w-2/5">
          Reply
        </ButtonFlexible>
      </div>
    </div>
  );
};

export default FormAttendance;
