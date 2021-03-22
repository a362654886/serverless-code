import {
  DeleteWriteOpResultObject,
  InsertOneWriteOpResult,
  UpdateWriteOpResult,
} from "mongodb";
import { Course } from "../types/Course";
import { Table } from "../types/Table";
import {
  dbServiceGet,
  dbServiceInsert,
  dbServiceUpdate,
  dbServiceDelete,
  dbServiceLookup,
} from "../service/MongoDbService";
import { Student } from "src/types/Student";

export const getStudentWithCourses = async () =>
  await dbServiceLookup("Student", "_id", "Class", "StudentId", "Courses");

export const insertStudent = async (
  student: Student
): Promise<InsertOneWriteOpResult<any>> => {
  const aStudent = {
    _id: student.phone,
    studentName: student.studentName,
    gender: student.gender,
    phone: student.phone,
  };
  return dbServiceInsert<Course>(Table.Student, aStudent);
};

export const updateStudent = async (
  student: Student
): Promise<UpdateWriteOpResult> => {
  const value1: object = { Phone: student.phone };
  const value2: object = {
    $set: {
      StudentName: student.studentName,
      Gender: student.gender,
      Phone: student.phone,
    },
  };
  return dbServiceUpdate<Course>(Table.Student, value1, value2);
};

export const deleteStudent = async (
  student: Student
): Promise<DeleteWriteOpResultObject | null> => {
  const value1: object = { Phone: student.phone };
  return dbServiceDelete(Table.Student, value1);
};

const queryValue = (values: Student) => {
  return {
    //Gender: values.Gender
  };
};

export const queryStudents = async (
  values: object,
  page: number,
  pageSize: number
): Promise<Student[] | null> =>
  dbServiceGet<Student>(Table.Student, values, page, pageSize);
