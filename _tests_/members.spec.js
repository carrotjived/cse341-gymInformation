const app = require('../server');
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(app);
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();


describe("Members Tests", () => {
    /// DATABASE CONNECTION ///
    let connection;
    let database;

    beforeEach(() => jest.resetAllMocks()); 
  
    beforeAll(async () => {
        process.env.TESTING = "TRUE";
        if (!database) {
          connection = await MongoClient.connect(process.env.MONGODB_URL);
          database = await connection.db("members");
        }
      });

    /// GET REQUESTS ///
    it('gets all members', async () => {
        const res = await request.get('/members');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
    });


    it('gets a single member', async () => {
        const res = await request.get('/members/6712b6ca99cb9a4a47160151');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
    });
})