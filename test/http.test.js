import http from "node:http";
import test from "node:test";
import assert from "node:assert/strict";
import { handleRequest } from "../src/app.js";

function request(server, path) {
  const { port } = server.address();

  return new Promise((resolve, reject) => {
    const req = http.get({ hostname: "127.0.0.1", port, path }, (res) => {
      let body = "";

      res.setEncoding("utf8");
      res.on("data", (chunk) => {
        body += chunk;
      });
      res.on("end", () => {
        resolve({
          statusCode: res.statusCode,
          headers: res.headers,
          body: JSON.parse(body)
        });
      });
    });

    req.on("error", reject);
  });
}

async function withServer(fn) {
  const server = http.createServer(handleRequest);

  await new Promise((resolve) => {
    server.listen(0, "127.0.0.1", resolve);
  });

  try {
    await fn(server);
  } finally {
    await new Promise((resolve, reject) => {
      server.close((error) => {
        if (error) {
          reject(error);
          return;
        }

        resolve();
      });
    });
  }
}

test("GET /health returns healthy status", async () => {
  await withServer(async (server) => {
    const response = await request(server, "/health");

    assert.equal(response.statusCode, 200);
    assert.equal(response.headers["content-type"], "application/json");
    assert.deepEqual(response.body, { status: "healthy" });
  });
});

test("GET /ready returns ready status", async () => {
  await withServer(async (server) => {
    const response = await request(server, "/ready");

    assert.equal(response.statusCode, 200);
    assert.equal(response.headers["content-type"], "application/json");
    assert.deepEqual(response.body, { status: "ready" });
  });
});

test("GET / returns application status", async () => {
  await withServer(async (server) => {
    const response = await request(server, "/");

    assert.equal(response.statusCode, 200);
    assert.equal(response.headers["content-type"], "application/json");
    assert.deepEqual(response.body, {
      app: "ci-cd-test-project",
      status: "running"
    });
  });
});
