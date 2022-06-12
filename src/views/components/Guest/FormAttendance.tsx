import React from 'react';
import Title from 'views/components/atomic/atoms/Title';
import Input from 'views/components/atomic/atoms/Input';
import Checker from 'views/components/atomic/atoms/Checker';
import Desc from 'views/components/atomic/atoms/Desc';
import ButtonFlexible from 'views/components/atomic/atoms/ButtonFlexible';

const FormAttendance = () => {
  return (
    <div>
      <div className="flex flex-col items-start">
        <Title classTitle="mb-4" classColor="text-Yellow-dark">
          RSVP
        </Title>
        <div className="flex gap-6">
          <Input
            labelName="First Name"
            inputName="First Name"
            valueInput=""
            containerInput=""
            classInput="InputDark"
          />
          <Input
            labelName="Last Name"
            inputName="Last Name"
            valueInput=""
            containerInput=""
            classInput="InputDark"
          />
        </div>
        <div className="flex justify-center w-96 gap-8">
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
        <div className="flex flex-col">
          <Desc
            containerDesc=""
            classDesc="InputDark"
            labelName="Message"
            nameDesc="Message"
            rowsDesc={3}
          />
          <Desc
            containerDesc=""
            classDesc="InputDark"
            labelName="If you have food allergy"
            nameDesc="allergy"
            rowsDesc={2}
          />
        </div>
        <div className="flex gap-6">
          <Input
            labelName="Email"
            inputName="Email"
            valueInput=""
            containerInput="flex-col"
            classInput="InputDark"
          />
          <Input
            labelName="Password"
            inputName="Password"
            valueInput=""
            containerInput="flex-col"
            classInput="InputDark"
          />
        </div>
      </div>
      <div className="flex justify-center w-extraLarge">
        <ButtonFlexible styleButton="bg-Green-default text-white w-2/5">
          Reply
        </ButtonFlexible>
      </div>
    </div>
  );
};

export default FormAttendance;
