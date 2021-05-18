import resolve from '@rollup/plugin-node-resolve';

export default {
    input: 'public/js/renderer.js',
    output: [
        {
            format: 'esm',
            name: 'MYAPP',
            dir: 'public/build/'
        }
    ],
    plugins: [ resolve() ]
};