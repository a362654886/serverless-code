import { Handler } from "aws-lambda";
import { generatePolicy } from "../helpFunctions/generatePolicy";
import { jwtVerify } from "../jwt/jwt-tools";

const authorizationFunc: Handler = async (event, context) => {
  const { authorizationToken } = event;
  const result = jwtVerify(authorizationToken) ? "Allow" : "Deny";
  return generatePolicy("userQueryRole", result, event.methodArn);
};

export { authorizationFunc };
