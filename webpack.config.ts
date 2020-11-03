import { resolve } from 'path';
import { Configuration, DefinePlugin, HotModuleReplacementPlugin } from 'webpack';
// @ts-ignore
import PreactRefreshPlugin from '@prefresh/webpack';
import merge from 'webpack-merge';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const base: Configuration = {
  output: {
    path: resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  node: {
    __dirname: false,
    __filename: false
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js', '.json']
  },
  devtool: 'source-map',
  plugins: []
};

const main = merge.smart(base, {
  name: 'main',
  target: 'electron-main',
  entry: {
    main: './src/main/main.ts'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          babelrc: false,
          presets: [
            ['@babel/preset-env', { targets: 'maintained node versions' }],
            '@babel/preset-typescript'
          ],
          plugins: [['@babel/plugin-proposal-class-properties', { loose: true }]]
        }
      },
      {
        test: /\.(gif|png|jpe?g|svg|ico)$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              disable: true
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      reportFiles: ['src/main/**/*']
    }),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ]
});

const renderer = merge.smart(base, {
  name: 'renderer',
  target: 'electron-renderer',
  entry: {
    app: ['@babel/polyfill', './src/renderer/Index.tsx']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          cacheDirectory: true,
          babelrc: false,
          presets: [
            '@babel/env',
            [
              '@babel/typescript',
              {
                onlyRemoveTypeImports: true,
                jsxPragma: 'h'
              }
            ]
          ],
          plugins: [
            ['@babel/plugin-proposal-class-properties', { loose: true }],
            '@babel/proposal-object-rest-spread',
            '@prefresh/babel-plugin',
            [
              '@babel/plugin-transform-react-jsx',
              {
                pragma: 'h',
                pragmaFrag: 'Fragment'
              }
            ]
          ]
        }
      },
      {
        test: /\.s(a|c)ss$/,
        loaders: ['style-loader', 'css-loader', 'sass-loader']
      },
      {
        test: /\.css$/,
        loaders: ['style-loader', 'css-loader']
      },
      {
        test: /\.(gif|png|jpe?g|svg|ico)$/,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              disable: true
            }
          }
        ]
      },
      {
        enforce: 'pre',
        test: /\.js$/,
        loader: 'source-map-loader'
      }
    ]
  },
  resolve: {
    alias: {
      react: 'preact/compat',
      'react-dom/test-utils': 'preact/test-utils',
      'react-dom': 'preact/compat'
    }
  },
  optimization: {
    namedModules: true
  },
  plugins: [
    new ForkTsCheckerWebpackPlugin({
      reportFiles: ['src/renderer/**/*']
    }),
    new HotModuleReplacementPlugin(),
    new HtmlWebpackPlugin({ template: `${__dirname}/public/index.html` }),
    new PreactRefreshPlugin(),
    new DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
    })
  ],
  devServer: {
    port: 2003,
    compress: true,
    noInfo: true,
    stats: 'errors-only',
    inline: true,
    hot: true,
    headers: { 'Access-Control-Allow-Origin': '*' },
    historyApiFallback: {
      verbose: true
    }
  }
});

module.exports = [main, renderer];
