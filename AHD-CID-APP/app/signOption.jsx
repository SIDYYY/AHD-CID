import { View, Text, Image, Pressable } from "react-native";
import { useRouter } from "expo-router";

export default function Login() {
  const router = useRouter();

  return (
    <View className="flex-1 justify-center">
      <View className="items-center mt-3 mb-12 py-7">
        <Image
          source={require("../assets/images/CID-AHD-LOGO-rmvbg.png")}
          style={{ width: 500, height: 300 }}
          className="w-40 h-40"
          resizeMode="contain"
        />
      </View>

        {/* Inputs later */}
        <View className="px-10 bg-[#0c4799] p-10">
          <Pressable
            onPress={() => router.replace("/login")}
            className="mb-5 bg-[#fff] py-3 rounded-3xl">
            <Text className="text text-center font-bold text-lg">Login</Text>
          </Pressable>
          <Pressable
            onPress={() => router.replace("/home")}
            className="bg-[#fff] py-3 rounded-3xl">
            <Text className="text text-center font-bold text-lg">Continue as Guest</Text>
          </Pressable>
        </View>
        <View className="mt-10 flex-row items-center justify-center">
          <Text className="text-xl">Don't have an account? </Text>
            <Pressable
              onPress={() => router.replace("/signUp")}>
              <Text className="text-[#053F8E] underline text-center font-semibold text-lg">Sign Up</Text>
            </Pressable>
        </View>
      </View>

  );
}
