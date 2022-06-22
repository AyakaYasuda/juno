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
      let auth;
      if (error) {
        auth = 'Deny';
      } else {
        auth = 'Allow';
      }

      const authResponse = {
        principalId: token,
        policyDocument: {
          Version: '2012-10-17',
          Statement: [
            {
              Action: 'execute-api:Invoke',
              Resource: [process.env.API_RESOURCE],
              Effect: auth,
            },
          ],
        },
      };

      return authResponse;
    });
  }
}

export default AuthServices;
