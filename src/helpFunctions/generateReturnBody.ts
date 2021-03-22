import { User } from "src/types/User";

export type returnBody = {
    statusCode: number,
    headers: object,
    body: JSON|string
}

export const generateReturnBody = (status: number, body: JSON|string): returnBody=> {
  return {
    statusCode: status,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: body,
  };
};

export const getResult = async <T>(body: T,asyncFn:(value: T) => Promise<any>):Promise<returnBody>  =>{
  let apiResult: returnBody = generateReturnBody(0,"");
  try {
    const aBody: T = body;
    const result = await asyncFn(aBody);
    apiResult = generateReturnBody(200,JSON.stringify(result));
  } catch (error) {
    apiResult = generateReturnBody(400,JSON.stringify(error.toString()));
  }
  return apiResult
}
