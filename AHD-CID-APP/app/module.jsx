import React, { useRef, useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, View, Image, Dimensions, TouchableOpacity, Text } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";

const { width, height } = Dimensions.get('window');

// Import slides
const boySlides = [
  require("../assets/images/boy/1.png"),
  require("../assets/images/boy/2.png"),
  require("../assets/images/boy/3.png"),
  require("../assets/images/boy/4.png"),
  require("../assets/images/boy/5.png"),
  require("../assets/images/boy/6.png"),
  require("../assets/images/boy/7.png"),
  require("../assets/images/boy/8.png"),
  require("../assets/images/boy/9.png"),
  require("../assets/images/boy/10.png"),
  require("../assets/images/boy/11.png"),
  require("../assets/images/boy/12.png"),
  require("../assets/images/boy/13.png"),
  require("../assets/images/boy/14.png"),
  require("../assets/images/boy/15.png"),
  require("../assets/images/boy/16.png"),
  require("../assets/images/boy/17.png"),
  require("../assets/images/boy/18.png"),
  require("../assets/images/boy/19.png"),
  require("../assets/images/boy/20.png"),
  require("../assets/images/boy/21.png"),


  // ... up to boy21.png
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
  require("../assets/images/girl/20.png"),

  // ... up to girl20.png
];

export default function ModuleViewer() {
  const router = useRouter();
  const { gender } = useLocalSearchParams(); // ✅ correct
  const slides = gender === 'girl' ? girlSlides : boySlides;

  const flatListRef = useRef();
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    if (currentIndex < slides.length - 1) {
      flatListRef.current.scrollToIndex({ index: currentIndex + 1, animated: true });
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      flatListRef.current.scrollToIndex({ index: currentIndex - 1, animated: true });
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* Slides */}
      
      <View className="px-6 pt-4 ">
  <TouchableOpacity
    onPress={() => router.push("/home")}
    className="flex-row items-center justify-center bg-red-500 px-6 py-3 rounded-full shadow-lg"
  >
    <Ionicons name="arrow-back-circle-outline" size={24} color="white" />
    <Text className="text-white font-bold text-lg">Back to Home</Text>
  </TouchableOpacity>
</View>

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
      />

      {/* Page Counter */}
      <View className="bottom-7 left-0 right-0 items-center">
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
          <Text className="text-white font-semibold">  Back</Text>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={handleNext}
          disabled={currentIndex === slides.length - 1}
          className={`px-8 py-4 rounded-full ${
            currentIndex === slides.length - 1 ? "bg-gray-300" : "bg-blue-600"
          }`}
        >
          <Text className="text-white font-semibold">Next</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
                                                                                                                    