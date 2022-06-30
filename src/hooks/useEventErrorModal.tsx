import { useState } from 'react';
import { useAppSelector } from './hooks';

const useEventErrorModal = () => {
  const [isModalShown, setIsModalShown] = useState<boolean>(false);

  const { status, errorMessages } = useAppSelector((state) => state.event);
  console.log('errorMessage in hooks', errorMessages);

  const closeModalHandler = () => {
    setIsModalShown(false);
  };

  const showModalHandler = () => {
    setIsModalShown(true);
  };

  return {
    status,
    errorMessages,
    closeModalHandler,
    showModalHandler,
    isModalShown,
  };
};

export default useEventErrorModal;
