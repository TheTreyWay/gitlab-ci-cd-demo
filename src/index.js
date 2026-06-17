import http from "node:http";
import { handleRequest } from "./app.js";

const port = process.env.PORT || 3000;

const host = process.env.HOST || "0.0.0.0";
const server = http.createServer(handleRequest);

server.listen(port, host, () => {
  console.log(`Server running on ${host}:${port}`);
});
