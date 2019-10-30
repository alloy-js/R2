import { Set } from './Set';
declare class Relation {
    private readonly _tuples;
    private readonly _types;
    constructor(types: Set<any>[]);
    add(tuple: any[]): Relation;
    each(callback: (tuple: any[]) => void): Relation;
}
export { Relation };
