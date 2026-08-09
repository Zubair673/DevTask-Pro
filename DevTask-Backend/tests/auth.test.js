import request from "supertest";
import app from "../server.js";

describe("Auth API Tests", () => {

  // Test 1
  test("GET /api/auth/hello should return success", async () => {
    const response = await request(app).get("/api/auth/hello");

    expect(response.statusCode).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.message).toBe(
      "Auth Route Working Successfully ✅"
    );
  });

  // Test 2
  test("POST /api/auth/login should reject missing fields", async () => {
    const response = await request(app)
      .post("/api/auth/login")
      .send({
        email: "",
        password: "",
      });

    expect(response.statusCode).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe(
      "Email and password are required"
    );
  });

  // TEST 3
test("POST /api/auth/register should reject missing fields", async () => {
  const response = await request(app)
    .post("/api/auth/register")
    .send({
      name: "",
      email: "",
      password: "",
    });

  expect(response.statusCode).toBe(400);
  expect(response.body.success).toBe(false);
  expect(response.body.message).toBe("Name, email and password are required");
});

// TEST 4
test("POST /api/auth/login should reject invalid email format", async () => {
  const response = await request(app)
    .post("/api/auth/login")
    .send({
      email: "invalid-email",
      password: "123456",
    });

  expect(response.statusCode).toBe(400);
  expect(response.body.success).toBe(false);
});

// TEST 5
test("GET invalid auth route should return 404", async () => {
  const response = await request(app)
    .get("/api/auth/invalid-route");

  expect(response.statusCode).toBe(404);
  expect(response.body.success).toBe(false);
  expect(response.body.message).toContain("Route Not Found");
});

// TEST 6

describe("Task API Tests", () => {
  test("GET invalid task route should return 404", async () => {
    const response = await request(app)
      .get("/api/tasks/invalid-route");

    expect(response.statusCode).toBe(404);

    expect(response.body.success).toBe(false);

    expect(response.body.message).toContain("Route Not Found");
  });
});
});