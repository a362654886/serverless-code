"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = require("../src/controller/UserController");
const DbService_1 = require("../src/service/DbService");
const User = {
    UserEmail: "leilu0229@outlook.com",
    UserPassword: "111222",
    UserName: "Lei Lu",
    UserRole: "Student",
};
describe("test User functions", () => {
    //beforEach
    test("test auth right", async () => {
        //insert data
        await DbService_1.dbServiceInsert("Users", User);
        const result = await UserController_1.authUser("leilu0229@outlook.com", "111222");
        expect(result).toEqual(User);
    });
    test("test auth wrong", async () => {
        //insert data
        await DbService_1.dbServiceInsert("Users", User);
        const result = await UserController_1.authUser("leilu0229@outlook.com", "111223");
        expect(result).toEqual(null);
    });
});
