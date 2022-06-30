import { useState } from 'react';
import { useAppSelector } from './hooks';

const useAuthErrorModal = () => {
  const [isModalShown, setIsModalShown] = useState<boolean>(false);

  const { status, errorMessages } = useAppSelector((state) => state.auth);

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

export default useAuthErrorModal;
