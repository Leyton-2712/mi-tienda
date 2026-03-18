const jsonServer = require("json-server");
const path = require("path");

const app = jsonServer.create();
const router = jsonServer.router(path.join(process.cwd(), "db.json"));
const middlewares = jsonServer.defaults();

app.use(middlewares);
app.use(jsonServer.bodyParser);

app.get("/:resource/:id", (req, res, next) => {
	const { resource, id } = req.params;
	const collection = router.db.get(resource);

	if (!collection || !Array.isArray(collection.value())) {
		return next();
	}

	const entity = collection.find((item) => String(item.id) === String(id)).value();

	if (!entity) {
		return res.status(404).json({
			message: `El id ${id} no existe en ${resource}`
		});
	}

	return next();
});

app.use(router);

module.exports = app;
