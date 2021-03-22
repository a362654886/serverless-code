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
import { CourseClass, CourseClassDelete } from "../types/Class";

export const insertClass = async (
  value: Omit<CourseClass,"_id">
): Promise<InsertOneWriteOpResult<any>> => {
  const aClass: CourseClass = {
    _id: value.courseId + value.studentId,
    courseId: value.courseId,
    studentId: value.studentId,
    studentName: value.studentName
  };
  return dbServiceInsert<Course>(Table.Class, aClass);
};

export const deleteClass = async (value: Omit<CourseClassDelete,"_id">): Promise<DeleteWriteOpResultObject> =>{
  const value1: object = { _id: value.courseId+ value.studentId};
  return dbServiceDelete<Omit<CourseClassDelete,"_id">>(Table.Class,value1);
}
