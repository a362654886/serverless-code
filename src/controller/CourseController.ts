import {
  DeleteWriteOpResultObject,
  InsertOneWriteOpResult,
  UpdateWriteOpResult,
} from "mongodb";
import { Course} from "../types/Course";
import { Table } from "../types/Table";
import {
  dbServiceGet,
  dbServiceInsert,
  dbServiceUpdate,
  dbServiceDelete,
  dbServiceLookup,
} from "../service/MongoDbService";

export const courseQuery = async () =>
  await dbServiceLookup(Table.Course, "_id", "Class", "courseId", "students");

export const getCourse = async (courseName: string): Promise<Course | undefined> =>{
  const courses: Course[] = await dbServiceLookup(Table.Course, "_id", "Class", "courseId", "students");
  const course:Course| undefined =  courses.find(element => element.courseName == courseName);
  return course;
}

export const insertCourse = async (
  value: Course
): Promise<InsertOneWriteOpResult<any>> => {
  const aUser= {
    _id: "2020" + value.courseName,
    courseName: value.courseName,
    information: value.courseName,
  };
  return dbServiceInsert<Course>(Table.Course, value);
};

export const updateCourse = async (
  value: Course
): Promise<UpdateWriteOpResult> => {
  const value1: object = { CourseName: value.courseName };
  const value2: object = {
    $set: {
      courseName: value.courseName,
      information: value.information,
    },
  };
  return dbServiceUpdate<Course>(Table.Course, value1, value2);
};

export const deleteCourse = async (
  value: Course
): Promise<DeleteWriteOpResultObject | null> => {
  const value1: object = { CourseName: value.courseName };
  return dbServiceDelete(Table.Course, value1);
};
