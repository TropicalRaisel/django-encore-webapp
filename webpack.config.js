const Encore = require('@symfony/webpack-encore');

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
    //.setManifestKeyPrefix('build/')

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
    //.addEntry('page1', './assets/javascripts/page1.js')
    //.addEntry('page2', './assets/javascripts/page2.js')

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
    //.enableBuildNotifications()
    .enableBuildCache({ config: [__filename] }, (cache) => {
        cache.version = `${process.env.GIT_REV}`;
        cache.name = `${process.env.target}`;
    })
    .enableSourceMaps(!Encore.isProduction())
    .configureDevServerOptions((config) => {
        // https://github.com/symfony/webpack-encore/issues/1017#issuecomment-887264214
        delete config.client.host

        config.allowedHosts = 'all';
        // in older Webpack Dev Server versions, use this option instead:
        // config.firewall = false;
    })

    // enables hashed filenames (e.g. app.abc123.css)
    .enableVersioning(Encore.isProduction())

    // enables @babel/preset-env polyfills
    .configureBabelPresetEnv((config) => {
        config.useBuiltIns = 'usage';
        config.corejs = 3;
    })

    // enables extra styling support
    .enablePostCssLoader() // handles polyfills alongside autoprefixer
    .enableSassLoader()
    //.enableHandlebarsLoader()
    //.enableLessLoader()
    //.enableStylusLoader()

    // uncomment to get integrity="..." attributes on your script & link tags
    // requires WebpackEncoreBundle 1.4 or higher
    .enableIntegrityHashes(Encore.isProduction())

    // uncomment if you're having problems with a jQuery plugin
    //.autoProvidejQuery()
    ;

if (Encore.isProduction()) {
    Encore
        .addPlugin(new WorkboxWebpackPlugin.GenerateSW({
            // these options encourage the ServiceWorkers to get in there fast
            // and not allow any straggling "old" SWs to hang around
            clientsClaim: true,
            skipWaiting: true
        }))
}

module.exports = Encore.getWebpackConfig();
