import * as _ from 'lodash';
class Set {
    constructor(items) {
        this._items = items.slice();
    }
    add(item) {
        if (!this._items.includes(item)) {
            this._items.push(item);
        }
        return this;
    }
    each(callback) {
        this._items.forEach(callback);
        return this;
    }
    has(value) {
        return this._items.includes(value);
    }
    intersection(other) {
        return new Set(_.intersection(this._items, other._items));
    }
    minus(other) {
        return new Set(_.difference(this._items, other._items));
    }
    remove(item) {
        _.pull(this._items, item);
        return this;
    }
    union(other) {
        return new Set(_.union(this._items, other._items));
    }
}
export { Set };
