const Sentry = require("@sentry/node");
const { config } = require("../../config");
const boom = require("boom");
const isRequestAjaxOrApi = require("../../utils/isRequestAjaxOrApi");

function withErrorStack(err, stack) {
	if (config.dev) {
		return { ...err, stack };
	}
}

function logErrors(err, req, res, next) {
	console.error(err.stack);
	next(err);
}

function wrapErrors(err, req, res, next) {
	if (!err.isBoom) {
		next(boom.badImplementation(err));
	}
	next(err);
}

function clientErrorHandler(err, req, res, next) {
	const {
		output: { statusCode, payload }
	} = err;
	if (isRequestAjaxOrApi(req) || res.headersSent) {
		res.status(statusCode).json(withErrorStack(payload, err.stack));
	} else {
		next(err);
	}
}

function errorHandler(err, req, res, next) {
	const {
		output: { statusCode, payload }
	} = err;
	res.status(statusCode || 500);
	res.render("error", withErrorStack(payload, err.stack));
}

module.exports = {
	logErrors,
	wrapErrors,
	clientErrorHandler,
	errorHandler
};
