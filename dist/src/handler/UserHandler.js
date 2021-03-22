"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDelete = exports.userUpdate = exports.userNameQuery = exports.userInsert = exports.userRoleQuery = exports.userAuth = void 0;
const generateReturnBody_1 = require("../helpFunctions/generateReturnBody");
const UserController_1 = require("../controller/UserController");
const jwt_tools_1 = require("../jwt/jwt-tools");
const userAuth = async (event, context) => {
    const { userEmail, userPassword } = JSON.parse(event.body);
    const token = jwt_tools_1.jwtSign({ userEmail, userPassword });
    const result = await UserController_1.authUser(userEmail, userPassword);
    if (result == null) {
        return generateReturnBody_1.generateReturnBody(400, "please input right email and password");
    }
    else {
        return generateReturnBody_1.generateReturnBody(200, JSON.stringify({
            User: result,
            Token: token,
        }));
    }
};
exports.userAuth = userAuth;
const userRoleQuery = async (event, context) => {
    const { role, page, pageSize } = event.queryStringParameters;
    const checkResult = UserController_1.roleValueCheck(role, page, pageSize);
    if (checkResult != true) {
        return checkResult;
    }
    const result = await UserController_1.queryUserRole(role, page, parseInt(pageSize));
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(result),
    };
};
exports.userRoleQuery = userRoleQuery;
const userNameQuery = async (event, context) => {
    const { name } = event.queryStringParameters;
    const result = await UserController_1.queryUserName(name, 0, 10);
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(result),
    };
};
exports.userNameQuery = userNameQuery;
const userInsert = async (event, context) => {
    const { user } = JSON.parse(event.body) || {};
    return generateReturnBody_1.getResult(user, UserController_1.insertUsers);
};
exports.userInsert = userInsert;
const userUpdate = async (event, context) => {
    const { user } = JSON.parse(event.body) || {};
    return generateReturnBody_1.getResult(user, UserController_1.updateUser);
};
exports.userUpdate = userUpdate;
const userDelete = async (event, context) => {
    const { user } = JSON.parse(event.body) || {};
    return generateReturnBody_1.getResult(user, UserController_1.deleteUser);
};
exports.userDelete = userDelete;
