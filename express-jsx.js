const fs = require("fs");

function getRenderedContent(content, object) {
	const keys = getKeysFromOptions(object);
	console.log(content.toString());

	let contentString = content.toString();

	for (let key of keys) {
		contentString = contentString.replace(
			new RegExp(`\{${key}\}`, "gi"),
			object[key]
		);
	}
	return contentString;
}

function getKeysFromOptions(options) {
	const { settings, _locals, ...objectKeys } = options;
	return Object.keys(objectKeys);
}

function expressJsx(filePath, options, callback) {
	fs.readFile(filePath, function(err, content) {
		if (err) {
			return callback(err);
		}
		const rendered = getRenderedContent(content, options);

		return callback(null, rendered);
	});
}

module.exports = expressJsx;
