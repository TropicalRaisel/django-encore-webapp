const Encore = require('@symfony/webpack-encore');
const Path = require('path')
const ImageMinimizerPlugin = require('image-minimizer-webpack-plugin')
const svgToMiniDataURI = require('mini-svg-data-uri')

// Manually configure the runtime environment if not already configured yet by the "encore" command.
// It's useful when you use tools that rely on webpack.config.js file.
if (!Encore.isRuntimeEnvironmentConfigured()) {
    Encore.configureRuntimeEnvironment(process.env.NODE_ENV || 'dev');
}

Encore
    // directory where compiled assets will be stored
    .setOutputPath('public/build/')
    // public path used by the web server to access the output path
    .setPublicPath('/build')
    // only needed for CDN's or sub-directory deploy
    // .setManifestKeyPrefix('build/')

    /*
     * ENTRY CONFIG
     *
     * Add 1 entry for each "page" of your app
     * (including one that's included on every page - e.g. "app")
     *
     * Each entry will result in one JavaScript file (e.g. app.js)
     * and one CSS file (e.g. app.css) if your JavaScript imports CSS.
     */
    .addEntry('app', './assets/javascripts/app.js')
    .addEntry('home', './assets/javascripts/home.js')
    //.addEntry('page2', './assets/page2.js')

    // When enabled, Webpack "splits" your files into smaller pieces for greater optimization.
    .splitEntryChunks()

    // will require an extra script tag for runtime.js
    // but, you probably want this, unless you're building a single-page app
    .enableSingleRuntimeChunk()

    /*
     * FEATURE CONFIG
     *
     * Enable & configure other features below. For a full
     * list of features, see:
     * https://symfony.com/doc/current/frontend.html#adding-more-features
     */
    .cleanupOutputBeforeBuild()
    .enableSourceMaps(!Encore.isProduction())

    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    .addPlugin(new ImageMinimizerPlugin({
      minimizerOptions: {
        // Lossless optimization with custom option
        // Feel free to experiment with options for better result for you
        plugins: [
          ['gifsicle', { interlaced: true }],
          ['jpegtran', { progressive: true }],
          ['optipng', { optimizationLevel: 5 }],
          // https://github.com/nuxt-community/imagemin-module/issues/28#issuecomment-886855337
          ['svgo', { plugins: [{ name: 'removeViewBox', active: false }] }]
        ]
      }
    }))

    .configureImageRule({
      type: 'asset'
    }, () => {
      return {
        test: /\.svg$/i,
        type: 'asset/inline',
        generator: {
          dataUrl: content => {
            content = content.toString()
            return svgToMiniDataURI(content)
          }
        }
      }
    })

    .configureFontRule({
      type: 'asset'
    })

    .copyFiles({
      from: './assets/images',
      to: 'images/[path][name].[hash:8].[ext]'
    })

    // enables @babel/preset-env polyfills
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = 3;
    })

    // enables Sass/SCSS support
    .enableSassLoader()

    // uncomment if you use TypeScript
    //.enableTypeScriptLoader()

    // uncomment to get integrity="..." attributes on your script & link tags
    // requires WebpackEncoreBundle 1.4 or higher
    .enableIntegrityHashes(Encore.isProduction())

    // uncomment if you're having problems with a jQuery plugin
    .autoProvidejQuery()
;

if (Encore.isDevServer()) {
  Encore

    .configureDevServerOptions((options) => {
      // https://github.com/symfony/webpack-encore/issues/1017#issuecomment-887264214
      delete options.client.host

      // fixes cors header issues
      options.headers = {
        'Access-Control-Allow-Origin': '*'
      }

      options.static = {
        directory: Path.join(__dirname, 'assets'),
        staticOptions: {
          index: 'views/index.html'
        }
      }

      options.open = {
        target: ['/', 'http://127.0.0.1:8000/'],
        app: {
          name: 'chrome'
        }
      }
    })

    .enableBuildNotifications(true, (options) => {
      options.skipFirstNotification = true
    })
}

module.exports = Encore.getWebpackConfig();
