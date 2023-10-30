/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

interface ObjectConstructor {
	entries<K extends string | number | symbol, V>(o: Record<K, V>): [K, V][];
	keys<K extends string | number | symbol>(o: Record<K, unknown>): K[];
	values<V>(o: Record<string | number | symbol, V>): V[];
}

interface Array<T> {
	includes(value: unknown): value is T;
}

interface ReadonlyArray<T> {
	includes(value: unknown): value is T;
}

interface Window {
	__has_analytics_error_set: boolean;
}
