import { Handler } from "aws-lambda";
import {
  deleteCourse,
  courseQuery,
  insertCourse,
  updateCourse,
  getCourse,
} from "../controller/CourseController";
import { Course } from "../types/Course";
import {
  generateReturnBody,
  getResult,
  returnBody,
} from "../helpFunctions/generateReturnBody";

const courseGet: Handler = async (event, context) => {
  //const token = jwtSign({ UserEmail, UserPassword });
  const result = await courseQuery();
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify(result),
  };
};

const courseInsert: Handler = async (event, context) => {
  const { course } = JSON.parse(event.body) || {};
  return getResult<Course>(course, insertCourse);
};

const courseUpdate: Handler = async (event, context) => {
  const { course } = JSON.parse(event.body) || {};
  return getResult<Course>(course, updateCourse);
};

const courseGetOne: Handler = async (event, context) => {
  let apiResult: returnBody = generateReturnBody(0, "");
  try {
    const { courseName } = event.queryStringParameters;
    const r = await getCourse(courseName);
    apiResult = generateReturnBody(200, JSON.stringify(r));
  } catch (error) {
    apiResult = generateReturnBody(400, JSON.stringify(error.toString()));
  }
  return apiResult;
};

const courseDelete: Handler = async (event, context) => {
  const { course } = JSON.parse(event.body) || {};
  return getResult<Course>(course, deleteCourse);
};

export { courseGet, courseInsert, courseUpdate, courseDelete, courseGetOne };
