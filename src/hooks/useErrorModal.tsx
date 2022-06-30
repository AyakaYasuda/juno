import { useState } from 'react';
import { useAppSelector } from './hooks';

const useErrorModal = () => {
  const { status, errorMessage } = useAppSelector((state) => state.auth);
  const [isModalShown, setIsModalShown] = useState<boolean>(false);

  const closeModalHandler = () => {
    setIsModalShown(false);
  };

  const showModalHandler = () => {
    setIsModalShown(true);
  };

  return {
    status,
    errorMessage,
    closeModalHandler,
    showModalHandler,
    isModalShown,
  };
};

export default useErrorModal;
