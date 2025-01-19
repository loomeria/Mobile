import { Stack, usePathname, useRouter } from 'expo-router';
import { ThemeProvider } from '@react-navigation/native';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import 'react-native-reanimated';
import '../global.css';

import { useColorScheme } from '@/hooks/useColorScheme';
import { DarkThemeCustom, DefaultThemeCustom } from '@/constants/Colors';
import { useAuth } from './context/AuthContext';

// Prevent the splash screen from auto-hiding before asset loading is complete
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const colorScheme = useColorScheme();
  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  const router = useRouter();
  const pathname = usePathname();
  const { authState } = useAuth();

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  useEffect(() => {
    if (!authState.authenticated && pathname !== '/login') {
      router.replace('/login');
    }
    else if (authState.authenticated && pathname === '/login') {
      router.replace('/');
    }
  }, [authState.authenticated, pathname]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'light' ? DarkThemeCustom : DefaultThemeCustom}>
      <Stack screenOptions={{ headerShown: false }}>
        {/*
          - "(tabs)" is your main tab navigator folder (if you have one).
          - "login" is the file-based route for app/login.tsx.
          - "+not-found" might be your fallback route.
          - You can add more <Stack.Screen> entries if needed, or rely on defaults.
        */}
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="login" />
        <Stack.Screen name="+not-found" />
      </Stack>

      <StatusBar style="auto" />
    </ThemeProvider>
  );
}
