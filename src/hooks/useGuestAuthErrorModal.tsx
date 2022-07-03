import { useState } from 'react';
import { useAppSelector } from './hooks';

const useGuestAuthErrorModal = () => {
  const [isModalShown, setIsModalShown] = useState<boolean>(false);

  // FIXME: admin or guest
  const { status, errorMessages } = useAppSelector((state) => state.guestAuth);

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

export default useGuestAuthErrorModal;
