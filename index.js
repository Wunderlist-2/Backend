const { port } = require("./config");

const server = require("./api/server.js");

server.listen(port, () => {
  console.log(`\n=== Server listening on port ${port} ===\n`);
});
