import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as SplashScreen from 'expo-splash-screen';
import * as SecureStore from 'expo-secure-store';
import { StatusBar } from 'expo-status-bar';

import AuthScreen from '../auth';
import OnboardingScreen from '../onboarding';
import DashboardScreen from '../dashboard';

type RootStackParamList = {
  Splash: undefined;
  Auth: undefined;
  Onboarding: undefined;
  Dashboard: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

// Prevent splash screen from auto-hiding
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [userToken, setUserToken] = useState<string | null>(null);
  const [isNewUser, setIsNewUser] = useState(false);

  useEffect(() => {
    const checkToken = async () => {
      try {
        // Simulate loading data (e.g., fetching a token)
        const token = await SecureStore.getItemAsync('userToken');
        setUserToken(token);
        // After loading the data, set isLoading to false and hide splash screen
        setIsLoading(false);
        await SplashScreen.hideAsync();  // Hide the splash screen after loading
      } catch (e) {
        console.warn(e);
        setIsLoading(false);  // If there's an error, still hide splash screen
      }
    };

    checkToken();  // Trigger the token check and loading process
  }, []);

  const authContext = React.useMemo(() => ({
    signIn: async (token: string) => {
      setUserToken(token);
      await SecureStore.setItemAsync('userToken', token);
    },
    signOut: async () => {
      setUserToken(null);
      await SecureStore.deleteItemAsync('userToken');
    },
    signUp: async (token: string) => {
      setUserToken(token);
      setIsNewUser(true);
      await SecureStore.setItemAsync('userToken', token);
    },
  }), []);

  // Show splash screen while loading, otherwise navigate to the appropriate screen
  // if (isLoading) {
  //   return <SplashScreenComponent />;
  // }

  return (
    <NavigationContainer independent={true}>
      <StatusBar style="auto" />
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {userToken == null ? (
          <Stack.Screen name="Auth" component={AuthScreen} />
        ) : isNewUser ? (
          <Stack.Screen name="Onboarding" component={OnboardingScreen} />
        ) : (
          <Stack.Screen name="Dashboard" component={DashboardScreen} />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
