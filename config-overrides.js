const webpack = require('webpack');
module.exports = function override(config, env) {
    config.resolve.fallback = {
        url: false,
        fs: false,
        assert: false,
        crypto: false,
        http: false,
        https: false,
        os: false,
        buffer: false,
        stream: false,
        path: false,
    };
    config.plugins.push(
        new webpack.ProvidePlugin({
            process: 'process/browser',
            Buffer: ['buffer', 'Buffer'],
        }),
    );

    return config;
}
