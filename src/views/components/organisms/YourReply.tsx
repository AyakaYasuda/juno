import React from 'react';
import { IUser } from 'types/UserData.type';
import ColumnLabeledParagraph from '../molecules/ColumnLabeledParagraph';
import LabeledTextarea from '../molecules/LabeledTextarea';

type Props = {
  user: IUser;
};

const YourReply: React.FC<Props> = ({ user }) => {
  return (
    <div className="w-full flex flex-col py-5 px-10 gap-6">
      <div className="grid grid-cols-2 auto-cols-fr justify-items-center gap-4">
        <div className="w-full">
          <ColumnLabeledParagraph
            label="First Name"
            text={user.firstName}
            className="text-Yellow-dark"
            paragraphStyle="text-Green-dark"
          />
        </div>
        <div className="w-full">
          <ColumnLabeledParagraph
            label="Last Name"
            text={user.lastName}
            className="text-Yellow-dark"
            paragraphStyle="text-Green-dark"
          />
        </div>
      </div>
      <div className="grid grid-cols-2 auto-cols-fr justify-items-center gap-4">
        <p className="mb-2 md:mb-0 form-check form-check-inline">
          <input
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio1"
            className="form-check-input appearance-none h-4 w-4 border border-Yellow-dark rounded-sm checked:bg-Yellow-dark focus:outline-none transition duration-200 mt-1 float-left mr-1 cursor-pointer"
            defaultChecked={user.isAttending}
          />
          <label className="text-Yellow-dark">accepts with pleasure</label>
        </p>
        <p className="mb-2 md:mb-0 form-check form-check-inline">
          <input
            type="radio"
            name="inlineRadioOptions"
            id="inlineRadio1"
            className="form-check-input appearance-none h-4 w-4 border border-Yellow-dark rounded-sm checked:bg-Yellow-dark focus:outline-none transition duration-200 mt-1 float-left mr-1 cursor-pointer"
            defaultChecked={user.isAttending}
          />
          <label className="text-Yellow-dark">declines with regret</label>
        </p>
      </div>
      <LabeledTextarea
        label="Message"
        name="message"
        className="InputLighter text-Green-dark"
        rows={7}
        value={user.message}
      />
      <LabeledTextarea
        label="If you have food allergy"
        name="allergy"
        className="InputLighter text-Green-dark"
        rows={4}
        value={user.allergy}
      />
    </div>
  );
};

export default YourReply;
