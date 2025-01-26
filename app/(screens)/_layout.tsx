import { Stack } from 'expo-router';

const RootLayout = () => {
  return (
    <Stack>
      <Stack.Screen name="index" />
      <Stack.Screen name="splash" options={{ headerShown: false }} />
      <Stack.Screen name="Onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="Login" options={{ headerShown: false }} /> 
      <Stack.Screen name="Signup" options={{ headerShown: false }} /> 
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen name="wishList" options={{ headerShown: false}}/>
      <Stack.Screen name="cart" options={{ headerShown: false}}/>
      <Stack.Screen name="news" options={{ headerShown: false}}/>
      <Stack.Screen name="newsDetail" options={{ headerShown: false}}/>
      <Stack.Screen name="userAcoount" options={{ headerShown: false}}/>
      <Stack.Screen name="profile" options={{ headerShown: false}}/>
      <Stack.Screen name="about" options={{ headerShown: false}}/>
      <Stack.Screen name="collection" options={{ headerShown: false}}/>
    </Stack>
  );
};

export default RootLayout;
