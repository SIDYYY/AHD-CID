import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Linking,
  Alert
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

const quizQuestions = [
  "Gakawad'an og gana mo kaon",
  "Namatikdan nimo ga gakitkit o gatimu-timu pag kaon sa junkfoods",
  "Galain ang ginhawa paghuman og kaon",
  "Gakitkit sa kuku ug pag dabug-dabug sa tiil o gahinuktok",
  "Dili ka pahulay o kahimotang",
  "Gakaulit o gakasuko",
  "Gibati og kakapoi sa pag skwela o pagtuon",
  "Permi ka gakalate sa skwelahan",
  "Dili magpapildi sa mga kompetisyon",
  "Dili magpapildi sa mga lalis",
  "Gakabalaka sa imong safety og siguridad",
  "Walay panahon sa imong pamilya",
  "Galisud ug tulog sa gabii",
  "Gainom ug makahubog labi kung nay problema",
  "Gasigarilyo pag makabati ug pressure",
  "Galisud ug buhi sa imong naandan nga hobbies",
  "Dili ga-enjoy sa imong ginabuhat",
  "Galisud na ug desisyon",
  "Gakabalaka sa imong ugmaon/future",
  "Dili na ka concentrate",
  "Galabad ang ulo",
  "Galikramo / gabagotbot / gatamudmud",
  "Galisud na ug smile o katawa labi na pag-abut sa balay"
];

const choices = [
  { label: "Permi", points: 3 },
  { label: "Kasagara", points: 2 },
  { label: "Talagsa", points: 1 },
  { label: "Wala gyud", points: 0 }
];

