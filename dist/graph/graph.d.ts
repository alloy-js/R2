import { IRelation } from '../core/relation';
import { ISVG } from '../core/svg';
declare function graph(relations: IRelation[]): (svg: ISVG) => void;
export { graph };
