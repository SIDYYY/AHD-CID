import { View, Text, Image, Pressable, ScrollView, KeyboardAvoidingView } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import Logo from "../assets/images/CID-AHD-LOGO.jpg";

export default function Home() {
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-[#517aeb]">
      {/* Header */}
      <View className="flex-row items-center px-6 py-4  rounded-b-3xl">
        <Image
          source={Logo}
          style={{ width: 80, height: 80, borderRadius: 10 }}
          resizeMode="contain"
        />
        <View className="ml-4">
          <Text className="text-2xl font-bold text-white">CID AHD CDO</Text>
          <Text className="text-sm text-white">
            Community Improvement Division
          </Text>
        </View>
      </View>

      {/* Main Actions */}
      <ScrollView className="flex-1 px-6  bg-white ">
        <Text className="text-xl font-semibold text-gray-900 mt-10 mb-5">
          Welcome! Choose an action below:
        </Text>

        {/* Request Service Button */}
        <Pressable
          onPress={() => router.push("screens/services")}
          className="bg-[#517aeb] py-6 rounded-xl items-center mb-6 shadow"
        >
          <Text className="text-white font-bold text-lg">Request a Service</Text>
        </Pressable>

        {/* Modules / Educational Resources Button */}
        <Pressable
          onPress={() => router.push("/gender")}
          className="bg-white border border-gray-300 py-6 rounded-xl items-center mb-6 shadow"
        >
          <Text className="text-gray-900 font-bold text-lg">
            Explore Modules
          </Text>
          <Text className="text-gray-500 text-sm mt-1">
            Learn about gender, health, and adolescent development
          </Text>
        </Pressable>

      </ScrollView>
    </SafeAreaView>
  );
}
