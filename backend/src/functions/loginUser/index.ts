import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  environment: { JWT_SECRET: process.env.JWT_SECRET },
  events: [
    {
      http: {
        method: 'post',
        path: 'user/login',
      },
    },
  ],
};
