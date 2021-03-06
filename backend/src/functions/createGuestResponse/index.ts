import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'user/event/{eventId}',
        cors: true,
        authorizer: {
          name: 'authorizerFunc',
        },
      },
    },
  ],
};
