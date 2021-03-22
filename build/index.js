module.exports =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/graphpack/config/index.js":
/*!************************************************!*\
  !*** ./node_modules/graphpack/config/index.js ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const cosmiconfig = __webpack_require__(/*! cosmiconfig */ "cosmiconfig");

const webpack = __webpack_require__(/*! webpack */ "webpack");

const defaultConfig = __webpack_require__(/*! ./webpack.config */ "./node_modules/graphpack/config/webpack.config.js");

const explorer = cosmiconfig('graphpack').search();

const loadServerConfig = async () => {
  const result = await explorer;
  const userConfig = result ? typeof result.config === 'function' ? result.config(defaultConfig.mode) : result.config : {};
  return {
    port: Number(process.env.PORT),
    ...userConfig.server
  };
};

const loadWebpackConfig = async () => {
  const result = await explorer;
  const userConfig = result ? typeof result.config === 'function' ? result.config(defaultConfig.mode) : result.config : {};

  if (typeof userConfig.webpack === 'function') {
    return userConfig.webpack({
      config: defaultConfig,
      webpack
    });
  }

  return { ...defaultConfig,
    ...userConfig.webpack
  };
};

exports.loadServerConfig = loadServerConfig;
exports.loadWebpackConfig = loadWebpackConfig;

/***/ }),

/***/ "./node_modules/graphpack/config/webpack.config.js":
/*!*********************************************************!*\
  !*** ./node_modules/graphpack/config/webpack.config.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

const FriendlyErrorsWebpackPlugin = __webpack_require__(/*! friendly-errors-webpack-plugin */ "friendly-errors-webpack-plugin");

const fs = __webpack_require__(/*! fs */ "fs");

const path = __webpack_require__(/*! path */ "path");

const webpack = __webpack_require__(/*! webpack */ "webpack");

const nodeExternals = __webpack_require__(/*! webpack-node-externals */ "webpack-node-externals");

const isDev = "development" !== 'production';
const isWebpack = typeof __webpack_require__.m === 'object';
const hasBabelRc = fs.existsSync(path.resolve('babel.config.js'));

if (hasBabelRc && !isWebpack) {
  console.info('🐠 Using babel.config.js defined in your app root');
}

module.exports = {
  devtool: 'source-map',
  entry: {
    // We take care of setting up entry file under lib/index.js
    index: ['graphpack']
  },
  // When bundling with Webpack for the backend you usually don't want to bundle
  // its node_modules dependencies. This creates an externals function that
  // ignores node_modules when bundling in Webpack.
  externals: [nodeExternals({
    whitelist: [/^graphpack$/]
  })],
  mode: isDev ? 'development' : 'production',
  module: {
    rules: [{
      test: /\.(gql|graphql)/,
      use: 'graphql-tag/loader'
    }, {
      test: /\.(js|ts)$/,
      use: [{
        loader: /*require.resolve*/(/*! babel-loader */ "babel-loader"),
        options: {
          babelrc: true,
          cacheDirectory: true,
          presets: hasBabelRc ? undefined : [/*require.resolve*/(/*! babel-preset-graphpack */ "babel-preset-graphpack")]
        }
      }]
    }, {
      test: /\.mjs$/,
      type: 'javascript/auto'
    }]
  },
  node: {
    __filename: true,
    __dirname: true
  },
  optimization: {
    noEmitOnErrors: true
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs2',
    path: path.join(process.cwd(), './build'),
    sourceMapFilename: '[name].map'
  },
  performance: {
    hints: false
  },
  plugins: [new webpack.optimize.LimitChunkCountPlugin({
    maxChunks: 1
  }), new webpack.EnvironmentPlugin({
    DEBUG: false,
    GRAPHPACK_SRC_DIR: path.resolve(process.cwd(), 'src'),
    NODE_ENV: 'development'
  }), new FriendlyErrorsWebpackPlugin({
    clearConsole: isDev
  })],
  resolve: {
    extensions: ['.ts', '.js']
  },
  stats: 'minimal',
  target: 'node'
};

