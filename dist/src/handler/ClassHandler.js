"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.classDelete = exports.classInsert = void 0;
const generateReturnBody_1 = require("../helpFunctions/generateReturnBody");
const ClassController_1 = require("../controller/ClassController");
const classInsert = async (event, context) => {
    const { courseClass } = JSON.parse(event.body) || {};
    return generateReturnBody_1.getResult(courseClass, ClassController_1.insertClass);
};
exports.classInsert = classInsert;
const classDelete = async (event, context) => {
    const { courseId, studentId } = JSON.parse(event.body) || {};
    return generateReturnBody_1.getResult({
        courseId: courseId,
        studentId: studentId
    }, ClassController_1.deleteClass);
};
exports.classDelete = classDelete;
