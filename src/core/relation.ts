import { ISet } from './set';

interface IRelation {
    add: (item: any) => void,
    each: (callback: (tuple: any[]) => void) => IRelation
}

function relation (types: ISet<any>[]): IRelation {

    /**
     * The scoped list of types
     */
    const _types = types;

    /**
     * The scoped list of tuples
     */
    const _tuples: any[][] = [];

    /**
     * The relation object that provides methods
     */
    const _relation: IRelation = {

        add: (tuple: any[]) => {

            tuple.forEach((item: any, i: number) => {
                if (!_types[i].has(item))
                    throw Error('Cannot add tuple, item has incorrect type');
            });
            _tuples.push(tuple);
            return _relation;

        },

        each: (callback: (tuple: any[]) => void): IRelation => {

            _tuples.forEach(tuple => callback(tuple));
            return _relation;

        }

    };

    return _relation;

}

export { IRelation, relation };
