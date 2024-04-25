const { build } = require("esbuild");
const { dependencies, peerDependencies } = require('./package.json')

const external = peerDependencies ? Object.keys(peerDependencies) : []

const sharedConfig = {
  entryPoints: ["src/index.ts"],
  bundle: true,
  minify: true,
  external: Object.keys(dependencies).concat(external),
};

console.log('building cjs and esm bundles...')

build({
  ...sharedConfig,
  platform: 'node', // for CJS
  outfile: "dist/index.js",
});

build({
  ...sharedConfig,
  outfile: "dist/index.esm.js",
  platform: 'neutral', // for ESM
  format: "esm",
});