import { DocumentClient } from "aws-sdk/clients/dynamodb";

export const setTestDb =  () =>{
  const DynamoDBClient = new DocumentClient({
    ...(process.env.MOCK_DYNAMODB_ENDPOINT && {
      endpoint: "http://localhost:8001",
      sslEnabled: false,
      region: "local",
    }),
    convertEmptyValues: true,
  });

  DynamoDBClient.put({
    TableName: "Users",
    Item: {
      UserEmail: "leilu0249@outlook.com",
      UserPassword: "111222",
    },
  })
  return DynamoDBClient;
}

