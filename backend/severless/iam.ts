export default [
  {
    Effect: 'Allow',
    // Allow operations
    Action: ['dynamodb:PutItem', 'dynamodb:GetItem', 'dynamodb:Query'],
    // Allow resources
    Resource:
      'arn:aws:dynamodb:${opt:region, self:provider.region}:*:table/user-event',
  },
  {
    Effect: 'Allow',
    // Allow operations
    Action: ['dynamodb:Query'],
    // Allow resources
    Resource:
      'arn:aws:dynamodb:${opt:region, self:provider.region}:*:table/user-event/index/PK-email-index',
  },
  {
    Effect: 'Allow',
    // Allow operations
    Action: ['dynamodb:Query'],
    // Allow resources
    Resource:
      'arn:aws:dynamodb:${opt:region, self:provider.region}:*:table/user-event/index/eventId-userId-index',
  },
];
