import { ISet } from './set';
interface IRelation {
    add: (item: any) => void;
    each: (callback: (tuple: any[]) => void) => IRelation;
}
declare function relation(types: ISet<any>[]): IRelation;
export { IRelation, relation };
