"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbServiceLookup = exports.dbServiceDelete = exports.dbServiceUpdate = exports.dbServiceInsert = exports.dbServiceGet = void 0;
const mongodb_1 = require("mongodb");
const dbConnectionUrl = "mongodb+srv://leilu0229:AAaa123581321@cluster0.vm8df.mongodb.net/ServerlessCourse?retryWrites=true&w=majority";
//1. initial function return promise
//2. map
const dbObject = async (dbCollectionName) => {
    const dbInstance = await mongodb_1.MongoClient.connect(dbConnectionUrl);
    const dbObject = dbInstance.db("ServerlessCourse");
    const dbCollection = dbObject.collection(dbCollectionName);
    return dbCollection;
};
//query
const dbServiceGet = async (tableName, searchKey, page, pageSize) => {
    const result = await dbObject(tableName);
    return result
        .find(searchKey)
        .sort({ _id: 1 })
        .skip(page * 1)
        .limit(pageSize)
        .toArray();
};
exports.dbServiceGet = dbServiceGet;
const dbServiceInsert = async (tableName, value) => {
    const result = await dbObject(tableName);
    return result.insertOne(value);
};
exports.dbServiceInsert = dbServiceInsert;
const dbServiceUpdate = async (tableName, value1, value2) => {
    const result = await dbObject(tableName);
    return result.updateOne(value1, value2);
};
exports.dbServiceUpdate = dbServiceUpdate;
const dbServiceDelete = async (tableName, value1) => {
    const result = await dbObject(tableName);
    return result.deleteOne(value1);
};
exports.dbServiceDelete = dbServiceDelete;
const dbServiceLookup = async (tableName, localValue, lookupTable, lookupAttribute, asValue) => {
    const collection = await dbObject(tableName);
    return collection
        .aggregate([
        {
            $lookup: {
                from: lookupTable,
                localField: localValue,
                foreignField: lookupAttribute,
                as: asValue,
            },
        },
    ])
        .toArray();
};
exports.dbServiceLookup = dbServiceLookup;
