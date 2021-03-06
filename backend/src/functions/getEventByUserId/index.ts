import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'get',
        path: 'event/{userId}',
        cors: true,
        authorizer: {
          name: 'authorizerFunc',
        },
      },
    },
  ],
};
