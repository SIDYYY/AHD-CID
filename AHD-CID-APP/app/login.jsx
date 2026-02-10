import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Pressable,
  Image,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { SafeAreaView } from "react-native-safe-area-context";
import { supabase } from "../lib/supabase";
import bcrypt from "bcryptjs";

export default function LoginInput() {
  const router = useRouter();

  const [contactNo, setContactNo] = useState(""); // only contact number
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);

    try {
      // 1️⃣ Fetch user by contact_no
      const { data, error } = await supabase
        .from("users")
        .select("*")
        .eq("contact_no", contactNo.trim())
        .single();

      if (error || !data) {
        throw new Error("Invalid credentials");
      }

      // 2️⃣ Compare hashed password
      const isMatch = await bcrypt.compare(password, data.password);
      if (!isMatch) {
        throw new Error("Invalid credentials");
      }

      // 3️⃣ Only allow 'user' role for mobile login
      if (data.role !== "user") {
        throw new Error("This account can only log in via web");
      }

      // 4️⃣ Success alert
      Alert.alert(
        "Login Successful",
        `Welcome, ${data.full_name}!`,
        [
          {
            text: "OK",
            onPress: () => router.replace("/home"), // navigate after pressing OK
          },
        ],
        { cancelable: false }
      );
    } catch (err) {
      Alert.alert("Login Failed", err.message, [{ text: "OK" }], {
        cancelable: false,
      });
    } finally {
      setLoading(false);
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
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View className="flex-1 justify-center">
              {/* Logo */}
              <View className="items-center mt-8 mb-2 py-7">
                <Image
                  source={require("../assets/images/CID-AHD-LOGO.jpg")}
                  style={{ width: 300, height: 200 }}
                  resizeMode="contain"
                />
              </View>

              {/* Card */}
              <View className="mx-5 p-6 bg-[#CFDBEB] rounded-3xl shadow">
                <Text className="text-start text-[#053F8E] font-semibold text-3xl mb-5">Login</Text>
                {/* Contact Number */}
                <View className="mb-4">
                  <View className="flex-row items-center border border-[#053F8E] bg-[#CFDBEB] rounded-3xl px-4">
                    <Ionicons name="call-outline" size={20} color="#053F8E" />
                    <TextInput
                      placeholder="Enter your contact number"
                      keyboardType="phone-pad"
                      value={contactNo}
                      onChangeText={setContactNo}
                      className="flex-1 py-3 pl-3 text-base text-gray-800"
                    />
                  </View>
                </View>

                {/* Password */}
                <View className="mb-8">
                  <View className="flex-row items-center border border-[#053F8E] bg-[#CFDBEB] rounded-3xl px-4">
                    <Ionicons
                      name="lock-closed-outline"
                      size={20}
                      color="#053F8E"
                    />
                    <TextInput
                      placeholder="Enter your password"
                      secureTextEntry
                      value={password}
                      onChangeText={setPassword}
                      className="flex-1 py-3 pl-3 text-base text-gray-800"
                    />
                  </View>
                </View>

                {/* Login Button */}
                <Pressable
                  onPress={handleLogin}
                  disabled={loading}
                  className="bg-[#053F8E] py-4 rounded-3xl items-center"
                >
                  {loading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text className="text-white font-bold text-lg">Login</Text>
                  )}
                </Pressable>
                <Pressable className="mt-5" onPress={() => router.replace("/signUp")}>
                  <Text className="text-center text-gray-500">
                    Don't have account yet?{" "}
                    <Text className="text-accent font-bold underline ">Register</Text>
                  </Text>
                </Pressable>
              </View>
                  

            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
