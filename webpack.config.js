const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  mode: 'development', // Приложение находится в разработке, выходные файлы js не надо сжимать
  entry: ['@babel/polyfill', './src/index.jsx'], // Входной файл, с которого будет начинаться запуск приложения
  output: {
    // Сюда webpack будет собирать файлы
    path: path.resolve(__dirname, 'dist'), // Сборка будет происходить в папку dist
    filename: '[name].[hash].js', // Сборка всех js файлов проекта
  },
  devServer: {
    port: 3000,
    historyApiFallback: true,
  },
  // Расширения
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  plugins: [
    new HTMLWebpackPlugin({ template: './src/index.html' }), // Переносит HTML шаблон в папку dist и импортирует в него все соответсвующие js bundles
    new CleanWebpackPlugin(), // Очищает неиспользуемые bundles
  ],
  module: {
    // import стилей
    rules: [
      {
        test: /\.(css|less)$/,
        use: ['style-loader', 'css-loader', 'less-loader'],
      },
      {
        test: /\.(jpg|jpeg|png|svg)$/,
        use: ['file-loader'],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'], // Преобразует код для старых браузеров
          },
        },
      },
      {
        test: /\.m?jsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-react', '@babel/preset-env'],
          },
        },
      },
      {
        test: /\.m?tsx$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              '@babel/preset-typescript',
              '@babel/preset-react',
              '@babel/preset-env',
            ],
          },
        },
      },
    ],
  },
};
