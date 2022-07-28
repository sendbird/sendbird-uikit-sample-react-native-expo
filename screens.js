import React from "react";
import { useNavigation, useRoute } from "@react-navigation/native";

import {
  createGroupChannelCreateFragment,
  createGroupChannelFragment,
  createGroupChannelListFragment,
  useConnection,
  useSendbirdChat,
} from "@sendbird/uikit-react-native";
import { Pressable, Text, View } from "react-native";

const GroupChannelListFragment = createGroupChannelListFragment();
const GroupChannelCreateFragment = createGroupChannelCreateFragment();
const GroupChannelFragment = createGroupChannelFragment();

export const GroupChannelListScreen = () => {
  const navigation = useNavigation();
  return (
    <GroupChannelListFragment
      onPressCreateChannel={(channelType) => {
        // Navigate to GroupChannelCreate key function.
        navigation.navigate("GroupChannelCreate", { channelType });
      }}
      onPressChannel={(channel) => {
        // Navigate to GroupChannel key function.
        navigation.navigate("GroupChannel", {
          serializedChannel: channel.serialize(),
        });
      }}
    />
  );
};

export const GroupChannelCreateScreen = () => {
  const navigation = useNavigation();

  return (
    <GroupChannelCreateFragment
      onCreateChannel={async (channel) => {
        // Navigate to GroupChannel key function.
        navigation.replace("GroupChannel", {
          serializedChannel: channel.serialize(),
        });
      }}
      onPressHeaderLeft={() => {
        // Go back to the previous screen.
        navigation.goBack();
      }}
    />
  );
};

export const GroupChannelScreen = () => {
  const navigation = useNavigation();
  const { params } = useRoute();

  const { sdk } = useSendbirdChat();
  const channel = sdk.GroupChannel.buildFromSerializedData(
    params.serializedChannel
  );

  return (
    <GroupChannelFragment
      channel={channel}
      onChannelDeleted={() => {
        // Navigate to GroupChannelList key function.
        navigation.navigate("GroupChannelList");
      }}
      onPressHeaderLeft={() => {
        // Go back to the previous screen.
        navigation.goBack();
      }}
      onPressHeaderRight={() => {
        // Navigate to GroupChannelSettings key function.
        navigation.navigate("GroupChannelSettings", {
          serializedChannel: params.serializedChannel,
        });
      }}
    />
  );
};

export const SignInScreen = () => {
  const { connect } = useConnection();

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Pressable
        style={{
          width: 120,
          height: 30,
          backgroundColor: "#742DDD",
          alignItems: "center",
          justifyContent: "center",
        }}
        onPress={() => connect("USER_ID", { nickname: "NICKNAME" })}
      >
        <Text style={{ color: "white" }}>{"Sign in"}</Text>
      </Pressable>
    </View>
  );
};
