import * as d3 from 'd3';
function svg(element) {
    const _selection = d3.select(element);
    const _svg = {
        height: () => {
            return parseInt(_selection.style('height'));
        },
        node: () => {
            return element;
        },
        selection: () => {
            return _selection;
        },
        width: () => {
            return parseInt(_selection.style('width'));
        }
    };
    return _svg;
}
export { svg };
