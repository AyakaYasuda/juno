import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import Card from '../atoms/Card';

type ModalProps = {
  closeHandler: () => void;
};

const Modal: React.FC<ModalProps> = ({ closeHandler }) => {
  return (
    <div className="absolute top-0 left-0 z-50 bg-Pink-lighter bg-opacity-40 w-screen h-screen FlexCenter text-Pink-default ">
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
                  First Name <input className="InputDark" />
                </label>
                <label className="basis-1/2 flex flex-col">
                  Last Name
                  <input className="InputDark" />
                </label>
              </li>
              <li className="md:FlexJustify gap-8 mb-4">
                <p className="mb-2 md:mb-0 form-check form-check-inline">
                  <input
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    className="form-check-input appearance-none h-4 w-4 border border-Pink-default rounded-sm checked:bg-Pink-default focus:outline-none transition duration-200 mt-1 float-left mr-1 cursor-pointer"
                  />
                  <label>accepts with pleasure</label>
                </p>
                <p className="form-check form-check-inline">
                  <input
                    type="radio"
                    name="inlineRadioOptions"
                    id="inlineRadio1"
                    className="form-check-input appearance-none h-4 w-4 border border-Pink-default rounded-sm checked:bg-Pink-default focus:outline-none transition duration-200 mt-1 float-left mr-1 cursor-pointer"
                  />
                  <label>declines with regret</label>
                </p>
              </li>
              <li className="flex flex-col mb-4">
                <label>Message</label>
                <input className="InputDark" style={{ height: '100px' }} />
              </li>
              <li className="flex flex-col mb-4">
                <label>If you have food allergy</label>
                <input className="InputDark" style={{ height: '70px' }} />
              </li>
              <li className="flex flex-col mb-4">
                <label>Email</label>
                <input className="InputDark" />
              </li>
            </ul>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Modal;
