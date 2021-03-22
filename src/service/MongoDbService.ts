import {
  AggregationCursor,
  Collection,
  DeleteWriteOpResultObject,
  InsertOneWriteOpResult,
  MongoClient,
  UpdateWriteOpResult,
} from "mongodb";
import { User } from "src/types/User";

const dbConnectionUrl =
  "mongodb+srv://leilu0229:AAaa123581321@cluster0.vm8df.mongodb.net/ServerlessCourse?retryWrites=true&w=majority";

//1. initial function return promise
//2. map

const dbObject = async (dbCollectionName: string): Promise<Collection> => {
  const dbInstance = await MongoClient.connect(dbConnectionUrl);
  const dbObject = dbInstance.db("ServerlessCourse");
  const dbCollection = dbObject.collection(dbCollectionName);
  return dbCollection;
};
//query
const dbServiceGet = async <T>(
  tableName: string,
  searchKey: object,
  page: number,
  pageSize: number
): Promise<T[]> => {
  const result = await dbObject(tableName);
  return result
    .find(searchKey)
    .sort({ _id: 1 })
    .skip(page * 1)
    .limit(pageSize)
    .toArray();
};

const dbServiceInsert = async <T>(
  tableName: string,
  value: object
): Promise<InsertOneWriteOpResult<any>> => {
  const result = await dbObject(tableName);
  return result.insertOne(value);
};

const dbServiceUpdate = async <T>(
  tableName: string,
  value1: object,
  value2: object
): Promise<UpdateWriteOpResult> => {
  const result = await dbObject(tableName);
  return result.updateOne(value1, value2);
};

const dbServiceDelete = async <T>(
  tableName: string,
  value1: object
): Promise<DeleteWriteOpResultObject> => {
  const result = await dbObject(tableName);
  return result.deleteOne(value1);
};

const dbServiceLookup = async <T>(
  tableName: string,
  localValue: string,
  lookupTable: string,
  lookupAttribute: number | string,
  asValue: string
) => {
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
export {
  dbServiceGet,
  dbServiceInsert,
  dbServiceUpdate,
  dbServiceDelete,
  dbServiceLookup
};
