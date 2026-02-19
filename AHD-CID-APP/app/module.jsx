import React, { useRef, useState, memo } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { FlatList, View, Dimensions, TouchableOpacity, Text, Modal } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { Ionicons } from "@expo/vector-icons";
import {
  GestureHandlerRootView,
  PinchGestureHandler,
  PanGestureHandler,
  TapGestureHandler
} from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  runOnJS
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

/* ---------------- SLIDES ---------------- */
const boySlides = [
  require('../assets/images/boy/1.png'),
  require('../assets/images/boy/2.png'),
  require('../assets/images/boy/3.png'),
  require('../assets/images/boy/4.png'),
  require('../assets/images/boy/5.png'),
  require('../assets/images/boy/6.png'),
  require('../assets/images/boy/7.png'),
  require('../assets/images/boy/8.png'),
  require('../assets/images/boy/9.png'),
  require('../assets/images/boy/10.png'),
  require('../assets/images/boy/11.png'),
  require('../assets/images/boy/12.png'),
  require('../assets/images/boy/13.png'),
  require('../assets/images/boy/14.png'),
  require('../assets/images/boy/15.png'),
  require('../assets/images/boy/16.png'),
  require('../assets/images/boy/17.png'),
  require('../assets/images/boy/18.png'),
  require('../assets/images/boy/19.png')
];

const girlSlides = [
  require('../assets/images/girl/1.png'),
  require('../assets/images/girl/2.png'),
  require('../assets/images/girl/3.png'),
  require('../assets/images/girl/4.png'),
  require('../assets/images/girl/5.png'),
  require('../assets/images/girl/6.png'),
  require('../assets/images/girl/7.png'),
  require('../assets/images/girl/8.png'),
  require('../assets/images/girl/9.png'),
  require('../assets/images/girl/10.png'),
  require('../assets/images/girl/11.png'),
  require('../assets/images/girl/12.png'),
  require('../assets/images/girl/13.png'),
  require('../assets/images/girl/14.png'),
  require('../assets/images/girl/15.png'),
  require('../assets/images/girl/16.png'),
  require('../assets/images/girl/17.png'),
  require('../assets/images/girl/18.png'),
  require('../assets/images/girl/19.png')
];

