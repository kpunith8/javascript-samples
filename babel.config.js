const presets = [
  [
    "@babel/preset-env",
    {
      corejs: 3,
      useBuiltIns: "entry"
    }
  ]
];

const plugins = [

]

module.exports = api => {
  api.cache(true);

  return {
    presets: presets,
    plugins: plugins
  };
};
