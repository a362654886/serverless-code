"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.courseGetOne = exports.courseDelete = exports.courseUpdate = exports.courseInsert = exports.courseGet = void 0;
const CourseController_1 = require("../controller/CourseController");
const generateReturnBody_1 = require("../helpFunctions/generateReturnBody");
const courseGet = async (event, context) => {
    //const token = jwtSign({ UserEmail, UserPassword });
    const result = await CourseController_1.courseQuery();
    return {
        statusCode: 200,
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(result),
    };
};
exports.courseGet = courseGet;
const courseInsert = async (event, context) => {
    const { course } = JSON.parse(event.body) || {};
    return generateReturnBody_1.getResult(course, CourseController_1.insertCourse);
};
exports.courseInsert = courseInsert;
const courseUpdate = async (event, context) => {
    const { course } = JSON.parse(event.body) || {};
    return generateReturnBody_1.getResult(course, CourseController_1.updateCourse);
};
exports.courseUpdate = courseUpdate;
const courseGetOne = async (event, context) => {
    let apiResult = generateReturnBody_1.generateReturnBody(0, "");
    try {
        const { courseName } = event.queryStringParameters;
        const r = await CourseController_1.getCourse(courseName);
        apiResult = generateReturnBody_1.generateReturnBody(200, JSON.stringify(r));
    }
    catch (error) {
        apiResult = generateReturnBody_1.generateReturnBody(400, JSON.stringify(error.toString()));
    }
    return apiResult;
};
exports.courseGetOne = courseGetOne;
const courseDelete = async (event, context) => {
    const { course } = JSON.parse(event.body) || {};
    return generateReturnBody_1.getResult(course, CourseController_1.deleteCourse);
};
exports.courseDelete = courseDelete;
