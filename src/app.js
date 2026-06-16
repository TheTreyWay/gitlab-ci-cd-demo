export function add(a, b) {
  return a + b;
}

export function handleRequest(req, res) {
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
}
