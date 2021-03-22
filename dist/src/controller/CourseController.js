"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteCourse = exports.updateCourse = exports.insertCourse = exports.getCourse = exports.courseQuery = void 0;
const Table_1 = require("../types/Table");
const MongoDbService_1 = require("../service/MongoDbService");
const courseQuery = async () => await MongoDbService_1.dbServiceLookup(Table_1.Table.Course, "_id", "Class", "courseId", "students");
exports.courseQuery = courseQuery;
const getCourse = async (courseName) => {
    const courses = await MongoDbService_1.dbServiceLookup(Table_1.Table.Course, "_id", "Class", "courseId", "students");
    const course = courses.find(element => element.courseName == courseName);
    return course;
};
exports.getCourse = getCourse;
const insertCourse = async (value) => {
    const aUser = {
        _id: "2020" + value.courseName,
        courseName: value.courseName,
        information: value.courseName,
    };
    return MongoDbService_1.dbServiceInsert(Table_1.Table.Course, value);
};
exports.insertCourse = insertCourse;
const updateCourse = async (value) => {
    const value1 = { CourseName: value.courseName };
    const value2 = {
        $set: {
            courseName: value.courseName,
            information: value.information,
        },
    };
    return MongoDbService_1.dbServiceUpdate(Table_1.Table.Course, value1, value2);
};
exports.updateCourse = updateCourse;
const deleteCourse = async (value) => {
    const value1 = { CourseName: value.courseName };
    return MongoDbService_1.dbServiceDelete(Table_1.Table.Course, value1);
};
exports.deleteCourse = deleteCourse;
