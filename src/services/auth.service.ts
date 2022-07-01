import SessionServices from 'services/session.services';

export const getAdminAuth = () => {
  const tokenData = SessionServices.getAdminTokenWithExpirationDate();

  if (!tokenData) {
    throw new Error('No token found!');
  }

  return tokenData.token;
};

export const getGuestAuth = () => {
  const tokenData = SessionServices.getGuestTokenWithExpirationDate();

  if (!tokenData) {
    throw new Error('No token found!');
  }

  return tokenData.token;
};
