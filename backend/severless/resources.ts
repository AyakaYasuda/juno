export default {
  userEventTable: {
    Type: 'AWS::DynamoDB::Table',
    Properties: {
      TableName: 'user-event',
      // Define data type of Primary Key (and Sort Key if you want)
      AttributeDefinitions: [
        {
          AttributeName: 'PK',
          AttributeType: 'S',
        },
        {
          AttributeName: 'SK',
          AttributeType: 'S',
        },
        {
          AttributeName: 'email',
          AttributeType: 'S',
        },
      ],
      // Define HASH key and RANGE key
      // HASH＝Primary Key, RANGE=Sort Key
      KeySchema: [
        {
          KeyType: 'HASH',
          AttributeName: 'PK',
        },
        {
          KeyType: 'RANGE',
          AttributeName: 'SK',
        },
      ],
      GlobalSecondaryIndexes: [
        {
          IndexName: 'eventId-userId-index',
          KeySchema: [
            {
              KeyType: 'HASH',
              AttributeName: 'SK',
            },
            {
              KeyType: 'RANGE',
              AttributeName: 'PK',
            },
          ],
          Projection: {
            ProjectionType: 'ALL',
          },
          ProvisionedThroughput: {
            ReadCapacityUnits: 5,
            WriteCapacityUnits: 5,
          },
        },
      ],
      LocalSecondaryIndexes: [
        {
          IndexName: 'PK-email-index',
          KeySchema: [
            {
              KeyType: 'HASH',
              AttributeName: 'PK',
            },
            {
              KeyType: 'RANGE',
              AttributeName: 'email',
            },
          ],
          Projection: {
            ProjectionType: 'ALL',
          },
        },
      ],

      // Define capacity unit
      ProvisionedThroughput: {
        ReadCapacityUnits: 5,
        WriteCapacityUnits: 5,
      },
    },
  },
};
