import { authUser, updateUser } from "../src/controller/UserController";
import { dbServiceInsert } from "../src/service/DbService";

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
    await dbServiceInsert("Users", User);

    const result = await authUser("leilu0229@outlook.com", "111222");

    expect(result).toEqual(User);
  });

  test("test auth wrong", async () => {
    //insert data
    await dbServiceInsert("Users", User);

    const result = await authUser("leilu0229@outlook.com", "111223");

    expect(result).toEqual(null);
  });
  
});
