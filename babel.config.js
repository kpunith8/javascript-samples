const presets = [
  [
    "@babel/preset-env",
    {
      corejs: 3,
      useBuiltIns: "entry"
    }
  ]
];

module.exports = api => {
  api.cache(true);

  return {
    presets: presets
  };
};
