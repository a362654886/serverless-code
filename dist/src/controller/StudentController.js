"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryStudents = exports.deleteStudent = exports.updateStudent = exports.insertStudent = exports.getStudentWithCourses = void 0;
const Table_1 = require("../types/Table");
const MongoDbService_1 = require("../service/MongoDbService");
const getStudentWithCourses = async () => await MongoDbService_1.dbServiceLookup("Student", "_id", "Class", "StudentId", "Courses");
exports.getStudentWithCourses = getStudentWithCourses;
const insertStudent = async (student) => {
    const aStudent = {
        _id: student.phone,
        studentName: student.studentName,
        gender: student.gender,
        phone: student.phone,
    };
    return MongoDbService_1.dbServiceInsert(Table_1.Table.Student, aStudent);
};
exports.insertStudent = insertStudent;
const updateStudent = async (student) => {
    const value1 = { Phone: student.phone };
    const value2 = {
        $set: {
            StudentName: student.studentName,
            Gender: student.gender,
            Phone: student.phone,
        },
    };
    return MongoDbService_1.dbServiceUpdate(Table_1.Table.Student, value1, value2);
};
exports.updateStudent = updateStudent;
const deleteStudent = async (student) => {
    const value1 = { Phone: student.phone };
    return MongoDbService_1.dbServiceDelete(Table_1.Table.Student, value1);
};
exports.deleteStudent = deleteStudent;
const queryValue = (values) => {
    return {
    //Gender: values.Gender
    };
};
const queryStudents = async (values, page, pageSize) => MongoDbService_1.dbServiceGet(Table_1.Table.Student, values, page, pageSize);
exports.queryStudents = queryStudents;
