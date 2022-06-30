import React from 'react';
import ReactDOM from 'react-dom';

type Props = {
  onCancel: () => void;
};

const Backdrop: React.FC<Props> = ({ onCancel }) => {
  const content = (
    <div
      className="fixed top-0 left-0 right-0 w-full h-screen bg-gray-400 opacity-50 z-10"
      onClick={onCancel}
    />
  );
  return ReactDOM.createPortal(
    content,
    document.getElementById('backdrop-hook') as Element
  );
};

export default Backdrop;
