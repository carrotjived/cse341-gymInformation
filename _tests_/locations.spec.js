const app = require("../server");
const supertest = require("supertest");
const { expect, afterAll } = require("@jest/globals");
const request = supertest(app);
const { MongoClient } = require("mongodb");
const dotenv = require("dotenv");
dotenv.config();

describe("Locations Tests", () => {
  /// DATABASE CONNECTION ///
  let connection;
  let database;

  beforeAll(async () => {
    process.env.TESTING = "TRUE";
    if (!database) {
      connection = await MongoClient.connect(process.env.MONGODB_URL).then(
        (client) => {
          database = client;
        }
      );
    }
  });

  /// GET REQUESTS ///
  test("gets all locations", async () => {
    const res = await request.get("/locations");
    console.log(res);
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
  });

  test("gets a single location", async () => {
    const res = await request.get("/locations/671462fb528af7168db36500");
    expect(res.header["content-type"]).toBe("application/json; charset=utf-8");
    expect(res.statusCode).toBe(200);
  });
});
