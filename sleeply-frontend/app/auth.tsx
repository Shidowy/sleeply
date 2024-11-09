import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Svg, Path, Circle } from 'react-native-svg';
import { router } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { LinearGradient } from 'expo-linear-gradient';
import { useFonts } from 'expo-font';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [fontsLoaded] = useFonts({
    'TitleFont': require('../assets/fonts/SqueezyVF.ttf'),
    'TextFont': require('../assets/fonts/TT_Neoris.ttf'),
  });

  const handleAuth = async () => {
    try {
      // In place of backend auth
      let token = 'dummy-token';

      await SecureStore.setItemAsync('userToken', token);

      if (isLogin) {
        router.replace('/dashboard');
      } else {
        router.replace('/onboarding');
      }
    } catch (error) {
      Alert.alert('Error', 'An error occurred during authentication');
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <LinearGradient colors={['#4A90E2', '#5AB1FF']} style={styles.container}>
      <Svg width="120" height="120" viewBox="0 0 120 120" style={styles.logo}>
        <Circle cx="60" cy="60" r="58" fill="#FFFFFF" />
        <Path
          d="M60 8C31.4 8 8 31.4 8 60C8 88.6 31.4 112 60 112C88.6 112 112 88.6 112 60C112 31.4 88.6 8 60 8ZM60 104C35.8 104 16 84.2 16 60C16 35.8 35.8 16 60 16C84.2 16 104 35.8 104 60C104 84.2 84.2 104 60 104Z"
          fill="#4A90E2"
        />
        <Path
          d="M60 16C35.8 16 16 35.8 16 60C16 84.2 35.8 104 60 104C60 77.6 60 42.4 60 16Z"
          fill=""
        />
      </Svg>
      <Text style={styles.title}>Sleeply</Text>
      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          placeholderTextColor="#FFFFFF"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#FFFFFF"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        <TouchableOpacity style={styles.button} onPress={handleAuth}>
          <Text style={styles.buttonText}>{isLogin ? 'Log In' : 'Sign Up'}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={() => setIsLogin(!isLogin)}>
        <Text style={styles.switchText}>
          {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Log In"}
        </Text>
      </TouchableOpacity>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  logo: {
    marginBottom: 20,
  },
  title: {
    fontFamily: 'TitleFont',
    fontSize: 69,
    fontWeight: 'bold',
    marginBottom: 40,
    color: '#FFFFFF',
  },
  form: {
    width: '100%',
    marginBottom: 20,
  },
  input: {
    fontFamily: 'TextFont',
    width: '100%',
    height: 50,
    borderColor: '#FFFFFF',
    borderWidth: 1,
    borderRadius: 25,
    paddingHorizontal: 15,
    marginBottom: 15,
    fontSize: 16,
    color: '#FFFFFF',
  },
  button: {
    width: '100%',
    height: 50,
    backgroundColor: '#FFFFFF',
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 15,
  },
  buttonText: {
    fontFamily: 'TextFont',
    color: '#4A90E2',
    fontSize: 18,
    fontWeight: 'bold',
  },
  switchText: {
    fontFamily: 'TextFont',
    color: '#FFFFFF',
    fontSize: 16,
  },
});
