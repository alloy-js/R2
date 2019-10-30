class Relation {
    constructor(types) {
        this._tuples = [];
        this._types = types;
    }
    add(tuple) {
        tuple.forEach((item, i) => {
            if (!this._types[i].has(item)) {
                throw Error('Cannot add tuple, item has incorrect type');
            }
        });
        this._tuples.push(tuple);
        return this;
    }
    each(callback) {
        this._tuples.forEach((tuple) => {
            callback(tuple);
        });
        return this;
    }
}
export { Relation };
