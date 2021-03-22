"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generatePolicy = void 0;
const generatePolicy = (principalId, effect, resource) => {
    const authResponse = {
        principalId: "",
        policyDocument: {
            Version: "",
            Statement: [],
        },
        context: {
            stringKey: "",
            numberKey: 0,
            booleanKey: false,
        },
    };
    authResponse.principalId = principalId;
    if (effect && resource) {
        var policyDocument = {};
        policyDocument.Version = "2012-10-17";
        policyDocument.Statement = [];
        var statementOne = {};
        statementOne.Action = "execute-api:Invoke";
        statementOne.Effect = effect;
        statementOne.Resource = resource;
        policyDocument.Statement[0] = statementOne;
        authResponse.policyDocument = policyDocument;
    }
    // Optional output with custom properties of the String, Number or Boolean type.
    authResponse.context = {
        stringKey: "stringval",
        numberKey: 123,
        booleanKey: true,
    };
    return authResponse;
};
exports.generatePolicy = generatePolicy;
