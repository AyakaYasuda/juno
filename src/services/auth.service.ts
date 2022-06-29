import SessionServices from 'services/session.services';

export const getAuth = () => {
  const tokenData = SessionServices.getTokenWithExpirationDate();

  if (!tokenData) {
    throw new Error('No token found!');
  }

  return tokenData.token;
};
