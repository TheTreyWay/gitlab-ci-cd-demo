import http from "node:http";
import { handleRequest } from "./app.js";

const port = process.env.PORT || 3000;

const server = http.createServer(handleRequest);

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
