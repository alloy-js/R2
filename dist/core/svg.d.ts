import * as d3 from 'd3';
interface ISVG {
    height: () => number;
    node: () => SVGElement;
    selection: () => d3.Selection<SVGElement, any, any, any>;
    width: () => number;
}
declare function svg(element: SVGElement): ISVG;
export { ISVG, svg };