export default function QuickQuizScreen() {
  const router = useRouter();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState(Array(quizQuestions.length).fill(null));
  const [showResult, setShowResult] = useState(false);

  const selectAnswer = (points) => {
    const updated = [...answers];
    updated[currentIndex] = points;
    setAnswers(updated);
  };

  const getStressColor = (level) => {
    switch (level) {
      case "Very High":
        return "text-red-900";
      case "High":
        return "text-red-600";
      case "Moderate":
        return "text-yellow-500";
      default:
        return "text-green-600";
    }
  };

  const nextQuestion = () => {
    if (answers[currentIndex] === null) {
      Alert.alert("Notice", "Please select an answer before proceeding.");
      return;
    }

    if (currentIndex < quizQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setShowResult(true);
    }
  };

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const calculateScore = () =>
    answers.reduce((total, value) => total + (value || 0), 0);

  const getResult = (score) => {
    if (score <= 24)
      return {
        level: "Balanced",
        message:
          "You show minimal signs of stress. Continue maintaining healthy habits."
      };

    if (score <= 34)
      return {
        level: "Moderate",
        message:
          "Your stress level is moderate. Consider relaxation techniques."
      };

    if (score <= 44)
      return {
        level: "High",
        message:
          "Your stress level is high. Identify stress factors and seek guidance."
      };

    return {
      level: "Very High",
      message:
        "Your stress level is very high. Professional support is recommended."
    };
  };

  const resetQuiz = () => {
    setAnswers(Array(quizQuestions.length).fill(null));
    setCurrentIndex(0);
    setShowResult(false);
  };

  /* ================= RESULT SCREEN ================= */

  if (showResult) {
    const score = calculateScore();
    const result = getResult(score);

    return (
      <SafeAreaView className="flex-1">
        <ScrollView contentContainerStyle={{ padding: 20 , marginTop: 20}}>

          {/* Back Button
          <View className="flex-row items-center mb-8">
            <TouchableOpacity
              onPress={() => router.push("/home")}
              className="flex-row items-center bg-blue-900 px-5 py-3 rounded-full"
            >
              <Ionicons name="arrow-back-circle-outline" size={22} color="white" />
              <Text className="text-white font-bold ml-2">Back Home</Text>
            </TouchableOpacity>
          </View> */}

          {/* Title */}
          <Text className="text-2xl font-bold text-blue-900 mb-4">
            Youth Stress Assessment Result
          </Text>

          {/* Result Card */}
          <View className="bg-white p-5 rounded-xl border border-gray-200 mb-5">
            <Text className="text-lg font-bold mb-2">
              Total Score: {score}
            </Text>

            <Text className="text-base font-semibold mb-2">
              Stress Level:{" "}
              <Text className={`uppercase font-bold ${getStressColor(result.level)}`}>
                {result.level}
              </Text>
            </Text>

            <Text className="text-gray-700">
              {result.message}
            </Text>
          </View>

          {/* Support Section (ONLY High / Very High) */}
          {(result.level === "High" || result.level === "Very High") && (
            <View className="bg-red-50 p-5 rounded-xl border border-red-200 mb-5">

              <Text className="text-red-700 font-bold mb-3 text-lg">
                ⚠️ Support and Assistance Recommended
              </Text>

              <TouchableOpacity
                onPress={() =>
                  Linking.openURL("https://kidshealth.org/en/teens/stress-tips.html")
                }
                className="mb-4"
              >
                <Text className="text-blue-900 underline">
                  View Stress Management Guide
                </Text>
              </TouchableOpacity>

              <View className="mb-4">
                <Text className="font-semibold">
                  CSWD CDO Psychosocial
                </Text>
                <Text>📞 0970 039 2709</Text>
                <Text>📧 cswdpsychosocial@gmail.com</Text>
              </View>

              <TouchableOpacity
                onPress={() =>
                  Linking.openURL(
                    "http://cdomentalhelpline.cagayandeoro.gov.ph:8080/"
                  )
                }
                className="bg-red-600 py-3 rounded-lg items-center"
              >
                <Text className="text-white font-bold">
                  Visit Mental Health Portal
                </Text>
              </TouchableOpacity>

            </View>
          )}

          {/* Return Home */}
          <TouchableOpacity
            onPress={() => router.push("/home")}
            className="bg-blue-900 p-4 rounded-lg items-center flex-row justify-center"
          >
            <Ionicons name="arrow-back-circle-outline" size={22} color="white" />
            <Text className="text-white font-bold ml-2">
              Return Home
            </Text>
          </TouchableOpacity>

        </ScrollView>
      </SafeAreaView>
    );
  }

  /* ================= QUIZ SCREEN ================= */

  return (
    <SafeAreaView className="flex-1 bg-gray-100">
      <ScrollView contentContainerStyle={{ padding: 20 }}>
        
        <Text className="text-2xl font-bold text-blue-900 text-center my-10">
          Youth Stress Assessment
        </Text>

        <View className="border p-5 rounded-xl bg-[##FFF4B5
]">

        <View className="p-2 rounded-xl mb-7">
          <Text className="text-xl font-semibold">
            {currentIndex + 1}. {quizQuestions[currentIndex]}
          </Text>
        </View>

        {choices.map((choice, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => selectAnswer(choice.points)}
            className={`p-4 rounded-lg mb-3 border ${
              answers[currentIndex] === choice.points
                ? "border-blue-900 bg-blue-50"
                : "border-gray-300 bg-white"
            }`}
          >
            <Text className="font-medium">
              {choice.label}
            </Text>
          </TouchableOpacity>
        ))}

        <View className="flex-row justify-between mt-5">
          <TouchableOpacity
            onPress={prevQuestion}
            disabled={currentIndex === 0}
            className={`px-5 py-3 rounded-lg ${
              currentIndex === 0 ? "bg-gray-300" : "bg-gray-600"
            }`}
          >
            <Text className="text-white">Previous</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={nextQuestion}
            className="px-5 py-3 rounded-lg bg-blue-900"
          >
            <Text className="text-white">
              {currentIndex === quizQuestions.length - 1
                ? "Submit"
                : "Next"}
            </Text>
          </TouchableOpacity>
        </View>
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}
