"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.jwtVerify = exports.jwtSign = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const saltSecret = '1234567890';
const jwtSign = (payload) => {
    const secretOrPrivateKey = saltSecret;
    // Eg: 60, "2 days", "10h", "7d" */
    const options = { expiresIn: '7d' };
    const result = jsonwebtoken_1.sign(payload, secretOrPrivateKey, options);
    return result;
};
exports.jwtSign = jwtSign;
const jwtVerify = (token) => {
    const secretOrPrivateKey = saltSecret;
    try {
        const result = jsonwebtoken_1.verify(token, secretOrPrivateKey);
        return result;
    }
    catch (e) {
        //console.error('jwtVerify error:', e);
        return null;
    }
};
exports.jwtVerify = jwtVerify;
