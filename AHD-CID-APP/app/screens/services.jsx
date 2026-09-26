import React, { useEffect, useState, useRef } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Animated,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';
import { useRouter } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

/* ---------------- ICON MAP ---------------- */

const serviceIcons = {
  1: { name: 'hand-holding', color: '#1f2937' },
  2: { name: 'car', color: '#2563eb' },
  3: { name: 'book', color: '#047857' },
  4: { name: 'medkit', color: '#dc2626' },
  5: { name: 'users', color: '#6b7280' },
  6: { name: 'paint-brush', color: '#b45309' },
  7: { name: 'file-alt', color: '#6d28d9' },
  8: { name: 'tree', color: '#16a34a' },
};

/* ---------------- SERVICE CARD COMPONENT ---------------- */

const ServiceCard = ({ item, onPress }) => {
  const scale = useRef(new Animated.Value(1)).current;

  const onPressIn = () => {
    Animated.spring(scale, {
      toValue: 0.97,
      useNativeDriver: true,
    }).start();
  };

  const onPressOut = () => {
    Animated.spring(scale, {
      toValue: 1,
      friction: 4,
      useNativeDriver: true,
    }).start();
  };

  const icon = serviceIcons[item.id] || {
    name: 'cogs',
    color: '#374151',
  };

  return (
    <Animated.View
      style={{ transform: [{ scale }] }}
      className="flex-1 m-2"
    >
      <TouchableOpacity
        activeOpacity={0.9}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onPress={onPress}
        className="bg-white rounded-xl p-5 items-center justify-center shadow-sm"
      >
        <FontAwesome5
          name={icon.name}
          size={40}
          color={icon.color}
          style={{ marginBottom: 12 }}
        />

        <Text className="text-center text-base font-semibold text-gray-800">
          {item.name}
        </Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

/* ---------------- MAIN SCREEN ---------------- */

const ServiceScreen = () => {
  const router = useRouter();
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from('services')
      .select('id, name, description')
      .eq('is_active', true)
      .order('created_at', { ascending: true });

    if (error) {
      console.log('Supabase error:', error);
    } else {
      setServices(data || []);
    }

    setLoading(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-[#0c4799] px-6 py-5 shadow-sm">
        <Text className="text-2xl font-bold text-white">
          Community Improvement Division
        </Text>
        <Text className="text-white text-sm mt-1">
          City Government Services
        </Text>
      </View>

      {/* Content */}
      <View className="flex-1 p-4">
        <Text className="text-xl font-bold text-gray-900 mb-4 text-center">
          What services do you need today?
        </Text>

        {loading && (
          <ActivityIndicator size="large" color="#2563eb" />
        )}

        {!loading && services.length === 0 && (
          <Text className="text-center text-gray-500 mt-10">
            No services available.
          </Text>
        )}

        {!loading && services.length > 0 && (
          <FlatList
            data={services}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2}
            showsVerticalScrollIndicator={false}
            renderItem={({ item }) => (
              <ServiceCard
                item={item}
                onPress={() =>
                  router.push({
                    pathname: 'screens/subservice',
                    params: {
                      serviceId: item.id,
                      serviceName: item.name,
                      description: item.description,
                    },
                  })
                }
              />
            )}
            contentContainerStyle={{ paddingBottom: 24 }}
          />
        )}
      </View>
    </SafeAreaView>
  );
};

export default ServiceScreen;
