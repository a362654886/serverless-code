import { Role, User } from "src/types/User";
import {
  dbServiceGet,
  dbServiceInsert,
  dbServiceUpdate,
  dbServiceDelete,
} from "../service/MongoDbService";
import {
  DeleteWriteOpResultObject,
  InsertOneWriteOpResult,
  UpdateWriteOpResult,
} from "mongodb";
import { Table } from "../types/Table";
import { graphql, ExecutionResult } from "graphql";
import { bool } from "aws-sdk/clients/signer";
import {
  generateReturnBody,
  returnBody,
} from "../helpFunctions/generateReturnBody";

// mongoDB
export const authUser = async (
  email: string,
  password: string
): Promise<User | null> => {
  const user: User[] = await dbServiceGet<User>(
    Table.User,
    { userEmail: email },
    0,
    0
  );
  if (user.length != 0) {
    return user[0]?.userPassword == password ? user[0] : null;
  } else {
    return null;
  }

  /*return graphql(schema, "{user {UserName,UserEmail,UserPassword,UserRole}}", {
    UserName: email,
    UserPassword: password,
  });*/
};

export const insertUsers = async (
  value: User
): Promise<InsertOneWriteOpResult<any>> => {
  const aUser = {
    _id: value.userEmail,
    userEmail: value.userEmail,
    userPassword: value.userPassword,
    userName: value.userName,
    userRole: value.userRole,
  };
  return dbServiceInsert<User>(Table.User, aUser);
};

export const updateUser = async (value: User): Promise<UpdateWriteOpResult> => {
  const value1: object = { userEmail: value.userEmail };
  const value2: object = {
    $set: {
      userEmail: value.userEmail,
      userPassword: value.userPassword,
      userName: value.userName,
      userRole: value.userRole,
    },
  };
  const arg = [value1, value2];
  //return graphql(schema, "mutation {userUpdate {UserName}}", arg);
  return dbServiceUpdate(Table.User, value1, value2);
};

export const deleteUser = async (
  user: User
): Promise<DeleteWriteOpResultObject | null> => {
  const value1: object = { userEmail: user.userEmail };
  return dbServiceDelete(Table.User, value1);
  //return graphql(schema, "mutation {userDelete {UserName}}", value1);
};

export const queryUserRole = async (
  value: string,
  page: number,
  pageSize: number
): Promise<User[] | null> =>
  dbServiceGet<User>(Table.User, { userRole: value }, page, pageSize);

export const queryUserName = async (
  value: string,
  page: any,
  pageSize: any
): Promise<User[] | null> =>
  dbServiceGet<User>(Table.User, { userName: value }, page, pageSize);
//await graphql(schema, "{User {UserName,UserEmail,UserPassword,UserRole}}");

export const roleValueCheck = (
  value: string,
  page: number,
  pageSize: number
): boolean | returnBody => {
  const roleArr = ["student", "teacher", "admin"];
  if (roleArr.indexOf(value.toLowerCase()) == -1) {
    return generateReturnBody(
      400,
      `${value} isn't included in student teacher and admin`
    );
  }
  if (isNaN(Number(page)) || isNaN(Number(pageSize))) {
    return generateReturnBody(400, ` page and pageSize should be number`);
  }

  return true;
};
