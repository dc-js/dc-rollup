import resolve from 'rollup-plugin-node-resolve';

function onwarn (warning, warn) {
  if (warning.code === 'CIRCULAR_DEPENDENCY') return;
  warn(warning);
}


export default {
  input: 'main.js',

  output: {
    name: 'dcjs_rollup',
    file: 'bundle.js',
    format: 'iife',
    sourceMap: true,
    globals: {
      'd3': 'd3',
      'dc': 'dc',
      'crossfilter2': 'crossfilter'
    }

  },
  onwarn: onwarn,
  plugins: [
    resolve({
      jsnext: true,
      main: true,
      browser: true
    }),
    sourcemaps(),
    json(),
    commonjs(),
    globals(),

  ]
};
