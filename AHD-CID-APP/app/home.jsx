import React, { useState, useCallback } from "react";
import {
  View,
  Text,
  Image,
  Pressable,
  ScrollView,
  Modal,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { FontAwesome5 } from "@expo/vector-icons";
import YoutubePlayer from "react-native-youtube-iframe";
import Logo from "../assets/images/CID-AHD-LOGO.jpg";
import YoutubePlaylist from "./Vplaylist/ytPlaylist";

const { width } = Dimensions.get("window");

export default function Home() {
  const router = useRouter();
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleSelectGender = (gender) => {
    setShowGenderModal(false);
    router.push({
      pathname: "/module",
      params: { gender },
    });
  };

  // const youtubeVideos = [
  //   {
  //     id: "1",
  //     title: "TAYO NA SA PAGBABAGO - BAYABAS NATIONAL HIGH SCHOOL",
  //     videoId: "10TCGDvgMlA",
  //   },
  //   {
  //     id: "2",
  //     title: "Choose the RIGHT - Liceo de Cagayan University",
  //     videoId: "KLmagEWOpP8",
  //   },
  //   {
  //     id: "3",
  //     title: "TUSKO'Y IWASAN POPDEV MV",
  //     videoId: "hM2xixqwoj4",
  //   },
  // ];

  const onStateChange = useCallback((state) => {
    if (state === "ended") setSelectedVideo(null);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-[#0c4799]">
      {/* Header */}
      <View className="flex-row items-center px-6 py-4">
        <Image
          source={Logo}
          style={{ width: 80, height: 80, borderRadius: 10 }}
          resizeMode="contain"
        />
        <View className="ml-4">
          <Text className="text-2xl font-bold text-white">CID AHD CDO</Text>
          <Text className="text-sm text-white">
            Community Improvement Division
          </Text>
        </View>
      </View>

      {/* Main Content */}
      <ScrollView className="flex-1 px-6 bg-white rounded-t-3xl pt-8">
        <Text className="text-xl font-semibold text-gray-900 mb-6">
          Welcome! Choose an action below:
        </Text>

        {/* Request Service */}
        <Pressable
          onPress={() => router.push("screens/services")}
          className="bg-[#0c4799] py-6 rounded-xl items-center mb-6 shadow"
        >
          <Text className="text-white font-bold text-lg">
            Request a Service
          </Text>
        </Pressable>

        {/* Quiz */}
        <Pressable
          onPress={() => router.push("quiz")}
          className="bg-white border border-gray-300 py-6 rounded-xl items-center mb-6 shadow"
        >
          <Text className="text-black font-bold text-lg">
            How Are You Feeling Today?
          </Text>
          <Text className="text-gray-500 text-sm mt-1">
            Take a short quiz to check your stress level
          </Text>
        </Pressable>

        {/* Know More */}
        <Pressable
          onPress={() => setShowGenderModal(true)}
          className="bg-white border border-gray-300 py-6 rounded-xl items-center mb-6 shadow"
        >
          <Text className="text-gray-900 font-bold text-lg">
            Know More About Yourself
          </Text>
          <Text className="text-gray-500 text-sm mt-1">
            Learn about gender, health, and adolescent development
          </Text>
        </Pressable>

        {/* YouTube Videos */}
        <View className="flex-row justify-center items-center">
        <Text className="text-lg font-semibold text-gray-900 mt-4 mb-4">
          Helpful Videos by 
          {" "}
        </Text>
        <Text className="text-lg color-green-600 font-semibold">
          ORO YOUTH CENTER
        </Text>
        </View>
<YoutubePlaylist />

        {/* <FlatList
          data={youtubeVideos}
          horizontal
          showsHorizontalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => setSelectedVideo(item.videoId)}
              className="mr-4 rounded-xl overflow-hidden shadow-lg bg-gray-100"
            >
              <Image
                source={{
                  uri: `https://img.youtube.com/vi/${item.videoId}/hqdefault.jpg`,
                }}
                style={{
                  width: width * 0.8,
                  height: (width * 0.8 / 16) * 9,
                }}
                resizeMode="cover"
              />
              <Text className="p-3 text-gray-800 font-medium w-[80%]">
                {item.title}
              </Text>
            </Pressable>
          )}
        /> */}
      </ScrollView>

      {/* Gender Modal */}
      <Modal
        visible={showGenderModal}
        transparent
        animationType="fade"
        onRequestClose={() => setShowGenderModal(false)}
      >
        <View className="flex-1 bg-black/40 justify-center items-center px-6">
          <View className="bg-white w-full rounded-3xl p-6 shadow-lg">
            <Text className="text-2xl font-bold text-gray-900 text-center mb-2">
              Please Select Your Sex
            </Text>

            <Text className="text-gray-500 text-center mb-6">
              This ensures age-appropriate and gender-relevant educational materials.
            </Text>

            <TouchableOpacity
              onPress={() => handleSelectGender("boy")}
              className="flex-row items-center justify-center bg-blue-600 py-5 rounded-2xl mb-4"
            >
              <FontAwesome5 name="male" size={22} color="white" />
              <Text className="text-white font-bold text-lg ml-3">Boy</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => handleSelectGender("girl")}
              className="flex-row items-center justify-center bg-pink-600 py-5 rounded-2xl mb-4"
            >
              <FontAwesome5 name="female" size={22} color="white" />
              <Text className="text-white font-bold text-lg ml-3">Girl</Text>
            </TouchableOpacity>

            <Pressable
              onPress={() => setShowGenderModal(false)}
              className="items-center mt-2"
            >
              <Text className="text-gray-600 font-semibold">Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

      {/* Video Modal */}
      <Modal
        visible={!!selectedVideo}
        animationType="slide"
        onRequestClose={() => setSelectedVideo(null)}
        transparent
      >
        <View className="flex-1 bg-black/90 justify-center items-center">
          <Pressable
            onPress={() => setSelectedVideo(null)}
            className="absolute top-12 right-6 z-50 bg-gray-800 px-4 py-2 rounded-full"
          >
            <Text className="text-white font-bold text-lg">Close</Text>
          </Pressable>

          {selectedVideo && (
            <YoutubePlayer
              height={(width / 16) * 9}
              width={width * 0.95}
              videoId={selectedVideo}
              play={true}
              onChangeState={onStateChange}
            />
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
}
