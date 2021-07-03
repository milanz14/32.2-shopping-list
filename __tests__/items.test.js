// JEST Testing for API Backend routes
process.env.NODE_ENV = "test";

const request = require("supertest");

const { app } = require("../app");
let items = require("../fakeDB");

let snickers = { name: "Snickers", price: 5.45 };

beforeEach(() => {
    items.push(snickers);
});

afterEach(() => {
    items.length = 0;
});

describe("GET /items", () => {
    test("gets a list of all items", async () => {
        const resp = await request(app).get("/items");
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({ items: [snickers] });
    });
});

describe("POST /items", () => {
    test("posts snickers to items array", async () => {
        const resp = await request(app).post("/items").send({
            name: "Ice cream",
            price: 10,
        });
        expect(resp.statusCode).toBe(201);
        expect(resp.body).toEqual({
            item: { name: "Ice cream", price: 10 },
        });
    });
});

describe("PATCH /items/:name", () => {
    test("updates item in items array", async () => {
        const resp = await request(app).patch(`/items/${snickers.name}`).send({
            name: "candy bar",
            price: 0,
        });
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({
            item: { name: "candy bar", price: 0 },
        });
    });

    test("responds with 404 if ID is invalid", async () => {
        const resp = await request(app).patch(`/items/${0}`);
        expect(resp.statusCode).toBe(404);
    });
});

describe("DELETE /items/:name", () => {
    test("deletes a specific item", async () => {
        const resp = await request(app).delete(`/items/${snickers.name}`);
        expect(resp.statusCode).toBe(200);
        expect(resp.body).toEqual({
            message: "Deleted",
        });
    });
});
