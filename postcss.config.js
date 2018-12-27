/* eslint-disable import/no-extraneous-dependencies */
const postcssPresetEnv = require('postcss-preset-env');

module.exports = {
  plugins: [postcssPresetEnv({ stage: 0 })],
};
