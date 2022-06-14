import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  environment: { JWT_SECRET_KEY: process.env.JWT_SECRET },
  events: [
    {
      http: {
        method: 'patch',
        path: 'event/edit/{eventId}',
      },
    },
  ],
};
