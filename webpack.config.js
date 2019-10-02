// Webpack uses this to work with directories
const path = require('path');

// This is main configuration object.
// Here you write different options and tell Webpack what to do
module.exports = (env, argv) => {
    let isProduction = argv.mode === 'production';

    return {
        devtool: !isProduction ? 'source-map' : false,
        // Path to your entry point. From this file Webpack will begin his work
        entry: {
            'sticky-query': './src/sticky-query.js',
        },

        // Path and filename of your result bundle.
        // Webpack will bundle all JavaScript into this file
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: '[name].min.js',
        },
    };
};
