import { Stack } from "expo-router";
import "../global.css";


export default function ScreenLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="home" options={{  headerShown: false  }} />
      <Stack.Screen name="login" options={{  headerShown: false  }} />
      <Stack.Screen name="screens/services" options={{  headerShown: false  }} />
      <Stack.Screen name="screens/form" options={{  headerShown: false  }} />
      <Stack.Screen name="screens/subservice" options={{  headerShown: false  }} />
      {/* <Stack.Screen name="gender" options={{  headerShown: false  }} /> */}
      <Stack.Screen name="module" options={{  headerShown: false  }} />
      <Stack.Screen name="signOption" options={{  headerShown: false  }} />
      <Stack.Screen name="signUp" options={{  headerShown: false  }} />
      <Stack.Screen name="quiz" options={{  headerShown: false  }} />
      

      {/* <Stack.Screen name="request" options={{  headerShown: false }} /> */}
    </Stack>
  );
}

