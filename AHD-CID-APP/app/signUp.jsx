import { View, Text, TextInput, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function SignUp() {
  const router = useRouter();

  return (
      <View className="flex-1 bg-white justify-center px-5">

        <View className="bg-[#fdacda] p-10 rounded-xl">
        {/* Title */}
        <Text className="text-3xl font-bold text-center text-primary mb-2">
          Create Account  
        </Text>
        <Text className="text-gray-500 text-center mb-8">
          Sign up to get started
        </Text>

        {/* Full Name */}
        <View className="mb-4">
          <Text className="text-gray-700 mb-1">Last Name</Text>
          <TextInput
            placeholder="Enter your last name"
            className="border border-[#FF1D9D] bg-[#F7D5E8] rounded-3xl px-4 py-3 text-base"
          />
        </View>
        <View className="mb-4">
          <Text className="text-gray-700 mb-1">First Name</Text>
          <TextInput
            placeholder="Enter your first name"
            className="border border-[#FF1D9D] bg-[#F7D5E8] rounded-3xl px-4 py-3 text-base"
          />
        </View>

        {/* Email */}
        <View className="mb-4">
          <Text className="text-gray-700 mb-1">Phone Number</Text>
          <TextInput
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            autoCapitalize="none"
            className="border border-[#FF1D9D] bg-[#F7D5E8] rounded-3xl px-4 py-3 text-base"
          />
        </View>

        {/* Password */}
        <View className="mb-4">
          <Text className="text-gray-700 mb-1">Password</Text>
          <TextInput
            placeholder="Create a password"
            secureTextEntry
            className="border border-[#FF1D9D] bg-[#F7D5E8] rounded-3xl px-4 py-3 text-base"
          />
        </View>

        {/* Confirm Password */}
        <View className="mb-6">
          <Text className="text-gray-700 mb-1">Confirm Password</Text>
          <TextInput
            placeholder="Confirm your password"
            secureTextEntry
            className="border border-[#FF1D9D] bg-[#F7D5E8] rounded-3xl px-4 py-3 text-base"
          />
        </View>

        {/* Sign Up Button */}
        <Pressable
          onPress={() => router.replace("/home")}
          className="bg-[#FF1D9D] py-4 mx-10 rounded-3xl mb-4"
        >
          <Text className="text-white text-center font-semibold text-lg">
            Sign Up
          </Text>
        </Pressable>

        {/* Login Redirect */}
        <Pressable onPress={() => router.replace("/login")}>
          <Text className="text-center text-gray-500">
            Already have an account?{" "}
            <Text className="text-accent font-bold underline">Login</Text>
          </Text>
        </Pressable>
      </View>
      </View>
  );
}
