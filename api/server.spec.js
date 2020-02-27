const request = require("supertest");
const bcrypt = require("bcryptjs");
const server = require("./server.js");
const db = require("../database/dbConfig");

// beforeEach(async () => {
//   db("users")
//     .truncate()
//     .then(() =>
//       db("users").insert({
//         username: "test1",
//         password: bcrypt.hashSync("test1", 12)
//       })
//     );
// });

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
      it("should retrieve list successfully", async () => {
        const expectedStatusCode = 201;
        const user = await request(server)
          .get("/api/users/login")
          .send({ username: "admin", password: "password" });
        const response = await request(server).get("/api/todos/");

        expect(response.status).toEqual(expectedStatusCode);
      });
    }),
    describe("users route", () => {
      it("should login successfully with test1 user", async () => {
        const expectedStatusCode = 201;
        const response = await request(server)
          .post("/api/users/login")
          .send({ username: "test1", password: "test1" });

        expect(response.status).toEqual(expectedStatusCode);
      });
      it("should login and show session", async () => {
        const expectedSessionUser = "admin";
        const response = await request(server)
          .post("/api/users/login")
          .send({ username: "admin", password: "password" });

        expect().toEqual(expectedSessionUser);
      });
      it("should fail to login with error message", async () => {
        const expectedBody = { message: "Invalid Credentials" };
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
