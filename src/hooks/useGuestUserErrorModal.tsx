import { useState } from 'react';
import { useAppSelector } from './hooks';

const useGuestUserErrorModal = () => {
  const [isModalShown, setIsModalShown] = useState<boolean>(false);

  // FIXME: set admin temporary to avoid error
  const { status, errorMessages } = useAppSelector((state) => state.guestUser);

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

export default useGuestUserErrorModal;
