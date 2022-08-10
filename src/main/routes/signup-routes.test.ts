import request from "supertest";
import { MongoHelper } from "../../infra/db/mongodb/helpers/mongo-helper";
import app from "../config/app";

describe("SignUp Routes", () => {
  beforeAll(async () => {
    await MongoHelper.connect(global.__MONGO_URI__);
  });

  afterAll(async () => {
    await MongoHelper.disconnect();
  });

  beforeEach(async () => {
    const accountCollenction = MongoHelper.getCollection("accounts");
    accountCollenction.deleteMany({});
  });

  test("Should return an account on sucess", async () => {
    await request(app)
      .post("/api/signup")
      .send({
        name: "Daniel",
        email: "daniel.junior.ifpb@gmailcom",
        password: "123",
        passwordConfirmation: "123",
      })
      .expect(200);
  });
});
