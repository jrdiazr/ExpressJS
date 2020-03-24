const productMocks = require("../utils/mocks/products");
const MongoLib = require("../lib/mongo");

class ProductService {
	constructor() {
		this.collection = "products";
		this.mondoDB = new MongoLib();
	}

	async getProducts({ tags }) {
		const query = tags && { tags: { $in: tags } };
		console.log(query);
		const products = await this.mondoDB.getAll(this.collection, query);
		return products || [];
	}

	async getProduct({ productId }) {
		const product = await this.mondoDB.get(this.collection, productId);
		return product || {};
	}

	async createProduct({ product }) {		

		const createdProductId = await this.mondoDB.create(
			this.collection,
			product
		);
		return createdProductId;
	}

	async updateProduct({ productId, product }) {
		const updatedProductId = await this.mondoDB.update(
			this.collection,
			productId,
			product
		);
		return updatedProductId || productId;
	}

	async deleteProduct({ productId }) {
		const deletedProductId = await this.mondoDB.delete(
			this.collection,
			productId
		);
		return deletedProductId || productId;
	}
}

module.exports = ProductService;
