interface context {
  stringKey: string;
  numberKey: number;
  booleanKey: boolean;
}

interface policyDocument {
  Version: string;
  Statement: [];
}

interface authResponse {
  principalId: string;
  policyDocument: policyDocument;
  context: {};
}

export const generatePolicy = (
  principalId: string,
  effect: string,
  resource: string
) => {
  const authResponse: authResponse = {
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
    var policyDocument: any = {};
    policyDocument.Version = "2012-10-17";
    policyDocument.Statement = [];
    var statementOne: any = {};
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
