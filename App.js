import React from "react";

import * as ExpoClipboard from "expo-clipboard";
import * as ExpoDocumentPicker from "expo-document-picker";
import * as ExpoFS from "expo-file-system";
import * as ExpoImagePicker from "expo-image-picker";
import * as ExpoMediaLibrary from "expo-media-library";
import * as ExpoNotifications from "expo-notifications";
import AsyncStorage from "@react-native-async-storage/async-storage";

import {
  createExpoClipboardService,
  createExpoFileService,
  createExpoNotificationService,
  SendbirdUIKitContainer,
  useSendbirdChat,
} from "@sendbird/uikit-react-native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import {
  GroupChannelCreateScreen,
  GroupChannelListScreen,
  GroupChannelScreen,
  SignInScreen,
} from "./screens";

const NotificationService = createExpoNotificationService(ExpoNotifications);
const ClipboardService = createExpoClipboardService(ExpoClipboard);
const FileService = createExpoFileService({
  fsModule: ExpoFS,
  imagePickerModule: ExpoImagePicker,
  mediaLibraryModule: ExpoMediaLibrary,
  documentPickerModule: ExpoDocumentPicker,
});

const RootStack = createNativeStackNavigator();

const Navigation = () => {
  const { currentUser } = useSendbirdChat();

  return (
    <NavigationContainer>
      <RootStack.Navigator screenOptions={{ headerShown: false }}>
        {!currentUser ? (
          <RootStack.Screen name={"SignIn"} component={SignInScreen} />
        ) : (
          <>
            <RootStack.Screen
              name={"GroupChannelList"}
              component={GroupChannelListScreen}
            />
            <RootStack.Screen
              name={"GroupChannelCreate"}
              component={GroupChannelCreateScreen}
            />
            <RootStack.Screen
              name={"GroupChannel"}
              component={GroupChannelScreen}
            />
          </>
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

const App = () => {
  return (
    <SendbirdUIKitContainer
      appId={"2D7B4CDB-932F-4082-9B09-A1153792DC8D"}
      chatOptions={{ localCacheStorage: AsyncStorage }}
      platformServices={{
        file: FileService,
        notification: NotificationService,
        clipboard: ClipboardService,
      }}
    >
      <Navigation />
    </SendbirdUIKitContainer>
  );
};

export default App;
