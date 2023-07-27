const request = require("supertest");
const app = require("../../app");
const bcrypt = require("bcrypt");

const User = require("../../service/schemas/users");
const { loginUser } = require("../../controllers/auth/userLoginController");

describe("User Login Controller", () => {
  it("should return status code 200 and a token when valid credentials are provided", async () => {
    const testUser = {
      email: "test@example.com",
      password: "testpassword",
    };
    const hashedPassword = await bcrypt.hash(testUser.password, 10);
    await User.create({ ...testUser, password: hashedPassword });

    const res = await request(app)
      .post("/auth/login")
      .send(testUser)
      .expect(200);

    expect(res.body).toHaveProperty("token");
    expect(res.body.user).toHaveProperty("email");
    expect(res.body.user).toHaveProperty("subscription");
    expect(typeof res.body.user.email).toBe("string");
    expect(typeof res.body.user.subscription).toBe("string");
  }, 10000);

  it("should return status code 401 when invalid credentials are provided", async () => {
    const invalidUser = {
      email: "invalid@example.com",
      password: "invalidpassword",
    };

    const res = await request(app)
      .post("/auth/login")
      .send(invalidUser)
      .expect(401);

    expect(res.body).toHaveProperty("message");
    expect(res.body.message).toBe("Email or password is wrong");
  });
});
