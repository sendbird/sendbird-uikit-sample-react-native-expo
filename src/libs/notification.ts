import { Platform } from "react-native";
import * as TaskManager from "expo-task-manager";
import * as Notifications from "expo-notifications";

import {
  isSendbirdNotification,
  parseSendbirdNotification,
} from "@sendbird/uikit-utils";

import { navigationRef, Routes, runAfterAppReady } from "./navigation";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
});
export const onForeground = () => {
  const onNotification = (notification: Notifications.NotificationResponse) => {
    const data = notification?.notification?.request?.content?.data as any;
    if (data && isSendbirdNotification(data)) {
      const sendbird = parseSendbirdNotification(data);
      runAfterAppReady(async (_, actions) => {
        const channelUrl = sendbird.channel.channel_url;
        if (Routes.Home === navigationRef.getCurrentRoute()?.name) {
          actions.push(Routes.GroupChannelTabs, { channelUrl });
        } else {
          actions.navigate(Routes.GroupChannel, { channelUrl });
        }
      });
    }
  };

  const checkAppOpenedWithNotification = async () => {
    const response = await Notifications.getLastNotificationResponseAsync();
    onNotification(response);
  };

  checkAppOpenedWithNotification();
  return Notifications.addNotificationResponseReceivedListener(onNotification)
    .remove;
};

if (Platform.OS === "android") {
  // Set channel
  const channelId = "default";
  Notifications.setNotificationChannelAsync(channelId, {
    name: "Default Channel",
    importance: 4,
  });

  // Set background message handler
  const BACKGROUND_NOTIFICATION_TASK = "BACKGROUND-NOTIFICATION-TASK";
  TaskManager.defineTask(BACKGROUND_NOTIFICATION_TASK, ({ data }) => {
    if (Platform.OS !== "android") return;

    console.log("Background notification task", data);

    if (isSendbirdNotification(data)) {
      const sendbird = parseSendbirdNotification(data);

      Notifications.scheduleNotificationAsync({
        identifier: String(sendbird.message_id),
        content: {
          title: `[RN]${
            sendbird.channel.name || sendbird.sender?.name || "Message received"
          }`,
          body: sendbird.message,
          data: data,
        },
        trigger: null,
      });
    }
  });
  Notifications.registerTaskAsync(BACKGROUND_NOTIFICATION_TASK);
}
