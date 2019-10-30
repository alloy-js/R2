import {
    AlloyAtom,
    AlloyField,
    AlloyInstance,
    AlloySignature,
    AlloyTuple
} from 'alloy-ts';
import { IRelation, relation } from '../core/relation';
import { ISet, set } from '../core/set';

interface AlloySet {
    id: string,
    set: ISet<AlloyAtom>,
    signature: AlloySignature
}

interface AlloyRelation {
    id: string,
    relation: IRelation,
    field: AlloyField
}

interface AlloyDataset {
    sets: AlloySet[],
    relations: AlloyRelation[]
}

function alloyData (instance: AlloyInstance | string): AlloyDataset {

    instance = typeof instance === 'string'
        ? new AlloyInstance(instance)
        : instance;

    const sets = instance
        .signatures()
        .map((sig: AlloySignature): AlloySet => {
            return {
                id: sig.id(),
                set: set<AlloyAtom>(sig.atoms(true)),
                signature: sig
            };
        });

    const getSet = (signature: AlloySignature): ISet<AlloyAtom> => {
        const set = sets.find(set => set.signature === signature);
        if (!set) throw Error('Cannot build Alloy dataset: invalid Alloy data');
        return set.set;
    };

    const rels = instance.fields().map((fld: AlloyField) => {

        const types: ISet<AlloyAtom>[] = fld.types().map(getSet);
        const rel = relation(types);
        fld.tuples().forEach((tuple: AlloyTuple) => {
            rel.add(tuple.atoms());
        });

        return {
            id: fld.id(),
            relation: rel,
            field: fld
        }

    });

    return {
        sets: sets,
        relations: rels
    };

}

export { alloyData };
