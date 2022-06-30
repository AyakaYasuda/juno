import React from 'react';
import ReactDOM from 'react-dom';

import Backdrop from '../atoms/Backdrop';
import Card from '../atoms/Card';

type ContentProps = {
  message: string;
  button: string;
  buttonStyle?: string;
  onCancel: () => void;
};

const ModalContent: React.FC<ContentProps> = ({
  message,
  button,
  buttonStyle,
  onCancel,
}) => {
  const content = (
    <div className="fixed z-20 top-20 left-8 right-8 sm:left-1/4 sm:right-1/4 h-16">
      <Card className="FlexAlignCenter flex-col gap-4 opacity-80">
        <h3 className="text-center">Sorry! Something went wrong...</h3>
        <p className="text-center">{message}</p>
        <button
          className={`BaseButtonStyle w-28 sm:w-36 ${buttonStyle}`}
          onClick={onCancel}
        >
          {button}
        </button>
      </Card>
    </div>
  );
  return ReactDOM.createPortal(
    content,
    document.getElementById('modal-hook') as Element
  );
};

type Props = {
  show: boolean;
  onCancel: () => void;
  message: string;
  button: string;
  buttonStyle?: string;
};

const ErrorModal: React.FC<Props> = ({
  show,
  onCancel,
  message,
  button,
  buttonStyle,
}) => {
  return show ? (
    <>
      <Backdrop onCancel={onCancel} />
      <ModalContent
        message={message}
        button={button}
        buttonStyle={buttonStyle}
        onCancel={onCancel}
      />
    </>
  ) : (
    <></>
  );
};

export default ErrorModal;
