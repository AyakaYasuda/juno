import React from 'react';
import { IUser } from 'types/UserData.type';

import ColumnLabeledParagraph from '../molecules/ColumnLabeledParagraph';
import GuestButton from '../atoms/GuestButton';
import Checker from '../atoms/Checker';
import { useNavigate } from 'react-router';

type Props = {
  user: IUser;
};

const YourReply: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();

  return (
    <div className="w-full flex flex-col px-0 sm:px-10 gap-6">
      <div className="grid grid-cols-2 auto-cols-fr justify-items-center gap-4">
        <div className="w-full">
          <ColumnLabeledParagraph
            label="First Name"
            text={user.firstName}
            className="text-Yellow-dark"
            textStyle="InputLighter text-Green-dark"
          />
        </div>
        <div className="w-full">
          <ColumnLabeledParagraph
            label="Last Name"
            text={user.lastName}
            className="text-Yellow-dark"
            textStyle="InputLighter text-Green-dark"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 auto-cols-fr justify-items-center gap-4">
        <Checker
          label="accepts with pleasure"
          value={true}
          className="gap-1 items-center"
          inputType="radio"
          name="isAttending"
          isChecked={user.isAttending as boolean}
          readonly
        />
        <Checker
          label="declines with regret"
          value={false}
          className="gap-1 items-center"
          inputType="radio"
          name="isAttending"
          isChecked={!user.isAttending as boolean}
          readonly
        />
      </div>
      <ColumnLabeledParagraph
        label="Message"
        className="text-Yellow-dark"
        textStyle="InputLighter text-Green-dark h-28"
        text={user.message}
      />
      <ColumnLabeledParagraph
        label="If you have food allergy"
        className="text-Yellow-dark"
        textStyle="InputLighter text-Green-dark h-28"
        text={user.allergy}
      />
      <GuestButton
        className="BaseButtonStyle border border-white text-white drop-shadow-lg w-48 mx-auto"
        type="button"
        onClick={() => navigate('/guests/edit')}
      >
        Edit your reply
      </GuestButton>
    </div>
  );
};

export default YourReply;
