import { Handler } from "aws-lambda";
import { getResult } from "../helpFunctions/generateReturnBody";
import { deleteClass, insertClass } from "../controller/ClassController";
import { CourseClass, CourseClassDelete } from "src/types/Class";

const classInsert: Handler = async (event, context) => {
  const { courseClass } = JSON.parse(event.body) || {};
  return getResult<CourseClass>(courseClass, insertClass);
};

const classDelete: Handler = async (event, context) => {
  const { courseId, studentId} = JSON.parse(event.body) || {};
  return getResult<CourseClassDelete>({
    courseId: courseId,
    studentId: studentId
  }, deleteClass);
};

export { classInsert, classDelete };
