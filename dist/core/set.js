function set(items) {
    /**
     * The scoped list of items in the set
     */
    const _items = items ? items.slice() : [];
    /**
     * The set object that provides methods
     */
    const _set = {
        add: (item) => {
            if (!_items.includes(item))
                _items.push(item);
            return _set;
        },
        each(callback) {
            _items.forEach(callback);
            return _set;
        },
        has: (item) => {
            return _items.includes(item);
        }
    };
    return _set;
}
export { set };
