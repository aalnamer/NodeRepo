process.env.NODE_ENV = "test";
const request = require("supertest");

const app = require("../app");
let items = require("../fakeDb");

let popsicles = { name: "popsicles", price: "1.50" };

beforeEach(() => {
  items.push(popsicles);
});

afterEach(() => {
  items.length = 0;
});

describe("GET /items", () => {
  test("Get all items", async () => {
    const res = await request(app).get("/items");
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ items: [popsicles] });
  });
});

describe("GET /items/:name", () => {
  test("Get item by name ", async () => {
    const res = await request(app).get(`/items/${popsicles.name}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ item: popsicles });
  });
  test("Responds with 404 for invalid item", async () => {
    const res = await request(app).get(`/items/icecube`);
    expect(res.statusCode).toBe(404);
  });
});

describe("/POST /items", () => {
  test("Post an item", async () => {
    const res = await request(app)
      .post("/items")
      .send({ name: "icecube", price: 1.5 });
    expect(res.statusCode).toBe(201);
    expect(res.body).toEqual({ item: { name: "icecube", price: 1.5 } });
  });
  test("Responds with 400 for missing name", async () => {
    const res = await request(app).get(`/items/milk`);
    expect(res.statusCode).toBe(404);
  });
});

describe("/PATCH /items/:name", () => {
  test("Updating item name", async () => {
    const res = await request(app)
      .patch(`/items/${popsicles.name}`)
      .send({ name: "icecubes", price: 2.0 });
    expect(res.statusCode).toBe(200);
    expect(res.body).toEqual({ item: { name: "icecubes", price: 2.0 } });
  });
  test("Responds with 404 for invalid name", async () => {
    const res = await request(app)
      .patch("/items/milk")
      .send({ name: "icecubes" });
    expect(res.statusCode).toBe(404);
  });
});
