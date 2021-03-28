const path = require('path');
// MiniCssExtractPlugin, 컴파일된 css를 별도의 CSS 파일로 분리할 때 사용
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
    // entry file
    entry: [
        '@babel/polyfill',
        './public/js/index.js',
        './public/sass/index.scss',
    ],
    // 컴파일 + 번들링된 js 파일이 저장될 경로와 이름 지정
    output: {
        path: path.resolve(__dirname, './public/dist'),
        filename: 'js/bundle.js',
    },
    plugins: [
        // 컴파일 + 번들링 CSS 파일이 저장될 경로와 이름 지정
        new MiniCssExtractPlugin({ filename: 'css/style.css' }),
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                include: [path.resolve(__dirname, 'public/js')],
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env'],
                        plugins: ['@babel/plugin-proposal-class-properties'],
                    },
                },
            },
            {
                test: /\.scss$/,
                use: [
                    // 'style-loader', // creates style nodes from JS strings   (컴파일된 css를 bundle.js 파일에 포함시킬때 사용)
                    MiniCssExtractPlugin.loader, // 컴파일된 css를 별도의 CSS 파일로 분리할 때 사용
                    'css-loader', // translates CSS into CommonJS
                    'sass-loader', // compiles Sass to CSS, using Node Sass by default
                ],
                exclude: /node_modules/,
            },
        ],
    },
    devtool: 'source-map',
    // https://webpack.js.org/concepts/mode/#mode-development
    mode: 'development',
};
module.exports = config;