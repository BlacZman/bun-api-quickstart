export type ErrorWithToJSON = Error & { toJSON: () => string };

export function isErrorToJSON(obj: unknown): obj is ErrorWithToJSON {
	const tmpobj = obj as object;
	return 'toJSON' in tmpobj;
}