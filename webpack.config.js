const path = require('path');
const GasPlugin = require('gas-webpack-plugin');

const config = {
    context: __dirname,
    mode: 'none',
    entry: './src/Code.ts',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'Code.js'
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    'ts-loader'
                ],
                exclude: /node_modules/
            }
        ]
    },
    resolve: {
        extensions: ['.ts'],
        modules: ['./src']
    },
    plugins: [
        new GasPlugin()
    ]
};

module.exports = config
