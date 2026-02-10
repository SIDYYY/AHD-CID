import React from 'react';
import { View, Text, Animated, TouchableOpacity, Image, ScrollView } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';
import Logo from "../assets/images/CID-AHD-LOGO.jpg";


export default function GenderSelection() {
  const router = useRouter();

  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  const handleSelect = (gender) => {
    router.push({
      pathname: '/module',
      params: { gender },
    });
  };

  const renderCard = (gender, bgColor, iconName) => {
    const scale = new Animated.Value(1);

    const onPressIn = () => {
      Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start();
    };
    const onPressOut = () => {
      Animated.spring(scale, { toValue: 1, friction: 3, useNativeDriver: true }).start();
    };

    return (
      <AnimatedTouchable
        onPress={() => handleSelect(gender)}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={{ transform: [{ scale }] }}
        className={`flex-row items-center justify-center w-full py-6 px-8 rounded-3xl mb-6 shadow-lg ${bgColor}`}
        activeOpacity={0.9}
      >
        <FontAwesome5
          name={iconName}
          size={40}
          color="white"
          className="mr-4"
        />
        <Text className="text-white font-bold text-2xl">
          {gender === 'boy' ? 'Boy' : 'Girl'}
        </Text>
      </AnimatedTouchable>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-[#517aeb] ">

        <View className="flex-row items-center px-6 py-4  rounded-b-3xl">
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

    <View className="flex-1 px-6 justify-center items-center bg-white ">
<Text className="text-3xl font-bold mb-10 text-gray-900 text-center">
        Know More About Your Gender
      </Text>
      {renderCard('boy', 'bg-blue-600', 'male')}

      {/* OR Divider */}
      <Text className="text-gray-500 font-bold text-xl mb-6">OR</Text>

      {renderCard('girl', 'bg-pink-600', 'female')}
      </View>
    </SafeAreaView>
  );
}
