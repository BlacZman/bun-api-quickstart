import {
	type ExpressErrorMiddlewareInterface,
	Middleware,
	HttpError,
} from "routing-controllers";
import { ValidationError } from "class-validator";
import * as express from "express";
import { delay, inject, injectable } from "tsyringe";

import { AppConfig } from "@/common/appconfig/AppConfig";
import { LoggerFactory } from "@/common/logger/LoggerFactory";
import { isErrorWithValidationObject } from "@/common/validator/isErrorWithValidationObject";
import { isErrorToJSON } from "@/common/validator/isErrorToJSON";

/**
 * Express middleware to catch all errors throwed in controlers.
 * Should be first in error chain as it sends response to client.
 *
 * @export
 * @class HTTPErrorHandler
 * @implements {ExpressErrorMiddlewareInterface}
 */
@injectable()
@Middleware({
	type: "after",
})
export class HTTPErrorHandler implements ExpressErrorMiddlewareInterface {
	/**
	 * Error handler - sets response code and sends json with error message.
	 * Handle: standard node error, HttpError, ValidationError and string.
	 *
	 * @param {any} error An throwed object (error)
	 * @param {express.Request} req The Express request object
	 * @param {express.Response} res The Express response object
	 * @param {express.NextFunction} next The next Express middleware function
	 */

	private logger;

	private readonly name = "HTTPErrorHandler";

	constructor(
		@inject(delay(() => AppConfig)) private config: AppConfig,
		@inject(delay(() => LoggerFactory)) loggerFactory: LoggerFactory
	) {
		this.logger = loggerFactory.createFactory(this.name);
	}

	// eslint-disable-next-line @typescript-eslint/no-unused-vars
	public error(
		error: unknown,
		req: express.Request,
		res: express.Response,
		_next: express.NextFunction
	) {
		const responseObject: {
			message?: string;
			errors: string[];
			details?: Error | string;
			name?: string;
			stack?: string;
		} = {
			errors: [],
		};

		if (isErrorWithValidationObject(error)) {
			res.status(400);
			responseObject.message =
				"You have an error in your request's body. Check 'errors' and 'details' field for more details!";
			responseObject.errors = [];
			responseObject.details = error;
			error.errors.forEach((element: ValidationError) => {
				Object.keys(element.constraints ?? {}).forEach((type) =>
					responseObject.errors.push(`${element.constraints![type]}`)
				);
			});
		} else {
			// set http status
			if (error instanceof HttpError && error.httpCode) {
				res.status(error.httpCode);
				if (isErrorToJSON(error)) {
					responseObject.details = error.toJSON();
				}
			} else {
				res.status(500);
			}

			if (error instanceof Error) {
				const developmentMode = this.config.node_env === "development";

				// set response error fields
				if (error.name && (developmentMode || error.message)) {
					// show name only if in development mode and if error message exist too
					responseObject.name = error.name;
				}
				if (error.message) {
					responseObject.message = error.message;
				}
				if (developmentMode && error.stack) {
					responseObject.stack = error.stack;
				}
			} else if (typeof error === "string") {
				responseObject.message = error;
			}
		}
		this.logger.error(
			`[${res.locals.requestId}] - HTTP CODE ${res.statusCode}`,
			responseObject
		);

		// send json only with error
		res.json(responseObject);
	}
}
