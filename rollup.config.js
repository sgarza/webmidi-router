import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import multiEntry from 'rollup-plugin-multi-entry';
import { version, author, name, main, license, description, moduleName, module as moduleFile } from './package.json';

const banner = `\
/**
 * ${name} v${version}
 * ${description}
 *
 * @author ${author}
 * @license ${license}
 * @preserve
 */
`;

export default [
  {
    input: 'src/index.js',
    output: [
      {
        file: moduleFile,
        format: 'esm',
        sourcemap: true,
        banner,
      },
      {
        file: main,
        format: 'umd',
        sourcemap: true,
        name: moduleName,
        banner,
      },
    ],
    plugins: [
      resolve(),
      commonjs(),
    ]
  },
  {
    input: 'tests/**/*.test.js',
    output: {
      file: 'dist/tests.bundle.js',
      name: 'lib',
      sourcemap: true,
      format: 'iife',
      banner,
      globals: {
        chai: 'chai',
        it: 'it',
        describe: 'describe',
        sinon: 'sinon',
      },
    },
    external: ['chai', 'it', 'describe', 'sinon'],
    plugins: [
      resolve(),
      commonjs(),
      multiEntry(),
    ],
  },
];
