import { ValidationError } from 'class-validator';

type ErrorWithValidation = Error & { errors: ValidationError[] };

function isArrayOfValidationError(obj: unknown[]): obj is ValidationError[] {
	return obj.every((element: unknown) => element instanceof ValidationError);
}

export function isErrorWithValidationObject(obj: unknown): obj is ErrorWithValidation {
	const tmpobj = obj as object;
	return 'errors' in tmpobj && !!tmpobj.errors && Array.isArray(tmpobj.errors) && isArrayOfValidationError(tmpobj.errors);
}