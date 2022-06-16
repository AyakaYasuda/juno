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

  public async verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET, (error: Error) => {
      if (error) {
        return {
          verified: false,
          message: 'Invalid token',
        };
      }

      return { verified: true, message: 'Verified' };
    });
  }
}

export default AuthServices;
