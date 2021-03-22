"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResult = exports.generateReturnBody = void 0;
const generateReturnBody = (status, body) => {
    return {
        statusCode: status,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: body,
    };
};
exports.generateReturnBody = generateReturnBody;
const getResult = async (body, asyncFn) => {
    let apiResult = exports.generateReturnBody(0, "");
    try {
        const aBody = body;
        const result = await asyncFn(aBody);
        apiResult = exports.generateReturnBody(200, JSON.stringify(result));
    }
    catch (error) {
        apiResult = exports.generateReturnBody(400, JSON.stringify(error.toString()));
    }
    return apiResult;
};
exports.getResult = getResult;
