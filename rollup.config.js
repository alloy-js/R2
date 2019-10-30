const license = require('rollup-plugin-license');
const resolve = require('rollup-plugin-node-resolve');

export default {
    input: 'dist/r2.js',
    output: {
        file: `bundle/r2.js`,
        format: 'umd',
        name: 'r2'
    },
    plugins: [
        license({
            banner: {
                commentStyle: 'ignored',
                content: { file: 'LICENSE' }
            }
        }),
        resolve()
    ]
}
