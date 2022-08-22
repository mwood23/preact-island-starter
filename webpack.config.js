const path = require('path')
const { VanillaExtractPlugin } = require('@vanilla-extract/webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const TerserPlugin = require('terser-webpack-plugin')
const { DefinePlugin } = require('webpack')
const FileSizePlugin = require('./FileSizePlugin')
const rimraf = require('rimraf')
const glob = require('glob')

// This builds the entry points for all of your islands.
const buildEntryPoints = () => {
  const paths = glob.sync('./src/**/*.island.{ts,tsx}')
  const entryPoints = {}

  paths.forEach((path) => {
    const name = path.split('/').pop().split('.')[0]

    entryPoints[name] = path
  })

  return entryPoints
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
    devtool: false,
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
          use: [
            /**
             * This injects the built styles as a single style tag in the UMD bundle for the project.
             * This makes it to where consumers do not need to worry about an external stylesheet and
             * saves a request on shopify websites where the waterfall is normally clogged.
             */
            {
              loader: 'style-loader',
              options: { injectType: 'singletonStyleTag' },
            },
            'css-loader',
          ],
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
        template: 'src/template.html',
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
    optimization: {
      minimize: true,
      minimizer: [new TerserPlugin()],
    },
  }

  return config
}
