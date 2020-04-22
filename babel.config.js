const presets = [
  [
    "@babel/preset-env",
    {
      corejs: 3,
      useBuiltIns: "entry",
      targets: {
        node: "current",
        browsers: "last 1 chrome version",
      },
      loose: true,
      shippedProposals: true,
    },
  ],
];

const plugins = [];

module.exports = (api) => {
  api.cache(true);

  return {
    presets: presets,
    plugins: plugins,
  };
};
