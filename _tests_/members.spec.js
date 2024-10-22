const app = require('../server');
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(app);
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();


describe('Members Tests', () => {

    /// DATABASE CONNECTION ///
    let connection;
    let database;

    beforeAll(async () => {
        process.env.TESTING = "TRUE";
        if (!database) {
            connection = await MongoClient.connect(process.env.MONGODB_URL)
            .then((client) => {
                database = client;
            })
        }
    });
    
    // This function only needs to be on the last file in the _tests_ folder, 
    // as it will close the database connection before all of the tests are completed otherwise
    afterAll(async() => {
        await database.close();
        process.env.TESTING = "FALSE";
    })


    /// GET REQUESTS ///
    test('gets all members', async () => {
        const res = await request.get('/members');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
    })


    test('gets a single member', async () => {
        const res = await request.get('/members/6712b6ca99cb9a4a47160151');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
    })
})