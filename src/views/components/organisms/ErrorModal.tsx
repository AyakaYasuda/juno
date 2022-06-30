import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Backdrop from '../atoms/Backdrop';

type ContentProps = {
  message: string;
  button: string;
};

const ModalContent: React.FC<ContentProps> = ({ message, button }) => {
  const content = (
    <div className="flexCenter flex-col">
      <p>{message}</p>
      <button>{button}</button>
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
  modalClassName: string;
};

const ErrorModal: React.FC<Props> = ({
  show,
  onCancel,
  message,
  button,
  modalClassName,
}) => {
  return (
    <>
      {show && <Backdrop onClick={onCancel} />}
      <CSSTransition
        in={show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames={modalClassName}
      >
        <ModalContent message={message} button={button} />
      </CSSTransition>
    </>
  );
};

export default ErrorModal;
