import { Stack } from 'expo-router';
import { useCallback } from 'react';
import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

/**
 * Root layout component that handles app initialization and navigation
 * Includes font loading and splash screen management
 */
export default function RootLayout() {
  // Load custom fonts
  const [fontsLoaded] = useFonts({
    // Add your custom fonts here if needed
  });

  /**
   * Callback to handle when the app is ready
   * Hides the splash screen
   */
  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    />
  );
} 