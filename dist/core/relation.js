function relation(types) {
    /**
     * The scoped list of types
     */
    const _types = types;
    /**
     * The scoped list of tuples
     */
    const _tuples = [];
    /**
     * The relation object that provides methods
     */
    const _relation = {
        add: (tuple) => {
            tuple.forEach((item, i) => {
                if (!_types[i].has(item))
                    throw Error('Cannot add tuple, item has incorrect type');
            });
            _tuples.push(tuple);
            return _relation;
        },
        each: (callback) => {
            _tuples.forEach(tuple => callback(tuple));
            return _relation;
        }
    };
    return _relation;
}
export { relation };