/* ---------------- TOPICS ---------------- */
const boyTopics = [
  { title: "Module Introduction", start: 0, end: 3 },
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
  { title: "Module Introduction", start: 0, end: 3 },
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

/* ---------------- COMPONENT ---------------- */
export default function ModuleViewer() {
  const router = useRouter();
  const { gender } = useLocalSearchParams();

  const slides = gender === 'girl' ? girlSlides : boySlides;
  const topics = gender === 'girl' ? girlTopics : boyTopics;

  const flatListRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showTOC, setShowTOC] = useState(false);
  const [isZoomed, setIsZoomed] = useState(false);

  const zoomStates = useRef(slides.map(() => ({
    scale: 1,
    translateX: 0,
    translateY: 0,
  })));

  const goToPage = (index) => {
    if (index < 0 || index >= slides.length) return;
    zoomStates.current[index] = { scale: 1, translateX: 0, translateY: 0 };
    setIsZoomed(false);
    flatListRef.current?.scrollToIndex({ index, animated: true });
    setCurrentIndex(index);
    setShowTOC(false);
  };

  const getItemLayout = (_, index) => ({
    length: width,
    offset: width * index,
    index,
  });

  /* ---------------- ZOOMABLE IMAGE ---------------- */
const ZoomableImage = memo(({ source, index }) => {
  const scale = useSharedValue(zoomStates.current[index].scale);
  const translateX = useSharedValue(zoomStates.current[index].translateX);
  const translateY = useSharedValue(zoomStates.current[index].translateY);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { scale: scale.value },
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  const doubleTap = () => {
    if (scale.value > 1) {
      scale.value = withTiming(1);
      translateX.value = withTiming(0);
      translateY.value = withTiming(0);
      zoomStates.current[index] = { scale: 1, translateX: 0, translateY: 0 };
      runOnJS(setIsZoomed)(false);
    } else {
      scale.value = withTiming(2);
      zoomStates.current[index].scale = 2;
      runOnJS(setIsZoomed)(true);
    }
  };

  const onPanGestureEvent = (e) => {
    if (scale.value <= 1) return; // do not pan when not zoomed
    const imageWidth = width * scale.value;
    const imageHeight = (height - 200) * scale.value;

    const maxTranslateX = (imageWidth - width) / 2;
    const maxTranslateY = (imageHeight - (height - 200)) / 2;

    translateX.value = Math.min(
      Math.max(zoomStates.current[index].translateX + e.nativeEvent.translationX, -maxTranslateX),
      maxTranslateX
    );
    translateY.value = Math.min(
      Math.max(zoomStates.current[index].translateY + e.nativeEvent.translationY, -maxTranslateY),
      maxTranslateY
    );
  };

  const onPanGestureEnd = (e) => {
    if (scale.value > 1) {
      // Save pan position
      zoomStates.current[index].translateX = translateX.value;
      zoomStates.current[index].translateY = translateY.value;

      const imageWidth = width * scale.value;
      const overflow = (imageWidth - width) / 2;

      // Swipe only if dragged past edges
      if (translateX.value > overflow + 10) runOnJS(goToPage)(currentIndex - 1);
      else if (translateX.value < -overflow - 10) runOnJS(goToPage)(currentIndex + 1);
    } else {
      // If not zoomed, detect simple swipe
      if (e.nativeEvent.translationX > 10) runOnJS(goToPage)(currentIndex - 1);
      else if (e.nativeEvent.translationX < -10) runOnJS(goToPage)(currentIndex + 1);
    }
  };


    return (
      <TapGestureHandler numberOfTaps={2} onActivated={() => runOnJS(doubleTap)()}>
        <PinchGestureHandler
          onGestureEvent={(e) => {
            scale.value = Math.max(1, zoomStates.current[index].scale * e.nativeEvent.scale);
          }}
          onEnded={() => {
            zoomStates.current[index].scale = scale.value;
            runOnJS(setIsZoomed)(scale.value > 1);
          }}
        >
          <PanGestureHandler
            onGestureEvent={onPanGestureEvent}
            onEnded={onPanGestureEnd}
          >
            <Animated.Image
              source={source}
              style={[{ width, height: height - 200, resizeMode: 'contain' }, animatedStyle]}
            />
          </PanGestureHandler>
        </PinchGestureHandler>
      </TapGestureHandler>
    );
  });

  /* ---------------- RENDER ---------------- */
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <SafeAreaView className="flex-1 bg-white">

        {/* Header */}
        <View className="flex-row items-center justify-between px-6 pt-4">
          <TouchableOpacity
            onPress={() => router.push("/home")}
            className="flex-row items-center bg-red-500 px-5 py-3 rounded-full"
          >
            <Ionicons name="arrow-back-circle-outline" size={22} color="white" />
            <Text className="text-white font-bold ml-2">Back</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowTOC(true)}
            className="flex-row items-center bg-blue-600 px-5 py-3 rounded-full"
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
          removeClippedSubviews={true}
          pagingEnabled={true}
          scrollEnabled={true} // allow swipe always
          showsHorizontalScrollIndicator={false}
          keyExtractor={(_, index) => index.toString()}
          renderItem={({ item, index }) => (
            <View style={{ width, alignItems: 'center' }}>
              {currentIndex === index && <ZoomableImage source={item} index={index} />}
            </View>
          )}
          onMomentumScrollEnd={(e) => {
            const newIndex = Math.round(e.nativeEvent.contentOffset.x / width);
            zoomStates.current[newIndex] = { scale: 1, translateX: 0, translateY: 0 };
            setIsZoomed(false);
            setCurrentIndex(newIndex);
          }}
          getItemLayout={getItemLayout}
          initialNumToRender={1}
          maxToRenderPerBatch={1}
          windowSize={2}
        />

        {/* Page Counter */}
        <View className="absolute bottom-24 left-0 right-0 items-center ">
          <Text className="text-gray-600 font-semibold bg-white border px-5 py-3 rounded-xl">
            Page {currentIndex + 1} / {slides.length}
          </Text>
        </View>

        {/* Navigation Buttons */}
        <View className="flex-row justify-between px-4 mt-4 mb-8 absolute bottom-14 w-full">
          <TouchableOpacity
            disabled={currentIndex === 0}
            onPress={() => goToPage(currentIndex - 1)}
            className={`px-4 py-5 rounded-full ${currentIndex === 0 ? "bg-gray-300" : "bg-blue-500"}`}
          >
            <Text className="text-white font-bold">Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity
            disabled={currentIndex === slides.length - 1}
            onPress={() => goToPage(currentIndex + 1)}
            className={`px-6 py-5 rounded-full ${currentIndex === slides.length - 1 ? "bg-gray-300" : "bg-blue-500"}`}
          >
            <Text className="text-white font-bold">Next</Text>
          </TouchableOpacity>
        </View>

        {/* TOC Modal */}
        <Modal visible={showTOC} transparent animationType="fade">
          <View className="flex-1 bg-black/50 justify-center items-center">
            <View className="bg-white w-11/12 max-h-[80%] rounded-2xl p-4">
              <Text className="text-xl font-bold mb-4 text-center">
                {gender?.toUpperCase()} Table of Contents
              </Text>

              <FlatList
                data={topics}
                keyExtractor={(_, i) => i.toString()}
                renderItem={({ item }) => (
                  <TouchableOpacity
                    onPress={() => goToPage(item.start)}
                    className={`p-4 rounded-xl mb-2 ${currentIndex >= item.start && currentIndex <= item.end ? "bg-blue-100" : "bg-gray-100"}`}
                  >
                    <Text className="font-semibold">{item.title}</Text>
                    <Text className="text-sm text-gray-500">
                      {item.start === item.end ? `Page ${item.start + 1}` : `Pages ${item.start + 1} - ${item.end + 1}`}
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
    </GestureHandlerRootView>
  );
}
