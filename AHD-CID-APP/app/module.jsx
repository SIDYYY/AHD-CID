import React, { useRef, useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, View, Image, Dimensions, TouchableOpacity, Text, Modal } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get('window');

// Slides
const boySlides = [
  require("../assets/images/boy/1.png"), //1
  require("../assets/images/boy/2.png"), //2
  require("../assets/images/boy/3.png"), //3
  require("../assets/images/boy/4.png"), //4
  require("../assets/images/boy/5.png"), //5
  require("../assets/images/boy/6.png"), //6
  require("../assets/images/boy/7.png"), //7
  require("../assets/images/boy/8.png"), //8
  require("../assets/images/boy/9.png"), //9
  require("../assets/images/boy/10.png"), //10
  require("../assets/images/boy/11.png"), //11
  require("../assets/images/boy/12.png"), //12
  require("../assets/images/boy/13.png"), //13
  require("../assets/images/boy/14.png"), //14
  require("../assets/images/boy/15.png"), //15
  require("../assets/images/boy/16.png"), //16
  require("../assets/images/boy/17.png"), //17
  require("../assets/images/boy/18.png"), //18
  require("../assets/images/boy/19.png"), //19
];

const girlSlides = [
  require("../assets/images/girl/1.png"),
  require("../assets/images/girl/2.png"),
  require("../assets/images/girl/3.png"),
  require("../assets/images/girl/4.png"),
  require("../assets/images/girl/5.png"),
  require("../assets/images/girl/6.png"),
  require("../assets/images/girl/7.png"),
  require("../assets/images/girl/8.png"),
  require("../assets/images/girl/9.png"),
  require("../assets/images/girl/10.png"),
  require("../assets/images/girl/11.png"),
  require("../assets/images/girl/12.png"),
  require("../assets/images/girl/13.png"),
  require("../assets/images/girl/14.png"),
  require("../assets/images/girl/15.png"),
  require("../assets/images/girl/16.png"),
  require("../assets/images/girl/17.png"),
  require("../assets/images/girl/18.png"),
  require("../assets/images/girl/19.png"),
];

// Topics for TOC (multi-page topics)
const boyTopics = [
  { title: "Ang Akong Pagka-Ulitawo", start: 4, end: 4 },        
  { title: "Unsa ang buhaton aron mahimong malinawon ug himsog ang puberty?", start: 5, end: 5 },   
  { title: "Pagsabot sa akong Fertility", start: 6, end: 7 },
  { title: "Kausaban sa akong Emosyon", start: 8, end: 8 },
  { title: "Getting in touch with my feelings", start: 9, end: 9 },          
  { title: "I love my body", start: 10, end: 10 },          
  { title: "Nurturing my Sexuality", start: 11, end: 11 },         
  { title: "Good Touch and Bad Touch", start: 12, end: 12 },          
  { title: "Relasyon uban sa akong Ginikanan", start: 13, end: 13 },          
  { title: "Relasyon uban sa espesyal nga tawo", start: 14, end: 14 },          
  { title: "Relasyon uban sa mga higala", start: 15, end: 15 },          
  { title: "Harnessing My Self-Esteem", start: 16, end: 16 },          
  { title: "Making Responsible Choices", start: 17, end: 17 },         
  { title: "Living a Healthy Lifestyle", start: 18, end: 18 },          
];

const girlTopics = [
  { title: "Ang Akong Pagka-Dalaga", start: 4, end: 4 },        
  { title: "Unsa ang buhaton aron mahimong malinawon ug himsog ang puberty?", start: 5, end: 5 },  
  { title: "Pagsabot sa akong Fertility", start: 6, end: 7 },
  { title: "Kausaban sa akong Emosyon", start: 8, end: 8 },
  { title: "Getting in touch with my feelings", start: 9, end: 9 },         
  { title: "I love my body", start: 10, end: 10 },          
  { title: "Nurturing my Sexuality", start: 11, end: 11 },          
  { title: "Good Touch and Bad Touch", start: 12, end: 12 },          
  { title: "Relasyon uban sa akong Ginikanan", start: 13, end: 13 },          
  { title: "Relasyon uban sa espesyal nga tawo", start: 14, end: 14 },          
  { title: "Relasyon uban sa mga higala", start: 15, end: 15 },          
  { title: "Harnessing My Self-Esteem", start: 16, end: 16 },          
  { title: "Making Responsible Choices", start: 17, end: 17 },          
  { title: "Living a Healthy Lifestyle", start: 18, end: 18 },          
];

