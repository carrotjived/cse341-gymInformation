const app = require('../server');
const supertest = require('supertest');
const { expect } = require('@jest/globals');
const request = supertest(app);
const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');
dotenv.config();


describe('Machines Tests', () => {

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


    /// GET REQUESTS ///
    test('gets all machines', async () => {
        const res = await request.get('/machines');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
    })


    test('gets a single machine', async () => {
        const res = await request.get('/machines/6712b75b99cb9a4a47160152');
        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
    })
})