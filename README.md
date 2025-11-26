# sendbird-uikit-sample-react-native-expo

This sample demonstrates how to use Sendbird UIKit for React Native with Expo.

## Installation

Step 1: Install dependencies

```shell
yarn install
```

Step 2: Fill in your Sendbird application ID in the `APP_ID` field of [`src/env.ts`](src/env.ts)

Step 3: Generate native projects

```shell
npx expo prebuild
```

## Usage

### Android

To run on Android, execute the following command:

```shell
yarn android
```

### iOS

To run on iOS, install CocoaPods dependencies first:

```shell
cd ios && pod install && cd ..
```

Then run:

```shell
yarn ios
```

## Upgrading Expo SDK

For information on upgrading Expo SDK, please refer to the following documentation:

https://docs.expo.dev/workflow/upgrading-expo-sdk-walkthrough/

To upgrade Expo SDK, run the following commands:

```shell
yarn add expo@latest
npx expo install --fix
```

After upgrading, regenerate native projects:

```shell
npx expo prebuild --clean
```

Note: Please ensure that you have read and understood the documentation before upgrading Expo SDK.
