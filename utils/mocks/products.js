const productMocks = [
	{
		name: "Red shoes",
		price: 75,
		image:
			"https://rukminim1.flixcart.com/image/714/857/jgo0ccw0/shoe/b/c/g/5009-white-10-blinder-red-original-imaf4ux29vagwqkg.jpeg?q=50",
		tags: ["brown", "expensive"]
	},
	{
		name: "Black bike",
		price: 300,
		image:
			"https://cdn.shopify.com/s/files/1/0232/3305/products/state_bicycle_co_matte_black_6_fixie_8.jpg?v=1571266658",
		tags: ["brown", "expensive"]
	}
];

function filteredProductsMock(tag) {
	return productsMock.filter(product => product.tags.includes(tag));
}

class ProductsServiceMock {
	async getProducts() {
		return Promise.resolve(productsMock);
	}

	async createProduct() {
		return Promise.resolve("6bedb1267d1ca7f3053e2875");
	}
}

module.exports = {
	productMocks,
	filteredProductsMock,
	ProductsServiceMock
};
