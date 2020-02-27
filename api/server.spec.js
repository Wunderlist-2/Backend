const request = require("supertest");
const bcrypt = require("bcryptjs");

const sinon = require("sinon");
const db = require("../database/dbConfig");
const auth = require("../auth/auth_middleware");

const restrictedUserStub = sinon.stub(auth, "restrictedUser");
const adminOnlyStub = sinon.stub(auth, "adminOnly");

const server = require("./server.js");

describe("server.js", () => {
  describe("index route", () => {
    it("should set testing env", () => {
      expect(process.env.DB_ENV).toBe("testing");
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
      it("should login successfully with test1 user", async () => {
        await db("users").truncate();
        await db("users").insert({
          username: "test1",
          password: bcrypt.hashSync("test1", 12)
        });
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
        // await db("users").truncate();
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
