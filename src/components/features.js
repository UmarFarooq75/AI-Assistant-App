import { View, Text, Image } from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Features() {
  return (
    <View style={{ height: hp(50) }} className="space-y-4 mb-56">
      <Text
        style={{ fontSize: wp(6.5) }}
        className="font-semibold text-gray-700"
      >
        Features
      </Text>
      <View className="bg-emerald-200 p-4 rounded-xl space-y-2">
        <View className="flex-row items-center space-x-1 ">
          <Image
            source={require("../../assets/images/chatgptIcon.png")}
            style={{ height: hp(5), width: wp(9), resizeMode: "cover" }}
          />
          <Text
            style={{ fontSize: wp(4.8) }}
            className="font-semibold text-gray-700"
          >
            ChatGPT
          </Text>
        </View>
        <Text
          style={{ fontSize: wp(3.5) }}
          className="text-gray-700 font-medium"
        >
          ChatGPT, fueled by GPT-3.5, excels in human-like text generation for
          versatile applications. With context-aware responses...
        </Text>
      </View>
      <View className="bg-purple-200 p-3 rounded-xl space-y-2">
        <View className="flex-row items-center space-x-1 ">
          <Image
            source={require("../../assets/images/dalleIcon.png")}
            style={{ height: hp(5), width: wp(9), resizeMode: "cover" }}
          />
          <Text
            style={{ fontSize: wp(4.8) }}
            className="font-semibold text-gray-700"
          >
            DALL-E
          </Text>
        </View>
        <Text
          style={{ fontSize: wp(3.5) }}
          className="text-gray-700 font-medium"
        >
          DALL·E, born from OpenAI, is an image generation model, crafting
          diverse visuals from textual prompts. It transforms words into unique...
        </Text>
      </View>
      <View className="bg-cyan-200 p-4 rounded-xl space-y-2">
        <View  className="flex-row items-center space-x-1 ">
          <Image
            source={require("../../assets/images/smartaiIcon.png")}
            style={{ height: hp(5), width: wp(9), resizeMode: "cover" }}
          />
          <Text
            style={{ fontSize: wp(4.8) }}
            className="font-semibold text-gray-700"
          >
            Smart-AI
          </Text>
        </View>
        <Text
          style={{ fontSize: wp(3.5) }}
          className="text-gray-700 font-medium"
        >
          Smart AI blends ChatGPT's conversational prowess with DALL·E's image
          generation, providing a dynamic fusion of text...
        </Text>
      </View>
    </View>
  );
}
