const express = require("express");
const path = require("path");
const app = express();
const productsRouter = require("./routes/views/productsRoutes");
const productApiRouter = require("./routes/api/products");
const bodyParser = require("body-parser");
const {
	logErrors,
	errorHandler,
	clientErrorHandler,
	wrapErrors
} = require("./utils/middlewares/errosHandlers");
const isRequestAjaxOrApi = require("./utils/isRequestAjaxOrApi");
const boom = require("boom");

app.use("/static", express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "./views"));
app.set("view engine", "pug");

app.use(bodyParser.json());
app.use("/products", productsRouter);
app.use("/api/products", productApiRouter);

app.get("/", function(req, res) {
	res.redirect("/products");
});

app.use(function(req, res, next) {
	console.log("entre");

	if (isRequestAjaxOrApi(req)) {
		const {
			output: { statusCode, payload }
		} = boom.notFound();

		res.status(statusCode).json(payload);
	}
	res.status(404).render("404");
});

app.use(logErrors);
app.use(wrapErrors);
app.use(clientErrorHandler);
app.use(errorHandler);
//error handlers

const server = app.listen(8000, function() {
	console.log(`Listening localhost port 8000`);
});
