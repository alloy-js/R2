let input = document.getElementById('file');
let svg = document.getElementById('svg');
input.onchange = event => {
    const f = event.target.files[0];
    const r = new FileReader();
    r.onload = e => {
        const t = e.target.result;
        setInstance(new alloy.AlloyInstance(t));
    };
    r.readAsText(f);
};

function setInstance (instance) {

    let { sets, relations } = simplify(instance);

    let rowsRelation = relations['this/Matrix<:rows'];
    let colsRelation = relations['this/Matrix<:cols'];
    let valsRelation = relations['this/Matrix<:vals'];

    let matrices = select(sets['this/Matrix']);
    matrices.property('rows', rowsRelation, accessDifference);
    matrices.property('cols', colsRelation, accessDifference);
    matrices.property('vals', valsRelation, accessDifference);
    // matrices.print();
    matrices.each(object => console.log(object));

}

function select (set, builder) {

    builder = builder ? builder : () => ({});
    const objects = set.map(builder);
    return new Selection(set.slice(), objects);

}

function Selection (data, objects) {
    this._data = data;
    this._objects = objects;
}

Selection.prototype = {
    each: each,
    print: print,
    property: property
};

function property (name, relation, accessor) {

    this._data.forEach((datum, index) => {
        const tuples = match(datum, relation);
        this._objects[index][name] = select(accessor(datum, tuples));
    });

    // this._items.forEach(item => {
    //
    //     const tuples = match(item.datum, relation);
    //     item[name] = select(accessor(item, tuples));
    //
    // });

}

// Accessors

function accessDifference (item, tuples) {
    return tuples.map(tuple => difference(tuple, item));
}

// Helpers

function difference (a, b) {
    return a.filter(value => !b.includes(value));
}

function each (callback) {
    this._objects.forEach((object, index) => {
        callback(object, this._data[index])
    });
}

function intersect (a, b) {
    return a.filter(value => b.includes(value));
}

function match (group, tuples) {
    return tuples
        .filter(tuple => intersect(tuple, group).length !== 0);
}

function print (depth=0) {

    this._items.forEach(item => {
        console.log(`${' '.repeat(depth)}<${item.datum.join(', ')}>`);
        for (let prop in item) {
            if (item.hasOwnProperty(prop) && prop !== 'datum') {
                console.log(`${' '.repeat(depth+1)}${prop}:`);
                item[prop].print(depth+2);
            }
        }
    });

}

function simplify (instance) {

    let sets = instance.signatures()
        .map(sig => ({
            id: sig.id(),
            data: sig.atoms(true).map(atom => [atom.name()])
        }))
        .reduce((acc, curr) => {
            acc[curr.id] = curr.data;
            return acc;
        }, {});

    let relations = instance.fields()
        .map(fld => ({
            id: fld.id(),
            data: fld.tuples().map(tuple => tuple.atoms().map(atom => atom.name()))
        }))
        .reduce((acc, curr) => {
            acc[curr.id] = curr.data;
            return acc;
        }, {});

    return { sets, relations };

}
