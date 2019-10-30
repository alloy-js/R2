import { AlloyAtom, AlloyField, AlloyInstance, AlloySignature } from 'alloy-ts';
import { IRelation } from '../core/relation';
import { ISet } from '../core/set';
interface AlloySet {
    id: string;
    set: ISet<AlloyAtom>;
    signature: AlloySignature;
}
interface AlloyRelation {
    id: string;
    relation: IRelation;
    field: AlloyField;
}
interface AlloyDataset {
    sets: AlloySet[];
    relations: AlloyRelation[];
}
declare function alloyData(instance: AlloyInstance | string): AlloyDataset;
export { alloyData };
