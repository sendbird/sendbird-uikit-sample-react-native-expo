const createExpoWebpackConfigAsync = require('@expo/webpack-config');

// Expo CLI will await this method so you can optionally return a promise.
module.exports = async function (env, argv) {
    return await createExpoWebpackConfigAsync({
        ...env,
        babel: {
            dangerouslyAddModulePathsToTranspile: ['@sendbird/uikit-chat-hooks', '@sendbird/uikit-utils', '@sendbird/uikit-react-native-foundation'],
        }
    }, argv);
};
