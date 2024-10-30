const request = require('supertest');
const app = require('../../server');
const { User, Cookbook } = require("../../models")
require("dotenv").config()

const sequelize = require('../../config/connection');
const payload = {
    firstName:"Foo",
    lastName: "Bar",
    username: "fooBar",
    password: "securePassword",
    email: "foobar@gmail.com"
}

const payloadDupEmail = {
    firstName:"Figgy",
    lastName: "Newton",
    username: "fewton",
    password: "securePassword",
    email: "foobar@gmail.com"
}

const payloadDupUsername = {
    firstName:"Fib",
    lastName: "Bar",
    username: "fooBar",
    password: "securePassword",
    email: "fibbar@gmail.com"
}

beforeAll(async () => {
    // Sync database and clear test data before each test suite
    await sequelize.sync({ force: true });
});

afterAll(async () => {
    // Close the database connection after all tests
    await sequelize.close();
});

describe("User Endpoints", () => {
    it("should create new user and cookbook", async() => {
        const expectedUserCount = await User.count() + 1;
        const expectedCookbookCount = await Cookbook.count() + 1;

        const res = await request(app)
        .post('/api/user/signup')
        .send(payload)

        expect(res.statusCode).toEqual(200);

        expect(await User.count()).toEqual(expectedUserCount);
        expect(await Cookbook.count()).toEqual(expectedCookbookCount);
        return;
    });

    it("should not create a duplicate record with the same email", async() => {
        const expectedUserCount = await User.count();
        
        const res = await request(app)
        .post('/api/user/signup')
        .send(payloadDupEmail)

        expect(res.statusCode).toEqual(409);
        expect(await User.count()).toEqual(expectedUserCount);
    });

    it("should not create a duplicate record with the same username", async() => {
        const expectedUserCount = await User.count();
        
        const res = await request(app)
        .post('/api/user/signup')
        .send(payloadDupUsername)

        expect(res.statusCode).toEqual(409);
        expect(await User.count()).toEqual(expectedUserCount);
    })
})