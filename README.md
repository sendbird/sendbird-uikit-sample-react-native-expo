# sendbird-uikit-sample-react-native-expo

This sample demonstrates how to use Sendbird UIKit for React Native with Expo.

## Installation

Step 1: Install dependencies

```shell
yarn install
```

Step 2: Fill in your Sendbird application ID in the `APP_ID` field of [`src/env.ts`](src/env.ts)

## Usage

> **NOTE**: Starting from version @sendbird/uikit-react-native@2.5.0, we no longer support Expo Go on Android.
> Please use [EAS Build](https://docs.expo.dev/build/setup/#build-for-android-emulatordevice-or-ios-simulator) or [Prebuild](https://docs.expo.dev/workflow/prebuild/) instead.

### Expo Go QR

To use Expo Go QR, run the following command:

```shell
yarn start
```

### iOS

To use iOS, run the following command:

```shell
yarn ios
```

### Web

> **NOTE**: While it is possible to run in a web environment
> please note that Expo SDK is not fully compatible with web environments and we do not officially support the web. (We do not guarantee functionality related to this.)

To test Web, run the following command:

```shell
yarn web
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
