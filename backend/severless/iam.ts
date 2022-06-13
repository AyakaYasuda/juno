export default [
  {
    Effect: "Allow",
    // Allow operations
    Action: ["dynamodb:PutItem", "dynamodb:GetItem"],
    // Allow resources
    Resource:
      "arn:aws:dynamodb:${opt:region, self:provider.region}:*:table/usersTable",
  },
  {
    Effect: "Allow",
    // Allow operations
    Action: ["dynamodb:PutItem", "dynamodb:GetItem"],
    // Allow resources
    Resource:
      "arn:aws:dynamodb:${opt:region, self:provider.region}:*:table/itemsTable",
  },
  {
    Effect: "Allow",
    // Allow operations
    Action: ["dynamodb:PutItem", "dynamodb:GetItem"],
    // Allow resources
    Resource:
      "arn:aws:dynamodb:${opt:region, self:provider.region}:*:table/user-event",
  },
];
