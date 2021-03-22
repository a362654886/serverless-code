"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setTestDb = void 0;
const dynamodb_1 = require("aws-sdk/clients/dynamodb");
const setTestDb = () => {
    const DynamoDBClient = new dynamodb_1.DocumentClient({
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
    });
    return DynamoDBClient;
};
exports.setTestDb = setTestDb;
