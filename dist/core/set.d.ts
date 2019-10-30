interface ISet<T> {
    add: (item: T) => ISet<T>;
    each: (callback: (value: T) => void) => ISet<T>;
    has: (item: T) => boolean;
}
declare function set<T>(items?: T[]): ISet<T>;
export { ISet, set };
