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

    let { sets, relations } = toSets(instance);

    /**
     * [[Matrix$0]]
     */
    let matrixSig = sets['this/Matrix'];

    /**
     * [[{id: 'Matrix$0}]]
     */
    let matrixObj = matrixSig.map(tuple => tuple.map(atom => ({id: atom.name()})));

    console.log(matrixObj);

}

function toSets (instance) {

    let sets = instance.signatures()
        .map(sig => ({
            id: sig.id(),
            data: sig.atoms().map(atom => [atom])
        }))
        .reduce((acc, curr) => {
            acc[curr.id] = curr.data;
            return acc;
        }, {});

    let relations = instance.fields()
        .map(fld => ({
            id: fld.id(),
            data: fld.tuples().map(tuple => tuple.atoms())
        }))
        .reduce((acc, curr) => {
            acc[curr.id] = curr.data;
            return acc;
        }, {});

    return { sets, relations };

}
