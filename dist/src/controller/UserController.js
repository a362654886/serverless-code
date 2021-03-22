"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.roleValueCheck = exports.queryUserName = exports.queryUserRole = exports.deleteUser = exports.updateUser = exports.insertUsers = exports.authUser = void 0;
const MongoDbService_1 = require("../service/MongoDbService");
const Table_1 = require("../types/Table");
const generateReturnBody_1 = require("../helpFunctions/generateReturnBody");
// mongoDB
const authUser = async (email, password) => {
    var _a;
    const user = await MongoDbService_1.dbServiceGet(Table_1.Table.User, { userEmail: email }, 0, 0);
    if (user.length != 0) {
        return ((_a = user[0]) === null || _a === void 0 ? void 0 : _a.userPassword) == password ? user[0] : null;
    }
    else {
        return null;
    }
    /*return graphql(schema, "{user {UserName,UserEmail,UserPassword,UserRole}}", {
      UserName: email,
      UserPassword: password,
    });*/
};
exports.authUser = authUser;
const insertUsers = async (value) => {
    const aUser = {
        _id: value.userEmail,
        userEmail: value.userEmail,
        userPassword: value.userPassword,
        userName: value.userName,
        userRole: value.userRole,
    };
    return MongoDbService_1.dbServiceInsert(Table_1.Table.User, aUser);
};
exports.insertUsers = insertUsers;
const updateUser = async (value) => {
    const value1 = { userEmail: value.userEmail };
    const value2 = {
        $set: {
            userEmail: value.userEmail,
            userPassword: value.userPassword,
            userName: value.userName,
            userRole: value.userRole,
        },
    };
    const arg = [value1, value2];
    //return graphql(schema, "mutation {userUpdate {UserName}}", arg);
    return MongoDbService_1.dbServiceUpdate(Table_1.Table.User, value1, value2);
};
exports.updateUser = updateUser;
const deleteUser = async (user) => {
    const value1 = { userEmail: user.userEmail };
    return MongoDbService_1.dbServiceDelete(Table_1.Table.User, value1);
    //return graphql(schema, "mutation {userDelete {UserName}}", value1);
};
exports.deleteUser = deleteUser;
const queryUserRole = async (value, page, pageSize) => MongoDbService_1.dbServiceGet(Table_1.Table.User, { userRole: value }, page, pageSize);
exports.queryUserRole = queryUserRole;
const queryUserName = async (value, page, pageSize) => MongoDbService_1.dbServiceGet(Table_1.Table.User, { userName: value }, page, pageSize);
exports.queryUserName = queryUserName;
//await graphql(schema, "{User {UserName,UserEmail,UserPassword,UserRole}}");
const roleValueCheck = (value, page, pageSize) => {
    const roleArr = ["student", "teacher", "admin"];
    if (roleArr.indexOf(value.toLowerCase()) == -1) {
        return generateReturnBody_1.generateReturnBody(400, `${value} isn't included in student teacher and admin`);
    }
    if (isNaN(Number(page)) || isNaN(Number(pageSize))) {
        return generateReturnBody_1.generateReturnBody(400, ` page and pageSize should be number`);
    }
    return true;
};
exports.roleValueCheck = roleValueCheck;
