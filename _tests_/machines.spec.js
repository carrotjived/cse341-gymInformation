const app = require('../server');
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(app);
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
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
          database = await connection.db("machines");
        }
      });

    /// GET REQUESTS ///
    it('gets all machines', async () => {
        const res = await request.get('/machines');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
    })

    it('gets a single machine', async () => {
        const res = await request.get('/machines/6712b75b99cb9a4a47160152');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
    })
})