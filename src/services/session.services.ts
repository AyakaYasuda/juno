// FIXME: check and search best practice
// https://stackoverflow.com/questions/42420531/what-is-the-best-way-to-manage-a-users-session-in-react

import { SessionKeys } from '../constants/sessionKeys';

class SessionServices {
  public static getItem(key: SessionKeys) {
    return localStorage.getItem(key);
  }

  public static setItem(key: SessionKeys, value: any) {
    localStorage.setItem(key, value);
  }

  public static removeItem(key: SessionKeys) {
    localStorage.removeItem(key);
  }
}

export default SessionServices;
