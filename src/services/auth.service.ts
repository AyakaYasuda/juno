import SessionServices from 'services/session.services';

export const getAdminAuth = () => {
  const tokenData = SessionServices.getAdminTokenWithExpirationDate();

  if (!tokenData) {
    return null;
  }

  return tokenData.token;
};

export const getGuestAuth = () => {
  const tokenData = SessionServices.getGuestTokenWithExpirationDate();

  if (!tokenData) {
    return null;
  }

  return tokenData.token;
};
