// importuję http
const http = require('http');

//importuję app
const app = require("./app");

// port
const port = process.env.port || 3000;

//tworzę serwer
const server = http.createServer(app);

// odpalam serwer
server.listen(port);
