// app/serviceReq/subService.js
import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

const SubServiceScreen = () => {
  const [subServices, setSubServices] = useState([]);
  const router = useRouter();
  const params = useLocalSearchParams();
  const { serviceId, serviceName } = params;

  useEffect(() => {
    fetchSubServices();
  }, []);

  const fetchSubServices = async () => {
    const { data, error } = await supabase
      .from('sub_services')
      .select('*')
      .eq('service_id', serviceId);

    if (error) console.log(error);
    else setSubServices(data);
  };

  // Animated touchable for subtle press effect
  const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);

  const renderItem = ({ item }) => {
    const scale = new Animated.Value(1);

    const onPressIn = () => {
      Animated.spring(scale, { toValue: 0.97, useNativeDriver: true }).start();
    };
    const onPressOut = () => {
      Animated.spring(scale, { toValue: 1, friction: 3, useNativeDriver: true }).start();
    };

    return (
      <AnimatedTouchable
        className="flex-1 m-2 bg-white rounded-xl p-5 items-center justify-center shadow-md"
        onPress={() =>
          router.push({
            pathname: 'screens/form',
            params: {
              serviceId,
              serviceName,
              subServiceId: item.id,
              subServiceName: item.name,
            },
          })
        }
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        style={{ transform: [{ scale }] }}
      >
        {/* Icon for subservice */}
        <FontAwesome5 name="cogs" size={35} color="#374151" className="mb-3" />

        {/* Sub-Service Name */}
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
        <Text className="text-2xl font-bold text-gray-900">{serviceName}</Text>
        <Text className="text-gray-600 text-sm mt-1">Select a Sub-Service</Text>
      </View>

      {/* Main content */}
      <View className="flex-1 p-4">
        <Text className="text-xl font-bold text-gray-900 mb-4 text-center">
        What type of {serviceName} services do you need?        
        </Text>
        <FlatList                                                                                                                                                                             
          data={subServices}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          numColumns={2} // 2 cards per row
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      </View>
    </SafeAreaView>
  );
};

export default SubServiceScreen;
