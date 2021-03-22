import { Handler } from "aws-lambda";
import { generateReturnBody, getResult, returnBody } from "../helpFunctions/generateReturnBody";
import { User } from "../types/User";
import {
  authUser,
  queryUserRole,
  insertUsers,
  queryUserName,
  updateUser,
  deleteUser,
  roleValueCheck,
} from "../controller/UserController";
import { jwtSign } from "../jwt/jwt-tools";

const userAuth: Handler = async (event, context) => {
  const { userEmail, userPassword } = JSON.parse(event.body);
  const token = jwtSign({ userEmail, userPassword });
  const result = await authUser(userEmail, userPassword);
  if(result == null){
    return generateReturnBody(400,"please input right email and password");
  }else{
    return generateReturnBody(200,JSON.stringify({
      User: result,
      Token: token,
    }))
  }
};

const userRoleQuery: Handler = async (event, context) => {
  const { role, page, pageSize } = event.queryStringParameters;
  const checkResult = roleValueCheck(role, page, pageSize);
  if (checkResult != true) {
    return checkResult;
  }
  const result = await queryUserRole(role, page, parseInt(pageSize));
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(result),
  };
};

const userNameQuery: Handler = async (event, context) => {
  const { name } = event.queryStringParameters;
  const result = await queryUserName(name, 0, 10);
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(result),
  };
};

const userInsert: Handler = async (event, context) => {
  const { user } = JSON.parse(event.body) || {};
  return getResult<User>(user,insertUsers);
};

const userUpdate: Handler = async (event, context) => {
  const { user } = JSON.parse(event.body) || {};
  return getResult<User>(user,updateUser);
};

const userDelete: Handler = async (event, context) => {
  const { user } = JSON.parse(event.body) || {};
  return getResult<User>(user,deleteUser);
};


export {
  userAuth,
  userRoleQuery,
  userInsert,
  userNameQuery,
  userUpdate,
  userDelete,
};
