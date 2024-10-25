const app = require("../server");
const supertest = require("supertest");
const { expect, afterAll, beforeEach } = require("@jest/globals");
const request = supertest(app);
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

describe("Employees Tests", () => {
  /// DATABASE CONNECTION ///
  let connection;
  let database;

  beforeEach(() => jest.resetAllMocks()); 

  beforeAll(async () => {
    process.env.TESTING = "TRUE";
    if (!database) {
      connection = await MongoClient.connect(process.env.MONGODB_URL);
      database = await connection.db("employees");
    }
  });

  /// GET REQUESTS ///
  it("gets all employees", async () => {
    const res = await request.get("/employees");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
  });

  it("gets a single employee", async () => {
    const res = await request.get("/employees/6712b85199cb9a4a47160154");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
  });
});
