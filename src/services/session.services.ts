// FIXME: check and search best practice
// https://stackoverflow.com/questions/42420531/what-is-the-best-way-to-manage-a-users-session-in-react

import { ONE_HOUR, ONE_SECOND } from 'constants/time';
import { SessionKeys } from '../constants/sessionKeys';

type TokenData = {
  token: string;
  expiration: string;
};

export const generateTokenExpirationTime = () => {
  const currentTime = new Date().getTime();
  return new Date(currentTime + ONE_SECOND * 3);
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

  public static getAdminUserId() {
    return this.getItem(SessionKeys.ADMIN_USER_ID);
  }

  public static setAdminUserId(userId: string) {
    this.setItem(SessionKeys.ADMIN_USER_ID, userId);
  }

  public static getGuestUserId() {
    return this.getItem(SessionKeys.GUEST_USER_ID);
  }

  public static setGuestUserId(userId: string) {
    this.setItem(SessionKeys.GUEST_USER_ID, userId);
  }
}

export default SessionServices;
