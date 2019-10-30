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

    let matrix = 'Matrix$0';
    let vals = relations['this/Matrix<:vals'];
    let matrixvals = join(matrix, vals);

    const parseCell = (tuple) => {
        const row = parseInt(tuple[0]);
        const col = parseInt(tuple[1]);
        const val = tuple[2];
        return { row, col, val };
    };

    let cells = matrixvals.map(parseCell);
    console.log(cells);

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
