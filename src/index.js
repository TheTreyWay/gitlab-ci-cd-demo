import http from "node:http";

export function add(a, b) {
  return a + b;
}

const port = process.env.PORT || 3000;

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ status: "healthy" }));
    return;
  }

  res.writeHead(200, { "Content-Type": "application/json" });
  res.end(JSON.stringify({
    app: "ci-cd-test-project",
    status: "running"
  }));
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});