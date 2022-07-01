// FIXME: check and search best practice
// https://stackoverflow.com/questions/42420531/what-is-the-best-way-to-manage-a-users-session-in-react

import { ONE_HOUR } from 'constants/time';
import { SessionKeys } from '../constants/sessionKeys';

type TokenData = {
  token: string;
  expiration: string;
};

export const generateTokenExpirationTime = () => {
  const currentTime = new Date().getTime();
  return new Date(currentTime + ONE_HOUR);
};

class SessionServices {
  private static getItem(key: SessionKeys) {
    return localStorage.getItem(key);
  }

  private static setItem(key: SessionKeys, value: any): void {
    localStorage.setItem(key, value);
  }

  public static removeItem(key: SessionKeys): void {
    localStorage.removeItem(key);
  }

  private static setTokenWithExpirationDate(
    key: SessionKeys,
    token: string,
    expirationDate?: Date
  ): void {
    // generate expiration time
    const tokenExpirationDate = expirationDate || generateTokenExpirationTime();

    // save to storage
    this.setItem(
      key,
      JSON.stringify({
        token,
        expiration: new Date(tokenExpirationDate).toISOString(),
      })
    );
  }

  private static getTokenWithExpirationDate(
    key: SessionKeys
  ): TokenData | null {
    const storedData = this.getItem(key);

    if (!storedData) {
      return null;
    }

    const restoredData = JSON.parse(storedData) as TokenData;

    return restoredData;
  }

  public static setAdminTokenWithExpirationDate(
    token: string,
    expirationDate?: Date
  ): void {
    this.setTokenWithExpirationDate(
      SessionKeys.ADMIN_TOKEN,
      token,
      expirationDate
    );
  }

  public static getAdminTokenWithExpirationDate(): TokenData | null {
    return this.getTokenWithExpirationDate(SessionKeys.ADMIN_TOKEN);
  }

  public static setGuestTokenWithExpirationDate(
    token: string,
    expirationDate?: Date
  ): void {
    this.setTokenWithExpirationDate(
      SessionKeys.GUEST_TOKEN,
      token,
      expirationDate
    );
  }

  public static getGuestTokenWithExpirationDate(): TokenData | null {
    return this.getTokenWithExpirationDate(SessionKeys.GUEST_TOKEN);
  }

  public static getUserId() {
    return this.getItem(SessionKeys.USER_ID);
  }

  public static setUserId(userId: string) {
    this.setItem(SessionKeys.USER_ID, userId);
  }
}

export default SessionServices;
