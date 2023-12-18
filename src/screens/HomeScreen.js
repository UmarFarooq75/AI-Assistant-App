import {
  View,
  Text,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
  Keyboard,
  Platform,
} from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Features from "../components/features";
import { dummyMessages } from "../constants";
import { TextInput } from "react-native";
import { apiCall } from "../api/openAi";
import { Alert } from "react-native";
import { KeyboardAvoidingView } from "react-native";
// import Voice from '@react-native-voice/voice';

const HomeScreen = () => {
  const [result, setResult] = useState("");
  const [messages, setMessages] = useState(dummyMessages);
  const scrollViewRef = useRef();
  const [loading, setLoading] = useState(false);
  const [enablekeyboard, setEnabledKeyboard] = useState(false);
  const keyboardDidShowListener = useRef(null);
  const keyboardDidHideListener = useRef(null);
  useEffect(() => {
    // Add listeners for keyboard show and hide events
    keyboardDidShowListener.current = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setEnabledKeyboard(true);
      }
    );
    keyboardDidHideListener.current = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setEnabledKeyboard(false);
      }
    );

    // Cleanup listeners when the component is unmounted
    return () => {
      keyboardDidShowListener.current.remove();
      keyboardDidHideListener.current.remove();
    };
  }, []);
  const clear = () => {
    setResult("");
    console.log("resultclear", result);
  };
  const sendButton = () => {
    fetchResponse();
  };

  const fetchResponse = async () => {
    if (result.trim().length > 0) {
      let newMessages = [...messages];
      newMessages.push({ role: "user", content: result.trim() });
      setMessages([...newMessages]);
      // scroll to the bottom of the view
      updateScrollView();
      setLoading(true);
      setResult("");
      // fetching response from chatGPT with our prompt and old messages
      apiCall(result.trim(), newMessages).then((res) => {
        setLoading(false);
        console.log("got api data");
        if (res.success) {
          setMessages([...res.data]);
          updateScrollView();
        } else {
          Alert.alert("Error", res.msg);
        }
      });
    }
  };

  const updateScrollView = () => {
    setTimeout(() => {
      scrollViewRef?.current?.scrollToEnd({ animated: true });
    }, 0);
  };

  return (
    <View className="flex flex-grow bg-white">
      <SafeAreaView className="flex-1">
        {/* Bot Icon */}
        <View className="flex-row justify-center bg-white">
          <Image
            style={{
              height: hp(8),
              width: wp(12),
              resizeMode: "cover",
            }}
            source={require("../../assets/images/bot.png")}
          />
        </View>
        <KeyboardAvoidingView
          behavior={Platform.OS === "ios" ? "padding" : "height"}
          style={{ flex: 1 }}
          className="bg-neutral-300"
          enabled={enablekeyboard}
        >
          <ScrollView
            ref={scrollViewRef}
            contentContainerStyle={{ flexGrow: 1 }}
            bounces={false}
            showsVerticalScrollIndicator={false}
          >
            {/* Features || Messages */}
            {messages.length > 0 ? (
              <View className="flex-1">
                <View
                  style={{
                    height: enablekeyboard ? hp(50) : hp(80),
                    width: wp(100),
                  }}
                  className="bg-neutral-200 "
                >
                  <ScrollView
                    ref={scrollViewRef}
                    contentContainerStyle={{ flexGrow: 1 }}
                    bounces={false}
                    showsVerticalScrollIndicator={true}
                  >
                    {messages.map((message, index) => {
                      if (message.role === "assistant") {
                        if (message.content.includes("https")) {
                          // Render image for assistant
                          return (
                            <View
                              key={index}
                              className="flex-row justify-start"
                            >
                              <View className="p-1 flex rounded-2xl bg-emerald-100 rounded-tl-none m-1 mx-3">
                                <Image
                                  style={{ height: hp(34), width: wp(60) }}
                                  source={{ uri: message.content }}
                                  className="rounded-2xl"
                                  resizeMode="cover"
                                />
                              </View>
                            </View>
                          );
                        } else {
                          // Render text for assistant
                          return (
                            <View
                              key={index}
                              style={{ width: wp(70) }}
                              className="bg-emerald-100 rounded-xl rounded-tl-none p-2 m-1 mx-3 "
                            >
                              <Text>{message.content}</Text>
                            </View>
                          );
                        }
                      } else {
                        // Render user messages
                        return (
                          <View key={index} className="flex-row justify-end">
                            <View
                              style={{ width: wp(70) }}
                              className="bg-white rounded-xl rounded-tr-none p-2 m-1 mx-3"
                            >
                              <Text>{message.content}</Text>
                            </View>
                          </View>
                        );
                      }
                    })}
                    {loading ? (
                      <View className="flex-row justify-start">
                        <View className="p-2 flex rounded-2xl bg-emerald-100 rounded-tl-none m-1 mx-3">
                          <Image
                            source={require("../../assets/images/load-35.gif")}
                            style={{ width: wp(5), height: hp(3) }}
                          />
                        </View>
                      </View>
                    ) : null}
                  </ScrollView>
                </View>
              </View>
            ) : (
              <Features />
            )}
          </ScrollView>
          <View
            style={{ width: wp(96) }}
            className="bg-white rounded-lg self-start flex-row m-2"
          >
            <TextInput
              onChangeText={(value) => {
                setEnabledKeyboard(true);
                setResult(value);
              }}
              value={result}
              style={{ width: wp(88) }}
              placeholder="Message SmartAI..."
              className="p-3"
            />
            <View className="items-end flex-row space-x-3 -top-2">
              <TouchableOpacity
                onPress={() => {
                  sendButton();
                }}
              >
                <Image
                  source={require("../../assets/images/send.png")}
                  style={{
                    height: hp(3.5),
                    width: wp(6),
                    resizeMode: "cover",
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
};

export default HomeScreen;
