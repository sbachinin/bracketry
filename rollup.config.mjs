import resolve from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import { terser } from "rollup-plugin-terser"
import scss from 'rollup-plugin-scss'
import stripCssComments from 'strip-css-comments'
// import { getBabelOutputPlugin } from '@rollup/plugin-babel'

export default [
    {
        input: "./lib/lib.mjs",
        output: [
            {
                file: "dist/cjs/index.js",
                format: "cjs",
                sourcemap: true,
            },
            {
                file: "dist/esm/index.js",
                format: "esm",
                sourcemap: true,
            },
        ],
        plugins: [
            resolve(),
            commonjs(),
            terser(),

            // TODO do i need an es5 bundle?
            // getBabelOutputPlugin({ presets: ['@babel/preset-env'] }),
            scss({
                output: false,
                processor: stripCssComments
            })
        ]
    }
];