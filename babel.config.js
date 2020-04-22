const presets = [
  [
    "@babel/preset-env",
    {
      corejs: 3,
      useBuiltIns: "entry",
      targets: {
        node: 'current',
      },
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
