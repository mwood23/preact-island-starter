const path = require('path')
const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { DefinePlugin } = require('webpack')
const FileSizePlugin = require('./FileSizePlugin')
const glob = require('glob')

/**
 * @returns {Array.<{import: string, name: string, layer: string, elementName: string}>}
 */
const getIslands = () => {
  const paths = glob.sync('./src/**/*.island.{ts,tsx}')

  return paths.map((path) => {
    const name = path
      .split('/')
      .pop()
      .replace(/.island.(tsx|ts)/g, '')

    let elementName = `${name}-island`
    /**
     * If you want to name your web component something different than the filename of the island (not
     * recommended). Please override them here.
     */
    // if (name === 'call-to-action') {
    //   elementName = 'something-else'
    // }

    return {
      path,
      name,
      elementName,
      layer: name,
    }
  })
}

const islands = getIslands()

// This builds the entry points for all of your islands.
const buildEntryPoints = () => {
  const entryPoints = {}

  islands.forEach((island) => {
    entryPoints[island.name] = {
      import: island.path,
      layer: island.layer,
    }
  })

  return entryPoints
}

const buildCssLayersFromEntryPoints = () => {
  return islands.map(({ layer, elementName }) => {
    return {
      issuerLayer: layer,
      use: [
        /**
         * This injects the built styles as a single style tag in the UMD bundle for the project.
         * This makes it to where consumers do not need to worry about an external stylesheet and
         * saves a request on shopify websites where the waterfall is normally clogged.
         */
        {
          loader: 'style-loader',
          options: {
            injectType: 'singletonStyleTag',
            attributes: {
              'data-style-for': elementName,
            },
            /**
             * It appears the node given to you is initially blank with styles applied after the fact so you
             * can't rely on it to have information you need immediately.
             *
             * See: https://github.com/webpack-contrib/style-loader/blob/43bede4415c5ccb4680d558725e0066f715aa175/src/runtime/singletonStyleDomAPI.js#L83
             *
             * NOTE: This runs untranspiled in the browser so watch out!
             */
            insert: (styleTag) => {
              var styleTarget = styleTag.dataset.styleFor

              if (!styleTarget) {
                console.error(
                  'Did not get a style target in the insert command from the style loader. No styles will be inserted. Did you override something in getIslands incorrectly?',
                )

                return
              }

              window.addEventListener('web-component-mount', (e) => {
                if (
                  styleTarget !== e.detail.target &&
                  styleTarget !== e.detail.parent
                ) {
                  return
                }

                var target = document.querySelector(e.detail.target).shadowRoot

                if (!target) {
                  console.error(
                    `Could not find a web component query selector target for "${styleTarget}". No styles will be appended. Did you name the web component at createIslandWebComponent something different than your file name? If so, you will need to override it at getIslands inside of the webpack config. This is what is expected
                    
createIslandWebComponent('${styleTarget}', YourComponent).render({
  selector: ${styleTarget},
  initialProps: {},
})`,
                  )
                  return
                }

                // We need to clone because it's going to be inserted into separate shadow doms. If you don't clone it
                // the tag can only be active in one context
                target.prepend(styleTag.cloneNode(true))
              })
            },
          },
        },
        'css-loader',
      ],
    }
  })
}

module.exports = ({ dev, prod }) => {
  const isDev = dev === true
  const isProd = prod === true

  if (isDev) {
    console.log(
      "Stubbing environmental variables for development from './env.local'",
    )
    require('dotenv').config({ path: './.env.local' })
  }

  /** @type { import('webpack').Configuration } */
  const config = {
    mode: isProd ? 'production' : 'development',
    target: 'web',
    resolve: {
      extensions: ['.js', '.json', '.ts', '.tsx'],
      /**
       * From the docs to make Webpack compile Preact:
       * https://preactjs.com/guide/v10/getting-started#aliasing-in-webpack
       */
      alias: {
        react: 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat', // Must be below test-utils
        'react/jsx-runtime': 'preact/jsx-runtime',
      },
    },
    devServer: {
      port: 7777,
      hot: false,
    },
    devtool: isDev ? 'eval' : false,
    entry: buildEntryPoints(),
    output: {
      path: path.join(__dirname, 'dist/islands'),
      filename: '[name].island.umd.js',
      libraryTarget: 'umd',
    },
    module: {
      rules: [
        {
          test: /\.(js|ts|tsx)$/,
          exclude: [/node_modules/],
          use: [
            {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                presets: [
                  '@babel/preset-typescript',
                  ['@babel/preset-react', { runtime: 'automatic' }],
                  [
                    '@babel/preset-env',
                    { targets: { node: 16 }, modules: false },
                  ],
                ],
                plugins: ['@vanilla-extract/babel-plugin'],
              },
            },
          ],
        },
        {
          test: /\.css$/i,
          oneOf: buildCssLayersFromEntryPoints(),
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        templateContent: ({ htmlWebpackPlugin }) => `
        <html>
          <head>
          <meta charset="utf-8" />
          <title>Islands</title>
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <style>
            body {
              font-family: -apple-system, system-ui, BlinkMacSystemFont, 'Segoe UI',
                Roboto, 'Helvetica Neue', Arial, sans-serif;
            }
      
            .preview {
              width: 100%;
              max-width: 1100px;
              margin: 80px auto;
              border: 1px dashed rgba(0, 0, 0, 0.2);
              position: relative;
            }
      
            .preview::before {
              content: 'Island';
              position: absolute;
              display: block;
              top: -18px;
              font-size: 11px;
              color: rgba(0, 0, 0, 0.5);
            }
          </style>
            ${htmlWebpackPlugin.tags.headTags}
          </head>
          <body>
          ${islands
            .map((island) => {
              return `<div class="preview">
            <${island.elementName}></${island.elementName}>
          </div>`
            })
            .join('')}
            
            ${htmlWebpackPlugin.tags.bodyTags}
          </body>
        </html>
      `,
        /**
         * Islands are served from /islands in dist so we don't pollute the root domain since these islands are
         * embedded into websites we do not control.
         *
         * In dev mode, we serve islands and the index.html from the root since it's dev mode. For production,
         * the index.html file is served from the root.
         */
        publicPath: isDev ? '/' : '/islands',
        filename: isDev ? 'index.html' : '../index.html',
      }),
      new VanillaExtractPlugin(),
      /**
       * Define environmental variables here that you need for the islands to function.
       */
      new DefinePlugin({
        ISLAND_API_URL: JSON.stringify(process.env.ISLAND_API_URL),
      }),
      ...(isProd ? [new FileSizePlugin()] : []),
    ],
    stats: 'errors-warnings',
    experiments: {
      layers: true,
    },
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
    },
  }

  return config
}
