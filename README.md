# sendbird-uikit-sample-react-native-expo

This sample demonstrates how to use Sendbird UIKit for React Native with Expo.

## Installation

Step 1: Install dependencies

```shell
yarn install
```

Step 2: Fill in your Sendbird application ID in the APP_ID field of src/env.ts

## Usage

### Expo Go QR

To use Expo Go QR, run the following command:

> **NOTE**: Starting from version @sendbird/uikitreact-native@2.5.0, we no longer support Expo Go on Android. Please use EAS Build instead.

```shell
yarn start
```

### iOS

To use iOS, run the following command:

```shell
yarn ios
```

## Upgrading Expo SDK

For information on upgrading Expo SDK, please refer to the following documentation:

https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/

To upgrade Expo SDK, run the following commands:

```shell
yarn add expo@latest
expo install --fix
```

Note: Please ensure that you have read and understood the documentation before upgrading Expo SDK.
