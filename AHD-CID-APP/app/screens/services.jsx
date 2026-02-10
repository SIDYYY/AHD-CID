// app/serviceReq/index.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from '../../lib/supabase';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

// Professional-style icon mapping
const serviceIcons = {
  1: { name: 'hand-holding', color: '#1f2937' }, // Social Services
  2: { name: 'car', color: '#2563eb' },          // Transport
  3: { name: 'book', color: '#047857' },         // Education / Learning
  4: { name: 'medkit', color: '#dc2626' },       // Health / Safety
  5: { name: 'users', color: '#6b7280' },        // Community / Family
  6: { name: 'paint-brush', color: '#b45309' },  // Arts / Creativity
  7: { name: 'file-alt', color: '#6d28d9' },     // Documentation / Records
  8: { name: 'tree', color: '#16a34a' },         // Environment / Outdoors
};

const ServiceScreen = () => {
  const [services, setServices] = useState([]);
  const router = useRouter();

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const { data, error } = await supabase.from('services').select('*');
    if (error) console.log(error);
    else setServices(data);
  };

  // Animated scaling effect
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  const renderItem = ({ item }) => {
    const scale = new Animated.Value(1);

    const onPressIn = () => {
      Animated.spring(scale, {
        toValue: 0.97,
        useNativeDriver: true,
      }).start();
    };

    const onPressOut = () => {
      Animated.spring(scale, {
        toValue: 1,
        friction: 3,
        useNativeDriver: true,
      }).start();
    };

    return (
      <AnimatedTouchable
        className="flex-1 m-2 bg-white rounded-xl p-5 items-center justify-center shadow-md"
        onPress={() =>
          router.push({
            pathname: 'screens/subservice',
            params: { serviceId: item.id, serviceName: item.name },
          })
        }
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={{ transform: [{ scale }] }}
      >
        {/* Icon */}
        <FontAwesome5
          name={serviceIcons[item.id]?.name || 'cogs'}
          size={40}
          color={serviceIcons[item.id]?.color || '#374151'}
          className="mb-3"
        />

        {/* Service Name */}
        <Text className="text-center text-base font-semibold text-gray-800">
          {item.name}
        </Text>
      </AnimatedTouchable>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-white px-6 py-5 shadow-sm">
        <Text className="text-2xl font-bold text-gray-900">
          Community Improvement Division
        </Text>
        <Text className="text-gray-600 text-sm mt-1">
          City Government Services
        </Text>
      </View>

      {/* Main Content */}
      <View className="flex-1 p-4">
        <Text className="text-xl font-bold text-gray-900 mb-4 text-center">
          What services do you need today? 
        </Text>

        <FlatList
          data={services}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default ServiceScreen;
