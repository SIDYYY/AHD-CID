import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Modal,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { supabase } from '../../lib/supabase';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { FontAwesome5 } from '@expo/vector-icons';

const SubServiceScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();

  // 🔴 CAST PARAMS
  const serviceId = Number(params.serviceId);
  const serviceName = params.serviceName;

  const [loading, setLoading] = useState(true);
  const [subservices, setSubservices] = useState([]);

  const [selectedSubservice, setSelectedSubservice] = useState(null);
  const [facilities, setFacilities] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  /* ---------------- FETCH SUBSERVICES ---------------- */

  useEffect(() => {
    if (!serviceId) return;
    fetchSubservices();
  }, [serviceId]);

  const fetchSubservices = async () => {
    setLoading(true);

    const { data, error } = await supabase
      .from('subservices')
      .select('id, subservices_name')
      .eq('service_id', serviceId);

    console.log('SUBSERVICES:', data); // 🔥 DEBUG

    if (error) {
      console.log('Subservice error:', error);
    } else {
      setSubservices(data || []);
    }

    setLoading(false);
  };

  /* ---------------- FETCH FACILITIES ---------------- */

  const openFacilities = async (subservice) => {
    setSelectedSubservice(subservice);
    setModalVisible(true);
    setFacilities([]);

    const { data, error } = await supabase
      .from('facilities_services')
      .select(`
        facilities (
          id,
          name,
          address
        )
      `)
      .eq('subservice_id', subservice.id);

    console.log('FACILITIES:', data); // 🔥 DEBUG

    if (error) {
      console.log('Facility error:', error);
    } else {
      setFacilities(data.map(d => d.facilities));
    }
  };

  /* ---------------- UI ---------------- */

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      {/* Header */}
      <View className="bg-[#0c4799] px-6 py-5 shadow-sm">
        <Text className="text-2xl font-bold text-white">
          {serviceName}
        </Text>
        <Text className="text-white text-sm mt-1">
          Choose the service you need
        </Text>
      </View>

      {/* Subservices */}
      <View className="flex-1 p-4 px-6">
        {loading && <ActivityIndicator size="large" color="#2563eb" />}

        {!loading && subservices.length === 0 && (
          <Text className="text-center text-gray-500 mt-10">
            No subservices found
          </Text>
        )}

        {!loading && (
          <FlatList
            data={subservices}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                className="bg-white rounded-xl p-7 mb-3 shadow-sm flex-row items-center"
                onPress={() => openFacilities(item)}
              >
                <FontAwesome5
                  name="clipboard-list"
                  size={18}
                  color="#2563eb"
                  style={{ marginRight: 12 }}
                />
                <Text className="text-base font-semibold text-gray-800">
                  {item.subservices_name}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>

      {/* ---------------- FACILITY MODAL ---------------- */}

      <Modal visible={modalVisible} transparent animationType="fade">
        <View className="flex-1 bg-black/40 justify-center px-6">
          <View className="bg-white rounded-xl p-5 max-h-[80%]">

            <Text className="text-lg text-white font-bold mb-3 bg-[#0c4799] p-3 rounded-md">
              {selectedSubservice?.subservices_name}
            </Text>

            {facilities.length === 0 && (
              <Text className="text-gray-500 text-center mt-4">
                No facilities available
              </Text>
            )}

            <FlatList
              data={facilities}
              keyExtractor={(item) => item.id.toString()}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="bg-gray-100 p-4 rounded-lg mb-2"
                  onPress={() => {
                    setModalVisible(false);
                    router.push({
                      pathname: 'screens/form',
                      params: {
                        serviceId,
                        serviceName,
                        subServiceId: selectedSubservice.id,
                        subServiceName: selectedSubservice.subservices_name,
                        facilityId: item.id,
                        facilityName: item.name,
                      },
                    });
                  }}
                >
                  <Text className="font-semibold text-gray-800">
                    {item.name}
                  </Text>
                  {item.address && (
                    <Text className="text-xs text-gray-600 mt-1">
                      {item.address}
                    </Text>
                  )}
                </TouchableOpacity>
              )}
            />

            <TouchableOpacity
              className="mt-3 py-2"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-center text-white font-semibold bg-red-500 p-4 rounded-full">
                Cancel
              </Text>
            </TouchableOpacity>

          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default SubServiceScreen;