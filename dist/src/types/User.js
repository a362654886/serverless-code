"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Role = exports.isUser = void 0;
var Role;
(function (Role) {
    Role["STUDENT"] = "Student";
    Role["TEACHER"] = "Teacher";
    Role["ADMIN"] = "Admin";
})(Role || (Role = {}));
exports.Role = Role;
const isUser = (props) => typeof props['userEmail'] !== 'undefined';
exports.isUser = isUser;
