const server = require("./server.js"); // <<<<<<<<<< import server

server.listen(9999, () => {
  console.log("\n*** Server Running on http://localhost:9999 ***\n");
});
