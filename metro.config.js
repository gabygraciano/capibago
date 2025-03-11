const { getDefaultConfig } = require('expo/metro-config');

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);
  
  // Aqui adicionamos as configurações para lidar com .svg
  config.transformer.babelTransformerPath = require.resolve('react-native-svg-transformer');
  config.resolver.assetExts = config.resolver.assetExts.filter(ext => ext !== 'svg');
  config.resolver.sourceExts.push('svg');
  
  return config;
})();
