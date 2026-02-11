// app/serviceReq/form.js
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import {
  View,
  Text,
  TextInput,
  Pressable,
  TouchableOpacity,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import { supabase } from '../../lib/supabase';
import { useRouter, useLocalSearchParams } from 'expo-router';

const FormScreen = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { serviceId, serviceName, subServiceId, subServiceName } = params;

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
    setFormData({ ...formData, [key]: value });
  };

  const formatDate = (date) => {
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
  };

  const handleSubmit = async () => {
    if (
      !formData.full_name ||
      !formData.address ||
      !formData.birthdate ||
      !formData.guardian_name ||
      !formData.contact_no ||
      !formData.preferred_date
    ) {
      Alert.alert('Error', 'Please fill all required fields.');
      return;
    }

    if (formData.contact_no.length < 10) {
      Alert.alert('Error', 'Please enter a valid contact number.');
      return;
    }

    const { error } = await supabase.from('service_requests').insert([
      {
        ...formData,
        service_id: serviceId,
        sub_service_id: subServiceId,
      }
    ]);

    if (error) {
      Alert.alert('Error', 'Failed to submit request');
    } else {
      Alert.alert('Success', 'Service request submitted!');
      router.replace('/home');
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1, justifyContent: "center" }}
          keyboardShouldPersistTaps="handled"
        >

      {/* Header */}
      <View className="bg-white px-6 py-5 shadow-sm">
        <Text className="text-2xl font-bold text-gray-900">{serviceName}</Text>
        <Text className="text-gray-600 text-sm mt-1">{subServiceName} Form</Text>
      </View>

      {/* Form */}
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        <View className="bg-white p-5 rounded-xl shadow-md">

          {/* Full Name */}
          <Text className="text-gray-800 font-semibold mb-1">Full Name *</Text>
          <TextInput
            placeholder="Full Name"
            value={formData.full_name}
            onChangeText={text => handleChange('full_name', text)}
            className="border border-gray-300 rounded-md px-3 py-2 mb-4"
          />

          {/* Address */}
          <Text className="text-gray-800 font-semibold mb-1">Address *</Text>
          <TextInput
            placeholder="Address"
            value={formData.address}
            onChangeText={text => handleChange('address', text)}
            className="border border-gray-300 rounded-md px-3 py-2 mb-4"
          />

          {/* Birthdate */}
          <Text className="text-gray-800 font-semibold mb-1">Birthdate *</Text>
          <TouchableOpacity
            onPress={() => setShowBirthPicker(true)}
            className="border border-gray-300 rounded-md px-3 py-3 mb-4"
          >
            <Text className={formData.birthdate ? "text-black" : "text-gray-400"}>
              {formData.birthdate || "Select birthdate"}
            </Text>
          </TouchableOpacity>

          {showBirthPicker && (
            <DateTimePicker
              value={formData.birthdate ? new Date(formData.birthdate) : new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              maximumDate={new Date()}
              onChange={(event, selectedDate) => {
                setShowBirthPicker(false);
                if (selectedDate) {
                  handleChange('birthdate', formatDate(selectedDate));
                }
              }}
            />
          )}

          {/* Guardian Name */}
          <Text className="text-gray-800 font-semibold mb-1">Guardian Name *</Text>
          <TextInput
            placeholder="Guardian Name"
            value={formData.guardian_name}
            onChangeText={text => handleChange('guardian_name', text)}
            className="border border-gray-300 rounded-md px-3 py-2 mb-4"
          />

          {/* Contact No */}
          <Text className="text-gray-800 font-semibold mb-1">Contact No. *</Text>
          <TextInput
            placeholder="09XXXXXXXXX"
            keyboardType="phone-pad"
            value={formData.contact_no}
            onChangeText={text => handleChange('contact_no', text)}
            className="border border-gray-300 rounded-md px-3 py-2 mb-4"
          />

          {/* Preferred Date */}
          <Text className="text-gray-800 font-semibold mb-1">Preferred Date *</Text>
          <TouchableOpacity
            onPress={() => setShowPreferredPicker(true)}
            className="border border-gray-300 rounded-md px-3 py-3 mb-6"
          >
            <Text className={formData.preferred_date ? "text-black" : "text-gray-400"}>
              {formData.preferred_date || "Select preferred date"}
            </Text>
          </TouchableOpacity>

          {showPreferredPicker && (
            <DateTimePicker
              value={formData.preferred_date ? new Date(formData.preferred_date) : new Date()}
              mode="date"
              display={Platform.OS === 'ios' ? 'spinner' : 'default'}
              minimumDate={new Date()}
              onChange={(event, selectedDate) => {
                setShowPreferredPicker(false);
                if (selectedDate) {
                  handleChange('preferred_date', formatDate(selectedDate));
                }
              }}
            />
          )}

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-blue-700 py-3 rounded-md"
          >
            <Text className="text-center text-white font-bold text-lg">
              Submit Request
            </Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
      </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default FormScreen;
