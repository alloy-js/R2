interface ISet<T> {
    add: (item: T) => ISet<T>,
    each: (callback: (value: T) => void) => ISet<T>,
    has: (item: T) => boolean
}

function set<T> (items?: T[]): ISet<T> {

    /**
     * The scoped list of items in the set
     */
    const _items: T[] = items ? items.slice() : [];

    /**
     * The set object that provides methods
     */
    const _set: ISet<T> = {

        add: (item: T): ISet<T> => {

            if (!_items.includes(item)) _items.push(item);
            return _set;

        },

        each (callback: (value: T) => void): ISet<T> {

            _items.forEach(callback);
            return _set;

        },

        has: (item: T): boolean => {

            return _items.includes(item);

        }

    };

    return _set;

}

export { ISet, set };
