module.exports = {
  presets: ['@vue/app'],
  plugins: [
    ["@babel/plugin-proposal-export-default-from"],
    [
      'import',
      {
        libraryName: 'vant',
        libraryDirectory: 'es',
        style: name => `${name}/style/less`
      },
      'vant'
    ]
  ]
};
