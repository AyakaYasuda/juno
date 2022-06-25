import React, { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from 'hooks/hooks';
import { getUser } from 'redux/userThunkSlice';

import { AiOutlineClose } from 'react-icons/ai';
import Card from '../atoms/Card';
import Paragraph from '../atoms/Paragraph';

type ModalProps = {
  closeHandler: () => void;
  guestUserId: string;
};

const Modal: React.FC<ModalProps> = ({ closeHandler, guestUserId }) => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.user);

  useEffect(() => {
    if (guestUserId) {
      dispatch(getUser(guestUserId));
    }
  }, [guestUserId, dispatch]);

  return (
    user && (
      <div
        onClick={closeHandler}
        className="absolute top-0 left-0 z-50 bg-Pink-lighter bg-opacity-40 w-screen h-screen FlexCenter text-Pink-default "
      >
        <div className="relative w-3/4 md:w-3/5">
          <Card>
            <button onClick={closeHandler} className="absolute top-7 right-7">
              <AiOutlineClose />
            </button>
            <h2 className="text-Pink-default mb-4 pt-6">Guest Detail</h2>
            <form>
              <ul>
                <li className="md:flex flex-row gap-4 mb-4">
                  <label className="mb-4 md:mb-0 basis-1/2 flex flex-col">
                    First Name
                  </label>
                  <input className="InputDark" value={user.firstName} />
                  <label className="basis-1/2 flex flex-col">Last Name</label>
                  <input className="InputDark" value={user.lastName} />
                </li>
                <li className="md:FlexJustifyCenter gap-8 mb-4">
                  <p className="mb-2 md:mb-0 form-check form-check-inline">
                    <input
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      className="form-check-input appearance-none h-4 w-4 border border-Pink-default rounded-sm checked:bg-Pink-default focus:outline-none transition duration-200 mt-1 float-left mr-1 cursor-pointer"
                      checked={user.isAttending}
                    />
                    <label>accepts with pleasure</label>
                  </p>
                  <p className="form-check form-check-inline">
                    <input
                      type="radio"
                      name="inlineRadioOptions"
                      id="inlineRadio1"
                      className="form-check-input appearance-none h-4 w-4 border border-Pink-default rounded-sm checked:bg-Pink-default focus:outline-none transition duration-200 mt-1 float-left mr-1 cursor-pointer"
                      checked={user.isAttending}
                    />
                    <label>declines with regret</label>
                  </p>
                </li>
                <li className="flex flex-col mb-4">
                  <label>Message</label>
                  <Paragraph
                    text={user.message}
                    customClassName="InputDark h-28"
                  />
                </li>
                <li className="flex flex-col mb-4">
                  <label>If you have food allergy</label>
                  <input className="InputDark h-28" value={user.allergy} />
                </li>
                <li className="flex flex-col mb-4">
                  <label>Email</label>
                  <input className="InputDark" value={user.email} />
                </li>
              </ul>
            </form>
          </Card>
        </div>
      </div>
    )
  );
};

export default Modal;
