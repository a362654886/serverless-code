"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteClass = exports.insertClass = void 0;
const Table_1 = require("../types/Table");
const MongoDbService_1 = require("../service/MongoDbService");
const insertClass = async (value) => {
    const aClass = {
        _id: value.courseId + value.studentId,
        courseId: value.courseId,
        studentId: value.studentId,
        studentName: value.studentName
    };
    return MongoDbService_1.dbServiceInsert(Table_1.Table.Class, aClass);
};
exports.insertClass = insertClass;
const deleteClass = async (value) => {
    const value1 = { _id: value.courseId + value.studentId };
    return MongoDbService_1.dbServiceDelete(Table_1.Table.Class, value1);
};
exports.deleteClass = deleteClass;
