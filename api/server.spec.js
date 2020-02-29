const request = require("supertest");

const sinon = require("sinon");
const db = require("../db/knex");
const auth = require("../auth/auth_middleware");

const adminOnlyStub = sinon.stub(auth, "adminOnly");

const server = require("./server.js");

afterAll(async () => {
  await db.destroy();
});

describe("server.js", () => {
  describe("index route", () => {
    it("should set testing env", () => {
      expect(process.env.NODE_ENV).toBe("testing");
    });

    it("should return an OK status code from the index route", async () => {
      const expectedStatusCode = 200;

      const response = await request(server).get("/");

      expect(response.status).toEqual(expectedStatusCode);
    });

    it("should return a JSON object from the index route", async () => {
      const expectedBody = { api: "API running" };

      const response = await request(server).get("/");

      expect(response.body).toEqual(expectedBody);
    });

    it("should return a JSON object from the index route", async () => {
      const response = await request(server).get("/");

      expect(response.type).toEqual("application/json");
    });
  }),
    describe("todos route", () => {
      beforeEach(async () => {
        await db.seed.run();
      });
      it("should retrieve list successfully with bypass of middleware", async () => {
        const expectedStatusCode = 200;
        adminOnlyStub.callsFake((req, res, next) => next());
        const response = await request(server).get("/api/todos/");
        expect(response.status).toEqual(expectedStatusCode);
      });
      // it("should create new todos item", async () => {
      //   const expectedBodyTitle = "spongebob";
      //   const response = await request(server)
      //     .post("/api/todos/")
      //     .send({ title: "spongebob", user_id: 0 });

      //   expect(response.body[0].title).toEqual(expectedBodyTitle);
      // });
    }),
    describe("users route", () => {
      beforeEach(async () => {
        await db.seed.run();
      });
      it("should login successfully with test1 user", async () => {
        db.raw("SET foreign_key_checks = 0");
        db.seed.run();
        const expectedStatusCode = 200;
        const response = await request(server)
          .post("/api/users/login")
          .send({ username: "test1", password: "test1" });

        expect(response.status).toEqual(expectedStatusCode);
      });
      it("should fail to login with error message", async () => {
        const expectedBody = {
          message: "Invalid Credentials",
          isLoggedIn: false
        };
        const response = await request(server)
          .post("/api/users/login")
          .send({ username: "wrongUsername", password: "wrongPassword" });

        expect(response.body).toEqual(expectedBody);
      });
      it("should allow creation of new user test4", async () => {
        const expectedStatusCode = 201;

        const response = await request(server)
          .post("/api/users/register")
          .send({ username: "test4", password: "test4" });

        expect(response.status).toEqual(expectedStatusCode);
      });
      it("should fail creation of new user (missing password)", async () => {
        const expectedBody = {
          message: "username and password fields required"
        };
        const response = await request(server)
          .post("/api/users/register")
          .send({ username: "noPassword" });

        expect(response.body).toEqual(expectedBody);
      });
    });
});
