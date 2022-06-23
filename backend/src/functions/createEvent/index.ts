import { handlerPath } from '@libs/handler-resolver';

export default {
  handler: `${handlerPath(__dirname)}/handler.main`,
  events: [
    {
      http: {
        method: 'post',
        path: 'event/new/{userId}',
        cors: true,
        authorizer: {
          name: 'authorizerFunc',
        },
      },
    },
  ],
};