export default function ModuleViewer() {
  const router = useRouter();
  const { gender } = useLocalSearchParams();
  const slides = gender === 'girl' ? girlSlides : boySlides;
  const topics = gender === 'girl' ? girlTopics : boyTopics;

  const flatListRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTOC, setShowTOC] = useState(false);

  // Scroll to a specific slide
  const goToPage = (index) => {
    flatListRef.current.scrollToIndex({ index, animated: true });
    setCurrentIndex(index);
    setShowTOC(false);
  };

  const handleNext = () => {
    if (currentIndex < slides.length - 1) goToPage(currentIndex + 1);
  };

  const handleBack = () => {
    if (currentIndex > 0) goToPage(currentIndex - 1);
  };

  // Fix scrollToIndex error
  const getItemLayout = (_, index) => ({
    length: width,
    offset: width * index,
    index,
  });

  

  return (
    <SafeAreaView className="flex-1 bg-white">

      {/* Header Row */}
    <View className="flex-row items-center justify-between px-6 pt-4">

      {/* Back Button */}
      <TouchableOpacity
        onPress={() => router.push("/home")}
        className="flex-row items-center bg-red-500 px-5 py-3 rounded-full shadow-lg"
      >
        <Ionicons name="arrow-back-circle-outline" size={22} color="white" />
        <Text className="text-white font-bold ml-2">Back</Text>
      </TouchableOpacity>

      {/* Contents Button */}
      <TouchableOpacity
        onPress={() => setShowTOC(true)}
        className="flex-row items-center bg-blue-600 px-5 py-3 rounded-full shadow-lg"
      >
        <Ionicons name="list-outline" size={20} color="white" />
        <Text className="text-white font-bold ml-2">Contents</Text>
      </TouchableOpacity>

    </View>


      {/* Slides */}
      <FlatList
        ref={flatListRef}
        data={slides}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={{ width, height: height - 150 }}>
            <Image source={item} style={{ width, height: '100%' }} resizeMode="contain" />
          </View>
        )}
        onMomentumScrollEnd={(e) => {
          const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
          setCurrentIndex(newIndex);
        }}
        getItemLayout={getItemLayout} // ✅ fixes scrollToIndex issue
      />

      {/* Page Counter */}
      <View className="bottom-7 left-0 right-0 items-center absolute">
        <Text className="text-gray-600 font-semibold bg-white px-4 py-1 rounded-xl shadow">
          Page {currentIndex + 1} / {slides.length}
        </Text>
      </View>

      {/* Navigation Buttons */}
      <View className="flex-row justify-between px-6 py-4 absolute bottom-10 w-full">
        <TouchableOpacity
          onPress={handleBack}
          disabled={currentIndex === 0}
          className={`px-8 py-4 rounded-full ${currentIndex === 0 ? "bg-gray-300" : "bg-blue-600"}`}
        >
          <Text className="text-white font-semibold">Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNext}
          disabled={currentIndex === slides.length - 1}
          className={`px-8 py-4 rounded-full ${currentIndex === slides.length - 1 ? "bg-gray-300" : "bg-blue-600"}`}
        >
          <Text className="text-white font-semibold">Next</Text>
        </TouchableOpacity>
      </View>

      {/* Table of Contents Modal */}
      <Modal visible={showTOC} transparent animationType="fade">
        <View className="flex-1 bg-black/50 justify-center items-center">
          <View className="bg-white w-11/12 max-h-[80%] rounded-2xl p-4">
            <Text className="text-xl font-bold mb-4 text-center">
              Table of Contents
            </Text>

            <FlatList
              data={topics}
              keyExtractor={(_, index) => index.toString()}
              showsVerticalScrollIndicator={false}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => goToPage(item.start)}
                  className={`p-4 rounded-xl mb-2 ${
                    currentIndex >= item.start && currentIndex <= item.end
                      ? "bg-blue-100"
                      : "bg-gray-100" 
                  }`}
                >
                  <Text className="font-semibold text-gray-800">{item.title}</Text>
                  <Text className="text-gray-500 text-sm">
                    {item.start === item.end
                      ? `Page ${item.start + 1}`
                      : `Pages ${item.start + 1} - ${item.end + 1}`}
                  </Text>
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              onPress={() => setShowTOC(false)}
              className="mt-4 bg-red-500 py-3 rounded-full"
            >
              <Text className="text-white text-center font-bold">Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </SafeAreaView>
  );
}
