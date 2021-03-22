"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbServiceDeleteUser = exports.dbServiceUpdateUser = exports.dbServiceInsert = exports.dbServiceUserQuery = exports.dbServiceGet = void 0;
const aws_sdk_1 = require("aws-sdk");
const Table_1 = require("../types/Table");
const DynamoDBClient = new aws_sdk_1.DynamoDB.DocumentClient({
    ...(process.env.MOCK_DYNAMODB_ENDPOINT && {
        endpoint: process.env.MOCK_DYNAMODB_ENDPOINT,
        sslEnabled: false,
        region: "local",
    }),
    convertEmptyValues: true,
});
const dbServiceGet = async (tableName, key) => {
    const result = await DynamoDBClient.get({
        TableName: tableName,
        Key: key,
    })
        .promise()
        .then((data) => data.Item);
    return result ? result : null;
};
exports.dbServiceGet = dbServiceGet;
const dbServiceInsert = async (tableName, item) => {
    const result = await DynamoDBClient.put({
        TableName: tableName,
        Item: item,
    })
        .promise()
        .then((data) => data.Attributes);
    return result ? result : null;
};
exports.dbServiceInsert = dbServiceInsert;
const dbServiceUpdateUser = async (user) => {
    const result = await DynamoDBClient.update({
        TableName: "Users",
        Key: { "UserEmail": user.userEmail, "UserPassword": user.userPassword },
        UpdateExpression: 'set UserName =:n, UserRole=:r',
        ExpressionAttributeValues: {
            ':n': user.userName,
            ':r': user.userRole,
        },
        ReturnValues: 'UPDATED_NEW'
    })
        .promise()
        .then((data) => data.Attributes);
    return result ? result : null;
};
exports.dbServiceUpdateUser = dbServiceUpdateUser;
const dbServiceDeleteUser = async (user) => {
    const result = await DynamoDBClient.delete({
        TableName: "Users",
        Key: { "UserEmail": user.userEmail, "UserPassword": user.userPassword }
    })
        .promise()
        .then((data) => data.Attributes);
    return result ? result : null;
};
exports.dbServiceDeleteUser = dbServiceDeleteUser;
const dbServiceUserQuery = async (IndexName, attribute, value) => {
    const result = await DynamoDBClient.query({
        TableName: Table_1.Table.User,
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
    return result ? result : null;
};
exports.dbServiceUserQuery = dbServiceUserQuery;
