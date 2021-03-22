import { Handler } from "aws-lambda";
import {
  deleteStudent,
  insertStudent,
  queryStudents,
  updateStudent,
} from "../controller/StudentController";
import { Student } from "../types/Student";
import {
  generateReturnBody,
  getResult,
  returnBody,
} from "../helpFunctions/generateReturnBody";

const studentInsert: Handler = async (event, context) => {
  const { student } = JSON.parse(event.body) || {};
  return getResult<Student>(student, insertStudent);
};

const studentDelete: Handler = async (event, context) => {
  const { student } = JSON.parse(event.body) || {};
  return getResult<Student>(student, deleteStudent);
};

const studentUpdate: Handler = async (event, context) => {
  const { student } = JSON.parse(event.body) || {};
  return getResult<Student>(student, updateStudent);
};

const studentQuery: Handler = async (event, context) => {
  let apiResult: returnBody = generateReturnBody(0, "");
  try {
    const { page, pageSize } = event.queryStringParameters;
    const r = await queryStudents({}, parseInt(page), parseInt(pageSize));
    apiResult = generateReturnBody(200, JSON.stringify(r));
  } catch (error) {
    apiResult = generateReturnBody(400, JSON.stringify(error.toString()));
  }
  return apiResult;
};

export { studentInsert, studentQuery, studentDelete, studentUpdate };
