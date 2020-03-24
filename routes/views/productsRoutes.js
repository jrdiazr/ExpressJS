const express = require("express");
const router = express.Router();
const ProductServices = require("../../services/products");

const productService = new ProductServices();

router.get("/", async function(req, res, next) {
	const { tags } = req.query;
	try {
		const products = await productService.getProducts({ tags });
		console.log("vista", products.data);

		res.render("products", { products });
	} catch (err) {
		next(err);
	}
});

module.exports = router;
