const path = require('path');
const alias = require('esbuild-plugin-alias');
const glob = require('glob')

function build(pattern){
  const jsxfiles = new glob.Glob(pattern, {})

  for (const file of jsxfiles) {
    const entry = path.resolve(__dirname, file)

    require('esbuild')
      .build({
        entryPoints: [entry],
        bundle: true,
        platform: 'neutral',
        external: ['tjs:path'],
        outfile: path.resolve(path.dirname(entry), 'index.js'),
        define: {
          'process.env.NODE_ENV': '"development"',
        }
      })
      .then(() => console.log('Build %s complete', file))
      .catch(() => {
        process.exit(1);
      });
  }
}

build('demo/*/*.{jsx,tsx}')
build('test/*/*.{jsx,tsx}')
