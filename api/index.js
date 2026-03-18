const jsonServer = require("json-server");
const path = require("path");

const app = jsonServer.create();
const router = jsonServer.router(path.join(process.cwd(), "db.json"));
const middlewares = jsonServer.defaults();

app.use(middlewares);
app.use(jsonServer.bodyParser);
app.use(router);

module.exports = app;
