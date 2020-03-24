const { MongoClient, ObjectId } = require("mongodb");
const { config } = require("../config/");

const MONGO_URI = `mongodb+srv://${config.dbUser}:${config.dbPassword}@${config.dbHost}/${config.dbName}?retryWrites=true&w=majority`;
console.log(MONGO_URI);

class MongoLib {
	constructor() {
		this.client = new MongoClient(MONGO_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});
		this.dbName = config.dbName;
	}
	connect() {
		return new Promise((res, rej) => {
			this.client.connect(err => {
				if (err) {
					rej(err);
				}
				console.log("Conexion a mongo con exito", this.dbName);
				res(this.client.db(this.dbName));
			});
		});
	}
	getAll(collection, query) {
		return this.connect().then(db => {
			return db
				.collection(collection)
				.find(query)
				.toArray();
		});
	}
	get(collection, id) {
		return this.connect().then(db => {
			return db.collection(collection).findOne({ _id: ObjectId(id) });
		});
	}
	create(collection, data) {
		console.log(data);
		return this.connect()
			.then(db => {
				return db.collection(collection).insertOne(data);
			})
			.then(result => result.insertedId);
	}
	update(collection, id, data) {
		return this.connect()
			.then(db => {
				return db
					.collection(collection)
					.updateOne({ _id: ObjectId(id) }, { $set: data }, { upsert: true });
			})
			.then(result => result.upsertedId || id);
	}
	delete(collection, id) {
		return this.connect()
			.then(db => {
				return db.collection(collection).deleteOne({ _id: ObjectId(id) });
			})
			.then(result => result.deletedId);
	}
}

module.exports = MongoLib;
