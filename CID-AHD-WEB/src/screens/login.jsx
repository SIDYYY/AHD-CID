import { View, Text, TextInput, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import { Ionicons } from "@expo/vector-icons";

export default function LoginInput() {
  const router = useRouter();

  return (
    <View className="flex-1 bg-white justify-center">

      {/* Logo / Image */}
      <View className=" items-center mt-8 mb-2 py-7">
        <Image
          source={require("../assets/images/CID-AHD-LOGO.jpg")}
          style={{ width: 500, height: 300 }}
          className="w-40 h-40"
          resizeMode="contain"
        />
      </View>


      {/* Phone Number Input */}
      <View className="p-5 bg-[#CFDBEB] rounded-2xl"> 
      <View className="mt-8 mb-4 px-4">

        <View className="flex-row items-center border border-[#053F8E] bg-[#CFDBEB] rounded-3xl px-4">
          <Ionicons name="call-outline" size={20} color="#053F8E" />
          <TextInput
            placeholder="Enter your phone number"
            keyboardType="phone-pad"
            className="flex-1 py-3 pl-3 text-base text-gray-800"
          />
        </View>
      </View>

      {/* Password Input */}
      <View className="mb-12 px-4">


        <View className="flex-row items-center border border-[#053F8E] bg-[#CFDBEB] rounded-3xl px-4">
          <Ionicons name="lock-closed-outline" size={20} color="#053F8E" />
          <TextInput
            placeholder="Enter your password"
            secureTextEntry
            className="flex-1 py-3 pl-3 text-base text-gray-800"
          />
        </View>
      </View>

      {/* Login Button */}
      <View className="px-10">
        <Pressable
          onPress={() => router.replace("/home")}
          className="bg-[#053F8E] py-3 rounded-3xl">
          <Text className="text-white text-center font-bold text-lg">
            Login
          </Text>
        </Pressable>
      </View>
    </View>
    </View>
  );
}