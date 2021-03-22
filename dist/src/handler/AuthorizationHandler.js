"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorizationFunc = void 0;
const generatePolicy_1 = require("../helpFunctions/generatePolicy");
const jwt_tools_1 = require("../jwt/jwt-tools");
const authorizationFunc = async (event, context) => {
    const { authorizationToken } = event;
    const result = jwt_tools_1.jwtVerify(authorizationToken) ? "Allow" : "Deny";
    return generatePolicy_1.generatePolicy("userQueryRole", result, event.methodArn);
};
exports.authorizationFunc = authorizationFunc;
