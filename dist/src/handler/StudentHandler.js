"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.studentUpdate = exports.studentDelete = exports.studentQuery = exports.studentInsert = void 0;
const StudentController_1 = require("../controller/StudentController");
const generateReturnBody_1 = require("../helpFunctions/generateReturnBody");
const studentInsert = async (event, context) => {
    const { student } = JSON.parse(event.body) || {};
    return generateReturnBody_1.getResult(student, StudentController_1.insertStudent);
};
exports.studentInsert = studentInsert;
const studentDelete = async (event, context) => {
    const { student } = JSON.parse(event.body) || {};
    return generateReturnBody_1.getResult(student, StudentController_1.deleteStudent);
};
exports.studentDelete = studentDelete;
const studentUpdate = async (event, context) => {
    const { student } = JSON.parse(event.body) || {};
    return generateReturnBody_1.getResult(student, StudentController_1.updateStudent);
};
exports.studentUpdate = studentUpdate;
const studentQuery = async (event, context) => {
    let apiResult = generateReturnBody_1.generateReturnBody(0, "");
    try {
        const { page, pageSize } = event.queryStringParameters;
        const r = await StudentController_1.queryStudents({}, parseInt(page), parseInt(pageSize));
        apiResult = generateReturnBody_1.generateReturnBody(200, JSON.stringify(r));
    }
    catch (error) {
        apiResult = generateReturnBody_1.generateReturnBody(400, JSON.stringify(error.toString()));
    }
    return apiResult;
};
exports.studentQuery = studentQuery;
