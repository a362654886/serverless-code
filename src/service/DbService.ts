import { DynamoDB } from "aws-sdk";
import { User } from 'src/types/User';
import {Table} from "../types/Table"

const DynamoDBClient = new DynamoDB.DocumentClient({
  ...(process.env.MOCK_DYNAMODB_ENDPOINT && {
    endpoint: process.env.MOCK_DYNAMODB_ENDPOINT,
    sslEnabled: false,
    region: "local",
  }),
  convertEmptyValues: true,
});

const dbServiceGet = async <T>(
  tableName: string,
  key: object
): Promise<T | null> => {
  const result = await DynamoDBClient.get({
    TableName: tableName,
    Key: key,
  })
    .promise()
    .then((data) => data.Item);

  return result ? (result as T) : null;
};

const dbServiceInsert = async <T>(
  tableName: string,
  item: object
): Promise<T | null> => {
  const result = await DynamoDBClient.put({
    TableName: tableName,
    Item: item,
  })
    .promise()
    .then((data) => data.Attributes);

  return result ? (result as T) : null;
};

const dbServiceUpdateUser = async <T>(
  user: User
): Promise<T | null> => {
  const result = await DynamoDBClient.update({
    TableName: "Users",
    Key: {"UserEmail": user.userEmail, "UserPassword": user.userPassword},
    UpdateExpression: 'set UserName =:n, UserRole=:r',
    ExpressionAttributeValues: {
      ':n': user.userName,
      ':r': user.userRole,
    },
    ReturnValues: 'UPDATED_NEW'
  })
    .promise()
    .then((data) => data.Attributes);

  return result ? (result as T) : null;
};

const dbServiceDeleteUser = async <T>(
  user: User
): Promise<T | null> => {
  const result = await DynamoDBClient.delete({
    TableName: "Users",
    Key: {"UserEmail": user.userEmail, "UserPassword": user.userPassword}
  })
    .promise()
    .then((data) => data.Attributes);

  return result ? (result as T) : null;
};

const dbServiceUserQuery = async <T>(
  IndexName: string,
  attribute: string,
  value: string
): Promise<T[] | null> => {
  const result = await DynamoDBClient.query({
    TableName: Table.User,
    IndexName: IndexName,
    KeyConditionExpression: `${attribute}=:name`,
    ExpressionAttributeValues: {
      ":name": value,
    },
    ProjectionExpression: "UserEmail, UserPassword,UserRole, UserName",
    ScanIndexForward: false,
  })
    .promise()
    .then((data) => data.Items);

  return result ? (result as Array<T>) : null;
};
export { dbServiceGet, dbServiceUserQuery, dbServiceInsert, dbServiceUpdateUser, dbServiceDeleteUser};
