import jwt from 'jsonwebtoken';

class AuthServices {
  public async generateToken(userId: string) {
    if (!userId) {
      return null;
    }

    const loginUserInfo = {
      userId,
    };

    return jwt.sign(loginUserInfo, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });
  }

  public async verifyToken(token: string) {
    return jwt.verify(token, process.env.JWT_SECRET, (error: Error) => {
      if (error) {
        console.log(error);
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
