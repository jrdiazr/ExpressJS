const express = require("express");
const passport = require("passport");
const ProductServices = require("../../services/products");

const validation = require("../../utils/middlewares/validationHandler");

const {
	productIdSchema,
	productTagSchema,
	createProductSchema,
	updateProductSchema
} = require("../../utils/schemas/products");

require("../../utils/auth/strategies/jwt");

function productsApi(app) {
	const router = express.Router();
	app.use("/api/products", router);
	const productService = new ProductServices();

	router.get("/", async function(req, res, next) {
		const { tags } = req.query;
		try {
			const products = await productService.getProducts({ tags });
			res.status(200).json({
				data: products,
				message: "products listed"
			});
		} catch (err) {
			next(err);
		}
	});

	router.get("/:productId", async function(req, res, next) {
		const { productId } = req.params;
		try {
			const products = await productService.getProduct({ productId });
			res.status(200).json({
				data: products,
				message: "products retreived"
			});
		} catch (err) {
			next(err);
		}
	});

	router.post("/", validation(createProductSchema), async function(
		req,
		res,
		next
	) {
		const { body: product } = req;
		try {
			const products = await productService.createProduct({ product });
			res.status(201).json({
				data: products,
				message: "products created"
			});
		} catch (err) {
			next(err);
		}
	});

	router.put(
		"/:productId",
		passport.authenticate("jwt", { session: false }),
		validation({ productId: productIdSchema }, "params"),
		validation(updateProductSchema),
		async function(req, res, next) {
			const { productId } = req.params;
			const { body: product } = req;
			try {
				const products = await productService.updateProduct({
					productId,
					product
				});
				res.status(200).json({
					data: products,
					message: "products updated"
				});
			} catch (err) {
				next(err);
			}
		}
	);

	router.delete(
		"/:productId",
		passport.authenticate("jwt", { session: false }),
		async function(req, res, next) {
			const { productId } = req.params;
			try {
				const products = await productService.deleteProduct({ productId });
				res.status(200).json({
					data: products,
					message: "products Deleted"
				});
			} catch (err) {
				next(err);
			}
		}
	);
}
module.exports = productsApi;
