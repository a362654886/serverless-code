module.exports = {
  tables: [
    {
      TableName: "Users",
      KeySchema: [
        { AttributeName: "UserEmail", KeyType: "HASH" },
        { AttributeName: "UserPassword", KeyType: "RANGE" },
      ],
      AttributeDefinitions: [
        { AttributeName: "UserEmail", AttributeType: "S" },
        { AttributeName: "UserPassword", AttributeType: "S" },
      ],
      ProvisionedThroughput: {
        ReadCapacityUnits: 20,
        WriteCapacityUnits: 20,
      },
    },
  ],
  basePort: 8001,
};
