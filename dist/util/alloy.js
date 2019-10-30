import { AlloyInstance } from 'alloy-ts';
import { relation } from '../core/relation';
import { set } from '../core/set';
function alloyData(instance) {
    instance = typeof instance === 'string'
        ? new AlloyInstance(instance)
        : instance;
    const sets = instance
        .signatures()
        .map((sig) => {
        return {
            id: sig.id(),
            set: set(sig.atoms(true)),
            signature: sig
        };
    });
    const getSet = (signature) => {
        const set = sets.find(set => set.signature === signature);
        if (!set)
            throw Error('Cannot build Alloy dataset: invalid Alloy data');
        return set.set;
    };
    const rels = instance.fields().map((fld) => {
        const types = fld.types().map(getSet);
        const rel = relation(types);
        fld.tuples().forEach((tuple) => {
            rel.add(tuple.atoms());
        });
        return {
            id: fld.id(),
            relation: rel,
            field: fld
        };
    });
    return {
        sets: sets,
        relations: rels
    };
}
export { alloyData };
