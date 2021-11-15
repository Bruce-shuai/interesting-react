const CracoLessPlugin = require('craco-less');

module.exports = {
  plugins: [
    {
      plugin: CracoLessPlugin,
      options: {
        lessLoaderOptions: {
          lessOptions: {
            modifyVars: { '@primary-color': '#1DA57A', '@font-size-base':'20px', '@error-color':'#8c8c8c' },
            javascriptEnabled: true,
          },
        },
      },
    },
  ],
};