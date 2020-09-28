import resolve  from 'rollup-plugin-node-resolve';
import babel    from 'rollup-plugin-babel';
import replace  from 'rollup-plugin-replace';
import commonjs from 'rollup-plugin-commonjs';
import uglify   from 'rollup-plugin-uglify';

const env = process.env.NODE_ENV;

const config = {
  input: 'src/index.js',
  external: ['lodash, loglevel'],
  output: {
    format: 'umd',
    name: 'jsonapi-front',
  },

  plugins: [
    resolve({
      jsnext: true,
      module: true
    }),
    commonjs({
      include: 'node_modules/**',
      namedExports: {}
    }),
    babel({
      exclude: '**/node_modules/**',
      runtimeHelpers: true,
    }),
    replace({
      'process.env.NODE_ENV': JSON.stringify(env),
    })
  ],
};

if (env === 'production') {
  config.plugins.push(
    uglify({
      compress: {
        pure_getters: true,
        unsafe: true,
        unsafe_comps: true,
        warnings: false,
      },
    }),
  );
}

export default config;
