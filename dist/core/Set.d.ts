declare class Set<T> {
    private readonly _items;
    constructor(items: T[]);
    add(item: T): Set<T>;
    each(callback: (value: T) => void): Set<T>;
    has(value: T): boolean;
    intersection(other: Set<T>): Set<T>;
    minus(other: Set<T>): Set<T>;
    remove(item: T): Set<T>;
    union(other: Set<T>): Set<T>;
}
export { Set };
