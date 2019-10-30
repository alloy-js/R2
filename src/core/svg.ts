import * as d3 from 'd3';

interface ISVG {
    height: () => number,
    node: () => SVGElement,
    selection: () => d3.Selection<SVGElement, any, any, any>,
    width: () => number
}

function svg (element: SVGElement): ISVG {

    const _selection = d3.select(element);

    const _svg: ISVG = {

        height: (): number => {

            return parseInt(_selection.style('height'));

        },

        node: () => {

            return element;

        },

        selection: () => {

            return _selection;

        },

        width: (): number => {

            return parseInt(_selection.style('width'));

        }

    };

    return _svg;

}

export { ISVG, svg };
