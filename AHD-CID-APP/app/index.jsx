import { View, Text, Pressable, Image } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useState } from "react";
import { useRouter } from "expo-router";
import Logo from "../assets/images/CID-AHD-LOGO.jpg";

    export default function Intro() {
    const router = useRouter();
    const [step, setStep] = useState(0);

    const slides = [
        {
        title: "Welcome to CID AHD CDO",
        description:
            "A safe and confidential space for counseling and mental health services.",
        },
        {
        title: "Support When You Need It",
        description:
            "Access mental health, family, and adolescent development services with ease.",
        },
        {
        title: "Easy & Confidential",
        description:
            "Choose a service, provide your details, and schedule an appointment securely.",
        },
    ];

    const handleNext = () => {
        if (step < slides.length - 1) {
        setStep(step + 1);
        } else {
        router.replace("/signOption");
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-white">
        <View className="flex-1 items-center justify-center px-6 bg-white">
        <Image
            source={Logo}
            style={{ width: 500, height: 300 }}
            resizeMode="contain"
            />
        <Text className="text-4xl mt-8 font-bold text-center text-gray-900">
            {slides[step].title}
        </Text>

        <Text className="mt-4 text-l font-bold text-center text-gray-600 px-7">
            {slides[step].description}
        </Text>

        {/* Progress Dots */}
       <View className="flex-row mt-6">
            {slides.map((_, index) => (
                <Pressable key={index} onPress={() => setStep(index)}>
                <View
                    className={`w-3 h-3 rounded-full mx-1 ${
                    step === index ? "bg-[#517aeb]" : "bg-gray-300"
                    }`}
                />
                </Pressable>
            ))}
            </View>

            <Pressable
            onPress={handleNext}
            className="mt-20 bg-[#2852c3] px-8 py-3 rounded-full"
            >
            <Text className="text-white text-xl font-semibold">
                {step === slides.length - 1 ? "Get Started" : "Next"}
            </Text>
            </Pressable>

        </View>
        </SafeAreaView>
    );
    }
