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

    /**
    This pattern could lend itself well to something similar to D3
    selections, see here https://bost.ocks.org/mike/selection/

    Our "selections" would be arrays of arrays as well. Signatures are
    represented as sets: arrays of arrays in which each inner array has
    only a single item (an atom).

        matrix = [['Matrix$0'], ['Matrix$1']]

    Fields are represented as relations: arrays of arrays in which each inner
    array can have multiple items (also atoms).

        vals = [
            ['Matrix$0', '0', '0', 'Value$0'],
            ['Matrix$0', '0', '1', 'Value$0'],
            ...
        ]

    And then we have an API built around these "selection" so that we can do
    things like:

        matrix.property('vals', vals, accessor);

    Wherein we do something like below to match rows of the vals relations with
    each atom in the matrix set.

     */

    let matrices = data(sets['this/Matrix']);
    let rows = relations['this/Matrix<:rows'];
    property(matrices, 'rows', rows, matches => parseInt(matches[0][0]));
    console.log(matrices);

    // let matrix = 'Matrix$0';
    // let vals = relations['this/Matrix<:vals'];
    // let matrixvals = join(matrix, vals);
    //
    // const parseCell = (tuple) => {
    //     const row = parseInt(tuple[0]);
    //     const col = parseInt(tuple[1]);
    //     const val = tuple[2];
    //     return { row, col, val };
    // };
    //
    // let cells = matrixvals.map(parseCell);
    // console.log(cells);

}

// Turn a list of atoms into a list of objects. These objects will then be
// operated upon by subsequent functions
function data (set) {
    return set.map(item => ({ datum: item }));
}

function property (data, name, tuples, accessor) {
    data.forEach(item => {
        const datum = item.datum;
        const matches = match(datum, tuples);
        item[name] = accessor(matches);
    });
    return data;
}

function match (atom, tuples) {
    return tuples
        .filter(tuple => tuple.includes(atom))
        .map(tuple => tuple.filter(tupat => tupat !== atom))
}

function join (atom, tuples) {

    return tuples
        .filter(tuple => tuple[0] === atom)
        .map(tuple => tuple.slice(1));

}

function simplify (instance) {

    let sets = instance.signatures()
        .map(sig => ({
            id: sig.id(),
            data: sig.atoms(true).map(atom => atom.name())
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