/***/ }),

/***/ "./node_modules/graphpack/lib/server.js":
/*!**********************************************!*\
  !*** ./node_modules/graphpack/lib/server.js ***!
  \**********************************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var apollo_server__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! apollo-server */ "apollo-server");
/* harmony import */ var apollo_server__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(apollo_server__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! apollo-server-express */ "apollo-server-express");
/* harmony import */ var apollo_server_express__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(apollo_server_express__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _srcFiles__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./srcFiles */ "./node_modules/graphpack/lib/srcFiles.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../config */ "./node_modules/graphpack/config/index.js");
/* harmony import */ var _config__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_config__WEBPACK_IMPORTED_MODULE_3__);





if (!(_srcFiles__WEBPACK_IMPORTED_MODULE_2__["resolvers"] && Object.keys(_srcFiles__WEBPACK_IMPORTED_MODULE_2__["resolvers"]).length > 0)) {
  throw Error(`Couldn't find any resolvers. Please add resolvers to your src/resolvers.js`);
}

const createServer = config => {
  const {
    applyMiddleware,
    port: serverPort,
    ...options
  } = config;
  const port = Number(process.env.PORT) || serverPort || 4000; // Pull out fields that are not relevant for the apollo server
  // Use apollo-server-express when middleware detected

  if (applyMiddleware && applyMiddleware.app && typeof applyMiddleware.app.listen === 'function') {
    const server = new apollo_server_express__WEBPACK_IMPORTED_MODULE_1__["ApolloServer"](options);
    server.applyMiddleware(applyMiddleware);
    return applyMiddleware.app.listen({
      port
    }, () => console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath}`));
  } // Use apollo-server


  const server = new apollo_server__WEBPACK_IMPORTED_MODULE_0__["ApolloServer"](options);
  return server.listen({
    port
  }).then(({
    url
  }) => console.log(`🚀 Server ready at ${url}`));
};

const startServer = async () => {
  // Load server config from graphpack.config.js
  const config = await Object(_config__WEBPACK_IMPORTED_MODULE_3__["loadServerConfig"])();
  createServer({ ...config,
    context: _srcFiles__WEBPACK_IMPORTED_MODULE_2__["context"],
    resolvers: _srcFiles__WEBPACK_IMPORTED_MODULE_2__["resolvers"],
    typeDefs: _srcFiles__WEBPACK_IMPORTED_MODULE_2__["typeDefs"]
  });
};

startServer();

/***/ }),

/***/ "./node_modules/graphpack/lib/srcFiles.js":
/*!************************************************!*\
  !*** ./node_modules/graphpack/lib/srcFiles.js ***!
  \************************************************/
/*! exports provided: importFirst, context, resolvers, typeDefs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "importFirst", function() { return importFirst; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "context", function() { return context; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "resolvers", function() { return resolvers; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "typeDefs", function() { return typeDefs; });
const importFirst = req => req.keys().map(mod => req(mod).default || req(mod))[0]; // Optionally import modules

const context = importFirst(__webpack_require__("./src sync recursive ^\\.\\/(context|context\\/index)\\.(js|ts)$"));
const resolvers = importFirst(__webpack_require__("./src sync recursive ^\\.\\/(resolvers|resolvers\\/index)\\.(js|ts)$"));
const typeDefs = importFirst(__webpack_require__("./src sync recursive ^\\.\\/(schema|schema\\/index)\\.(gql|graphql|js|ts)$"));

/***/ }),

/***/ "./src sync recursive ^\\.\\/(context|context\\/index)\\.(js|ts)$":
/*!**********************************************************!*\
  !*** ./src sync ^\.\/(context|context\/index)\.(js|ts)$ ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	var e = new Error("Cannot find module '" + req + "'");
	e.code = 'MODULE_NOT_FOUND';
	throw e;
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = "./src sync recursive ^\\.\\/(context|context\\/index)\\.(js|ts)$";

/***/ }),

/***/ "./src sync recursive ^\\.\\/(resolvers|resolvers\\/index)\\.(js|ts)$":
/*!**************************************************************!*\
  !*** ./src sync ^\.\/(resolvers|resolvers\/index)\.(js|ts)$ ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./resolvers/index.ts": "./src/resolvers/index.ts"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./src sync recursive ^\\.\\/(resolvers|resolvers\\/index)\\.(js|ts)$";

/***/ }),

/***/ "./src sync recursive ^\\.\\/(schema|schema\\/index)\\.(gql|graphql|js|ts)$":
/*!********************************************************************!*\
  !*** ./src sync ^\.\/(schema|schema\/index)\.(gql|graphql|js|ts)$ ***!
  \********************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./schema.graphql": "./src/schema.graphql",
	"./schema.ts": "./src/schema.ts"
};


function webpackContext(req) {
	var id = webpackContextResolve(req);
	return __webpack_require__(id);
}
function webpackContextResolve(req) {
	if(!__webpack_require__.o(map, req)) {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	}
	return map[req];
}
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = "./src sync recursive ^\\.\\/(schema|schema\\/index)\\.(gql|graphql|js|ts)$";

/***/ }),

/***/ "./src/jwt/jwt-tools.ts":
/*!******************************!*\
  !*** ./src/jwt/jwt-tools.ts ***!
  \******************************/
/*! exports provided: jwtSign, jwtVerify */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jwtSign", function() { return jwtSign; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "jwtVerify", function() { return jwtVerify; });
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! jsonwebtoken */ "jsonwebtoken");
/* harmony import */ var jsonwebtoken__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__);

const saltSecret = '1234567890';

const jwtSign = payload => {
  const secretOrPrivateKey = saltSecret; // Eg: 60, "2 days", "10h", "7d" */

  const options = {
    expiresIn: '7d'
  };
  const result = Object(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__["sign"])(payload, secretOrPrivateKey, options);
  return result;
};

const jwtVerify = token => {
  const secretOrPrivateKey = saltSecret;

  try {
    const result = Object(jsonwebtoken__WEBPACK_IMPORTED_MODULE_0__["verify"])(token, secretOrPrivateKey);
    return result;
  } catch (e) {
    console.error('jwtVerify error:', e);
    return null;
  }
};



/***/ }),

/***/ "./src/resolvers/courseQuery.ts":
/*!**************************************!*\
  !*** ./src/resolvers/courseQuery.ts ***!
  \**************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _types_Table__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types/Table */ "./src/types/Table.ts");
/* harmony import */ var dataloader__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! dataloader */ "dataloader");
/* harmony import */ var dataloader__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(dataloader__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _service_MongoDBGraphQL__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../service/MongoDBGraphQL */ "./src/service/MongoDBGraphQL.ts");




//dataloader
const teacherFn = async courseIds => {
  const DBTeachers = await Object(_service_MongoDBGraphQL__WEBPACK_IMPORTED_MODULE_2__["dbData"])(_types_Table__WEBPACK_IMPORTED_MODULE_0__["Table"].Teacher);
  const classes = DBTeachers.filter(teacher => courseIds.includes(teacher.courseId));
  return classes;
};

const teacherLoader = new dataloader__WEBPACK_IMPORTED_MODULE_1___default.a(teacherFn); //query
//

/* harmony default export */ __webpack_exports__["default"] = ({
  Query: {
    course: context => Object(_service_MongoDBGraphQL__WEBPACK_IMPORTED_MODULE_2__["dbAggregate"])(_types_Table__WEBPACK_IMPORTED_MODULE_0__["Table"].Course, "_id", "Class", "courseId", "students")
  },
  Course: {
    teachers: parent => teacherLoader.load(parent._id),
    students: (parent, arg) => getStudents(parent, arg)
  }
}); //help function

const getStudents = async (parent, arg) => {
  const allStudent = [];

  if (parent.students) {
    for (const s of parent.students) {
      const student = await Object(_service_MongoDBGraphQL__WEBPACK_IMPORTED_MODULE_2__["dbQuery"])(_types_Table__WEBPACK_IMPORTED_MODULE_0__["Table"].Student, {
        studentName: s === null || s === void 0 ? void 0 : s.studentName
      });

      if (student[0].gender == arg.gender) {
        allStudent.push(student[0]);
      }
    }
  }

  return allStudent;
};

/***/ }),

/***/ "./src/resolvers/index.ts":
/*!********************************!*\
  !*** ./src/resolvers/index.ts ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! lodash/merge */ "lodash/merge");
/* harmony import */ var lodash_merge__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash_merge__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _courseQuery__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./courseQuery */ "./src/resolvers/courseQuery.ts");
/* harmony import */ var _userQuery__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./userQuery */ "./src/resolvers/userQuery.ts");
/* harmony import */ var _studentQuery__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./studentQuery */ "./src/resolvers/studentQuery.ts");




const PureObj = Object.create(null);
/* harmony default export */ __webpack_exports__["default"] = (lodash_merge__WEBPACK_IMPORTED_MODULE_0___default()(PureObj, _userQuery__WEBPACK_IMPORTED_MODULE_2__["default"], _courseQuery__WEBPACK_IMPORTED_MODULE_1__["default"], _studentQuery__WEBPACK_IMPORTED_MODULE_3__["default"]));

/***/ }),

/***/ "./src/resolvers/studentQuery.ts":
/*!***************************************!*\
  !*** ./src/resolvers/studentQuery.ts ***!
  \***************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _types_Table__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../types/Table */ "./src/types/Table.ts");
/* harmony import */ var _service_MongoDBGraphQL__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../service/MongoDBGraphQL */ "./src/service/MongoDBGraphQL.ts");


/* harmony default export */ __webpack_exports__["default"] = ({
  Query: {
    student: () => Object(_service_MongoDBGraphQL__WEBPACK_IMPORTED_MODULE_1__["dbAggregate"])(_types_Table__WEBPACK_IMPORTED_MODULE_0__["Table"].Student, "_id", "Class", "studentId", "courses")
  },
  Student: {
    courses: parent => getCourses(parent)
  }
}); //help function

const getCourses = async parent => {
  const allCourse = [];

  if (parent.courses) {
    for (const c of parent.courses) {
      const course = await Object(_service_MongoDBGraphQL__WEBPACK_IMPORTED_MODULE_1__["dbQuery"])(_types_Table__WEBPACK_IMPORTED_MODULE_0__["Table"].Course, {
        _id: c === null || c === void 0 ? void 0 : c.courseId
      }); //console.log(course)

      allCourse.push(course[0]);
    }
  }

  return allCourse;
};

/***/ }),

/***/ "./src/resolvers/userQuery.ts":
/*!************************************!*\
  !*** ./src/resolvers/userQuery.ts ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _service_MongoDbService__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../service/MongoDbService */ "./src/service/MongoDbService.ts");
/* harmony import */ var _types_Table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types/Table */ "./src/types/Table.ts");
/* harmony import */ var _service_MongoDBGraphQL__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../service/MongoDBGraphQL */ "./src/service/MongoDBGraphQL.ts");
/* harmony import */ var _jwt_jwt_tools__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../jwt/jwt-tools */ "./src/jwt/jwt-tools.ts");




/* harmony default export */ __webpack_exports__["default"] = ({
  Query: {
    users: () => Object(_service_MongoDbService__WEBPACK_IMPORTED_MODULE_0__["dbServiceGet"])(_types_Table__WEBPACK_IMPORTED_MODULE_1__["Table"].User, {}, 0),
    auth: async (parent, {
      userName,
      userPassword
    }) => {
      const result = await Object(_service_MongoDBGraphQL__WEBPACK_IMPORTED_MODULE_2__["dbAuth"])({
        userName,
        userPassword
      });

      if (result) {
        const token = Object(_jwt_jwt_tools__WEBPACK_IMPORTED_MODULE_3__["jwtSign"])({
          userName,
          userPassword
        });
        return {
          user: result,
          token: token
        };
      }

      return result;
    }
  }
});

/***/ }),

/***/ "./src/schema.graphql":
/*!****************************!*\
  !*** ./src/schema.graphql ***!
  \****************************/
/*! no static exports found */
/***/ (function(module, exports) {


    var doc = {"kind":"Document","definitions":[{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Query"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"users"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"User"}}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"auth"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"userName"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"InputValueDefinition","name":{"kind":"Name","value":"userPassword"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]}],"type":{"kind":"NamedType","name":{"kind":"Name","value":"AuthResult"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"course"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"teacher"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Teacher"}}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"student"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Student"}}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"AuthResult"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"user"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"User"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"token"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"User"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"_id"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"userName"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"userEmail"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"userPassword"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"userRole"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Course"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"_id"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"courseId"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"courseName"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"information"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"students"},"arguments":[{"kind":"InputValueDefinition","name":{"kind":"Name","value":"gender"},"type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}},"directives":[]}],"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Student"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"teachers"},"arguments":[],"type":{"kind":"NamedType","name":{"kind":"Name","value":"Teacher"}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Teacher"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"_id"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"courseId"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"name"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"course"},"arguments":[],"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}}},"directives":[]}]},{"kind":"ObjectTypeDefinition","name":{"kind":"Name","value":"Student"},"interfaces":[],"directives":[],"fields":[{"kind":"FieldDefinition","name":{"kind":"Name","value":"_id"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"ID"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"studentName"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"gender"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"phone"},"arguments":[],"type":{"kind":"NonNullType","type":{"kind":"NamedType","name":{"kind":"Name","value":"String"}}},"directives":[]},{"kind":"FieldDefinition","name":{"kind":"Name","value":"courses"},"arguments":[],"type":{"kind":"ListType","type":{"kind":"NamedType","name":{"kind":"Name","value":"Course"}}},"directives":[]}]}],"loc":{"start":0,"end":738}};
    doc.loc.source = {"body":"type Query {\r\n    users: [User]!\r\n    auth(userName: String,userPassword: String): AuthResult\r\n    course:[Course]!\r\n    teacher:[Teacher]!\r\n    student:[Student]!\r\n}\r\ntype AuthResult{\r\n    user: User\r\n    token: String\r\n}\r\ntype User {\r\n    _id: ID!\r\n    userName: String\r\n    userEmail: String\r\n    userPassword: String\r\n    userRole: String\r\n}\r\n\r\ntype Course {\r\n    _id: ID!\r\n    courseId: String!\r\n    courseName: String\r\n    information: String\r\n    students(gender: String): [Student]\r\n    teachers:Teacher\r\n}\r\n\r\ntype Teacher {\r\n    _id: ID!\r\n    courseId: String!\r\n    name: String!\r\n    course: [Course]\r\n}\r\n\r\ntype Student {\r\n    _id: ID!\r\n    studentName: String!\r\n    gender: String!\r\n    phone: String!\r\n    courses: [Course]\r\n}","name":"GraphQL request","locationOffset":{"line":1,"column":1}};
  

    var names = {};
    function unique(defs) {
      return defs.filter(
        function(def) {
          if (def.kind !== 'FragmentDefinition') return true;
          var name = def.name.value
          if (names[name]) {
            return false;
          } else {
            names[name] = true;
            return true;
          }
        }
      )
    }
  

      module.exports = doc;
    


/***/ }),

/***/ "./src/schema.ts":
/*!***********************!*\
  !*** ./src/schema.ts ***!
  \***********************/
/*! exports provided: schemaString */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "schemaString", function() { return schemaString; });
const schemaString = `
type Query {
    users: [User]!
    auth(userName: String,userPassword: String): AuthResult
    course:[Course]!
    teacher:[Teacher]!
    student:[Student]!
}

type AuthResult{
    user: User
    token: String
}
type User {
    _id: ID!
    userName: String
    userEmail: String
    userPassword: String
    userRole: String
}

type Course {
    _id: ID!
    courseId: String!
    courseName: String
    information: String
    students(gender: String): [Student]
    teachers:Teacher
}

type Teacher {
    _id: ID!
    courseId: String!
    name: String!
    course: [Course]
}

type Student {
    _id: ID!
    studentName: String!
    gender: String!
    phone: String!
    courses: [Course]
}
`;

/***/ }),

/***/ "./src/service/MongoDBGraphQL.ts":
/*!***************************************!*\
  !*** ./src/service/MongoDBGraphQL.ts ***!
  \***************************************/
/*! exports provided: dbData, dbAuth, dbQuery, dbAggregate */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dbData", function() { return dbData; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dbAuth", function() { return dbAuth; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dbQuery", function() { return dbQuery; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dbAggregate", function() { return dbAggregate; });
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongodb */ "mongodb");
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _types_Table__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../types/Table */ "./src/types/Table.ts");


const dbConnectionUrl = "mongodb+srv://leilu0229:AAaa123581321@cluster0.vm8df.mongodb.net/ServerlessCourse?retryWrites=true&w=majority"; //1. initial function return promise
//2. map

const dbObject = async dbCollectionName => {
  const dbInstance = await mongodb__WEBPACK_IMPORTED_MODULE_0__["MongoClient"].connect(dbConnectionUrl);
  const dbObject = dbInstance.db("ServerlessCourse");
  const dbCollection = dbObject.collection(dbCollectionName);
  return dbCollection;
};

const dbData = async tableName => {
  const result = await dbObject(tableName);
  return result.find().toArray();
};

const dbAuth = async data => {
  const result = await dbObject(_types_Table__WEBPACK_IMPORTED_MODULE_1__["Table"].User);
  return result.findOne({
    userEmail: data.userName,
    userPassword: data.userPassword
  });
};

const dbQuery = async (tableName, searchKey) => {
  const result = await dbObject(tableName);
  return result.find(searchKey).toArray();
};

const dbAggregate = async (tableName, localValue, lookupTable, lookupAttribute, asValue) => {
  const collection = await dbObject(tableName);
  return collection.aggregate([{
    $lookup: {
      from: lookupTable,
      localField: localValue,
      foreignField: lookupAttribute,
      as: asValue
    }
  }]).toArray();
};



/***/ }),

/***/ "./src/service/MongoDbService.ts":
/*!***************************************!*\
  !*** ./src/service/MongoDbService.ts ***!
  \***************************************/
/*! exports provided: dbServiceGet, dbServiceInsert, dbServiceUpdate, dbServiceDelete, dbServiceLookup, dbServiceGetOne */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dbServiceGet", function() { return dbServiceGet; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dbServiceInsert", function() { return dbServiceInsert; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dbServiceUpdate", function() { return dbServiceUpdate; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dbServiceDelete", function() { return dbServiceDelete; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dbServiceLookup", function() { return dbServiceLookup; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "dbServiceGetOne", function() { return dbServiceGetOne; });
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! mongodb */ "mongodb");
/* harmony import */ var mongodb__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(mongodb__WEBPACK_IMPORTED_MODULE_0__);

const dbConnectionUrl = "mongodb+srv://leilu0229:AAaa123581321@cluster0.vm8df.mongodb.net/ServerlessCourse?retryWrites=true&w=majority"; //1. initial function return promise
//2. map

const dbObject = async dbCollectionName => {
  const dbInstance = await mongodb__WEBPACK_IMPORTED_MODULE_0__["MongoClient"].connect(dbConnectionUrl);
  const dbObject = dbInstance.db("ServerlessCourse");
  const dbCollection = dbObject.collection(dbCollectionName);
  return dbCollection;
}; //query


const dbServiceGet = async (tableName, searchKey, page) => {
  const result = await dbObject(tableName);
  return result.find(searchKey).sort({
    _id: 1
  }).skip(page * 1).limit(10).toArray();
}; //queryOne


const dbServiceGetOne = async (tableName, data, page) => {
  const result = await dbObject(tableName);
  return result.findOne({
    UserEmail: data.userName,
    UserPassword: data.userPassword
  });
};

const dbServiceInsert = async (tableName, value) => {
  const result = await dbObject(tableName);
  return result.insertOne(value);
};

const dbServiceUpdate = async (tableName, value1, value2) => {
  const result = await dbObject(tableName);
  return result.updateOne(value1, value2);
};

const dbServiceDelete = async (tableName, value1) => {
  const result = await dbObject(tableName);
  return result.deleteOne(value1);
};

const dbServiceLookup = async (tableName, localValue, lookupTable, lookupAttribute, asValue) => {
  const collection = await dbObject(tableName);
  return collection.aggregate([{
    $lookup: {
      from: lookupTable,
      localField: localValue,
      foreignField: lookupAttribute,
      as: asValue
    }
  }]).toArray();
};



/***/ }),

/***/ "./src/types/Table.ts":
/*!****************************!*\
  !*** ./src/types/Table.ts ***!
  \****************************/
/*! exports provided: Table */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Table", function() { return Table; });
let Table;

(function (Table) {
  Table["User"] = "Users";
  Table["Course"] = "Course";
  Table["Student"] = "Student";
  Table["Class"] = "Class";
  Table["Teacher"] = "Teacher";
})(Table || (Table = {}));

/***/ }),

/***/ 0:
/*!***********************!*\
  !*** multi graphpack ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! graphpack */"./node_modules/graphpack/lib/server.js");


/***/ }),

/***/ "apollo-server":
/*!********************************!*\
  !*** external "apollo-server" ***!
  \********************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-server");

/***/ }),

/***/ "apollo-server-express":
/*!****************************************!*\
  !*** external "apollo-server-express" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("apollo-server-express");

/***/ }),

/***/ "babel-loader":
/*!*******************************!*\
  !*** external "babel-loader" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-loader");

/***/ }),

/***/ "babel-preset-graphpack":
/*!*****************************************!*\
  !*** external "babel-preset-graphpack" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("babel-preset-graphpack");

/***/ }),

/***/ "cosmiconfig":
/*!******************************!*\
  !*** external "cosmiconfig" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("cosmiconfig");

/***/ }),

/***/ "dataloader":
/*!*****************************!*\
  !*** external "dataloader" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("dataloader");

/***/ }),

/***/ "friendly-errors-webpack-plugin":
/*!*************************************************!*\
  !*** external "friendly-errors-webpack-plugin" ***!
  \*************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("friendly-errors-webpack-plugin");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("fs");

/***/ }),

/***/ "jsonwebtoken":
/*!*******************************!*\
  !*** external "jsonwebtoken" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("jsonwebtoken");

/***/ }),

/***/ "lodash/merge":
/*!*******************************!*\
  !*** external "lodash/merge" ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("lodash/merge");

/***/ }),

/***/ "mongodb":
/*!**************************!*\
  !*** external "mongodb" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("mongodb");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("path");

/***/ }),

/***/ "webpack":
/*!**************************!*\
  !*** external "webpack" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("webpack");

/***/ }),

/***/ "webpack-node-externals":
/*!*****************************************!*\
  !*** external "webpack-node-externals" ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = require("webpack-node-externals");

/***/ })

/******/ });
//# sourceMappingURL=index.map