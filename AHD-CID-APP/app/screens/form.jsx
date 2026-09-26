import React, { useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Alert,
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { supabase } from '../../lib/supabase';
import { useRouter, useLocalSearchParams } from 'expo-router';

const FormScreen = () => {
  const router = useRouter();
const {
  serviceId,
  serviceName,
  subServiceId,
  subServiceName,
  facilityId,
  facilityName,
} = useLocalSearchParams();

  const [formData, setFormData] = useState({
    full_name: '',
    address: '',
    birthdate: '',
    guardian_name: '',
    contact_no: '',
    preferred_date: '',
  });

  const [showBirthPicker, setShowBirthPicker] = useState(false);
  const [showPreferredPicker, setShowPreferredPicker] = useState(false);

  const handleChange = (key, value) => {
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const formatDate = (date) => date.toISOString().split('T')[0];

  const handleSubmit = async () => {
    if (Object.values(formData).some(v => !v)) {
      Alert.alert('Error', 'Please fill all required fields.');
      return;
    }

    if (formData.contact_no.length < 10) {
      Alert.alert('Error', 'Please enter a valid contact number.');
      return;
    }

    const { error } = await supabase
      .from('service_requests')
      .insert([{
        ...formData,
        service_id: Number(serviceId),
        subservice_id: Number(subServiceId),
        facilities_id: Number(facilityId),
      }]);

    if (error) {
      Alert.alert('Error', 'Failed to submit request.');
    } else {
      Alert.alert('Success', 'Service request submitted!');
      router.replace('/home');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={{ padding: 20 }}>

          {/* HEADER */}
          <View className="mb-5">
            <Text className="text-2xl font-bold text-gray-900">
              Service Request Form
            </Text>
            <Text className="text-gray-600 mt-1">
              Review your selected service below
            </Text>
          </View>

          {/* 🔒 SELECTION SUMMARY */}
          <View className="bg-blue-50 border border-blue-200 p-4 rounded-xl mb-6">
            <Text className="font-semibold text-gray-800 mb-1">
              Selected Service
            </Text>
            <Text className="text-gray-700">• {serviceName}</Text>

            <Text className="font-semibold text-gray-800 mt-2 mb-1">
              Sub-Service
            </Text>
            <Text className="text-gray-700">• {subServiceName}</Text>

            <Text className="font-semibold text-gray-800 mt-2 mb-1">
              Facility
            </Text>
            <Text className="text-gray-700">• {facilityName}</Text>
          </View>

          {/* FORM CARD */}
          <View className="bg-white p-5 rounded-xl shadow-md">

            <Text className="font-semibold mb-1">Full Name *</Text>
            <TextInput
              className="border rounded-md px-3 py-2 mb-4"
              value={formData.full_name}
              onChangeText={t => handleChange('full_name', t)}
            />

            <Text className="font-semibold mb-1">Address *</Text>
            <TextInput
              className="border rounded-md px-3 py-2 mb-4"
              value={formData.address}
              onChangeText={t => handleChange('address', t)}
            />

            <Text className="font-semibold mb-1">Birthdate *</Text>
            <TouchableOpacity
              className="border rounded-md px-3 py-3 mb-4"
              onPress={() => setShowBirthPicker(true)}
            >
              <Text>
                {formData.birthdate || "Select birthdate"}
              </Text>
            </TouchableOpacity>

            {showBirthPicker && (
              <DateTimePicker
                value={new Date()}
                mode="date"
                maximumDate={new Date()}
                onChange={(e, d) => {
                  setShowBirthPicker(false);
                  if (d) handleChange('birthdate', formatDate(d));
                }}
              />
            )}

            <Text className="font-semibold mb-1">Guardian Name *</Text>
            <TextInput
              className="border rounded-md px-3 py-2 mb-4"
              value={formData.guardian_name}
              onChangeText={t => handleChange('guardian_name', t)}
            />

            <Text className="font-semibold mb-1">Contact No. *</Text>
            <TextInput
              maxLength={11}
              keyboardType="phone-pad"
              className="border rounded-md px-3 py-2 mb-4"
              value={formData.contact_no}
              onChangeText={t => handleChange('contact_no', t)}
            />

            <Text className="font-semibold mb-1">Preferred Date *</Text>
            <TouchableOpacity
              className="border rounded-md px-3 py-3 mb-6"
              onPress={() => setShowPreferredPicker(true)}
            >
              <Text>
                {formData.preferred_date || "Select preferred date"}
              </Text>
            </TouchableOpacity>

            {showPreferredPicker && (
              <DateTimePicker
                value={new Date()}
                mode="date"
                minimumDate={new Date()}
                onChange={(e, d) => {
                  setShowPreferredPicker(false);
                  if (d) handleChange('preferred_date', formatDate(d));
                }}
              />
            )}

            <TouchableOpacity
              className="bg-blue-700 py-3 rounded-md"
              onPress={handleSubmit}
            >
              <Text className="text-white text-center font-bold text-lg">
                Submit Request
              </Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default FormScreen;