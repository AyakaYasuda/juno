import jwt from 'jsonwebtoken';

class AuthServices {
  public async generateToken(email: string, password: string) {
    if (!email || !password) {
      return null;
    }

    const loginUserInfo = {
      email,
      password,
    };

    return jwt.sign(loginUserInfo, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
  }
}

export default AuthServices;
