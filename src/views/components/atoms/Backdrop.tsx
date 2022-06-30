import React from 'react';
import ReactDOM from 'react-dom';

type Props = {
  onClick: () => void;
};

const Backdrop: React.FC<Props> = ({ onClick }) => {
  const content = (
    <div
      className="fixed top-0 left-0 right-0 w-full h-screen opacity-25"
      onClick={onClick}
    />
  );
  return ReactDOM.createPortal(
    content,
    document.getElementById('backdrop-hook') as Element
  );
};

export default Backdrop;
