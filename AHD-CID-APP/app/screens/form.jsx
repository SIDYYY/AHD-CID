// app/serviceReq/form.js
import React, { useEffect, useState } from 'react';
import { SafeAreaView } from "react-native-safe-area-context";
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { supabase } from '../../lib/supabase';
import { useRouter, useLocalSearchParams } from 'expo-router';

const FormScreen = () => {
  const params = useLocalSearchParams();
  const router = useRouter();
  const { serviceId, serviceName, subServiceId, subServiceName } = params;

  const [providers, setProviders] = useState([]);
  const [formData, setFormData] = useState({
    full_name: '',
    address: '',
    birthdate: '',
    guardian_name: '',
    // provider_id: '',
    preferred_date: ''
  });

  useEffect(() => {
    fetchProviders();
  }, []);

  const fetchProviders = async () => {
    const { data, error } = await supabase.from('providers').select('*');
    if (error) console.log(error);
    else setProviders(data);
  };

  const handleChange = (key, value) =>
    setFormData({ ...formData, [key]: value });
// !formData.provider_id || 
  const handleSubmit = async () => {
    if (!formData.full_name || !formData.address || !formData.birthdate || !formData.preferred_date) {
      Alert.alert('Error', 'Please fill all required fields.');
      return;
    }

    const { error } = await supabase.from('service_requests').insert([
      {
        ...formData,
        service_id: serviceId,
        sub_service_id: subServiceId
      }
    ]);

    if (error) Alert.alert('Error', 'Failed to submit request');
    else {
      Alert.alert('Success', 'Service request submitted!');
      router.replace('/home'); // go back to Home
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-50">
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
          <Text className="text-gray-800 font-semibold mb-1">Birthdate (YYYY-MM-DD) *</Text>
          <TextInput
            placeholder="YYYY-MM-DD"
            value={formData.birthdate}
            onChangeText={text => handleChange('birthdate', text)}
            className="border border-gray-300 rounded-md px-3 py-2 mb-4"
          />

          {/* Guardian Name */}
          <Text className="text-gray-800 font-semibold mb-1">Guardian Name (Optional)</Text>
          <TextInput
            placeholder="Guardian Name"
            value={formData.guardian_name}
            onChangeText={text => handleChange('guardian_name', text)}
            className="border border-gray-300 rounded-md px-3 py-2 mb-4"
          />

          {/* Providers
          <Text className="text-gray-800 font-semibold mb-2">Select Provider *</Text>
          <View className="mb-4">
            {providers.map(provider => (
              <TouchableOpacity
                key={provider.id}
                onPress={() => handleChange('provider_id', provider.id)}
                className={`py-2 px-3 rounded-md mb-2 border ${
                  formData.provider_id === provider.id
                    ? 'bg-blue-600 border-blue-600'
                    : 'border-gray-300'
                }`}
              >
                <Text className={`text-center font-medium ${
                  formData.provider_id === provider.id ? 'text-white' : 'text-gray-800'
                }`}>
                  {provider.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View> */}

          {/* Preferred Date */}
          <Text className="text-gray-800 font-semibold mb-1">Preferred Date (YYYY-MM-DD) *</Text>
          <TextInput
            placeholder="YYYY-MM-DD"
            value={formData.preferred_date}
            onChangeText={text => handleChange('preferred_date', text)}
            className="border border-gray-300 rounded-md px-3 py-2 mb-6"
          />

          {/* Submit Button */}
          <TouchableOpacity
            onPress={handleSubmit}
            className="bg-blue-700 py-3 rounded-md"
          >
            <Text className="text-center text-white font-bold text-lg">Submit Request</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FormScreen;
