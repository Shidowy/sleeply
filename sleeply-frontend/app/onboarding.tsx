import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { Svg, Circle, Path, G } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  interpolate,
  Extrapolate,
  runOnJS,
} from 'react-native-reanimated';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';

const { width, height } = Dimensions.get('window');

interface OnboardingStep {
  title: string;
  description: string;
  icon: React.ReactNode;
}

const onboardingSteps: OnboardingStep[] = [
  {
    title: 'Track Your Sleep',
    description: 'Log your sleep hours and quality effortlessly.',
    icon: (
      <Svg width="100" height="100" viewBox="0 0 100 100">
        <Circle cx="50" cy="50" r="45" fill="#4A90E2" />
        <Path
          d="M65 35H35C33.3431 35 32 36.3431 32 38V62C32 63.6569 33.3431 65 35 65H65C66.6569 65 68 63.6569 68 62V38C68 36.3431 66.6569 35 65 35ZM63 60H37V40H63V60Z"
          fill="#FFFFFF"
        />
        <Path
          d="M45 45H55V55H45V45Z"
          fill="#FFFFFF"
        />
      </Svg>
    ),
  },
  {
    title: 'Analyze Patterns',
    description: 'Gain insights into your sleep habits over time.',
    icon: (
      <Svg width="100" height="100" viewBox="0 0 100 100">
        <Circle cx="50" cy="50" r="45" fill="#4A90E2" />
        <Path
          d="M30 70H70V75H30V70ZM35 50H45V65H35V50ZM50 35H60V65H50V35ZM65 45H75V65H65V45Z"
          fill="#FFFFFF"
        />
      </Svg>
    ),
  },
  {
    title: 'Set Sleep Goals',
    description: 'Define your ideal sleep schedule and work towards it.',
    icon: (
      <Svg width="100" height="100" viewBox="0 0 100 100">
        <Circle cx="50" cy="50" r="45" fill="#4A90E2" />
        <Path
          d="M70 35L45 60L30 45L25 50L45 70L75 40L70 35Z"
          fill="#FFFFFF"
        />
      </Svg>
    ),
  },
  {
    title: 'Smart Alarms',
    description: 'Wake up refreshed with our intelligent alarm system.',
    icon: (
      <Svg width="100" height="100" viewBox="0 0 100 100">
        <Circle cx="50" cy="50" r="45" fill="#4A90E2" />
        <Path
          d="M50 25C36.2 25 25 36.2 25 50C25 63.8 36.2 75 50 75C63.8 75 75 63.8 75 50C75 36.2 63.8 25 50 25ZM50 70C39 70 30 61 30 50C30 39 39 30 50 30C61 30 70 39 70 50C70 61 61 70 50 70Z"
          fill="#FFFFFF"
        />
        <Path
          d="M52.5 37.5H47.5V52.5L60.3 60.3L62.5 56.8L52.5 50.6V37.5Z"
          fill="#FFFFFF"
        />
      </Svg>
    ),
  },
  {
    title: 'Improve Sleep Quality',
    description: 'Get personalized tips to enhance your sleep.',
    icon: (
      <Svg width="100" height="100" viewBox="0 0 100 100">
        <Circle cx="50" cy="50" r="45" fill="#4A90E2" />
        <Path
          d="M50 30C38.95 30 30 38.95 30 50C30 61.05 38.95 70 50 70C61.05 70 70 61.05 70 50C70 38.95 61.05 30 50 30ZM50 65C41.72 65 35 58.28 35 50C35 41.72 41.72 35 50 35C58.28 35 65 41.72 65 50C65 58.28 58.28 65 50 65Z"
          fill="#FFFFFF"
        />
        <Path
          d="M50 40C44.48 40 40 44.48 40 50C40 55.52 44.48 60 50 60C55.52 60 60 55.52 60 50C60 44.48 55.52 40 50 40ZM50 55C47.24 55 45 52.76 45 50C45 47.24 47.24 45 50 45C52.76 45 55 47.24 55 50C55 52.76 52.76 55 50 55Z"
          fill="#FFFFFF"
        />
      </Svg>
    ),
  },
];

export default function OnboardingScreen() {
  const [currentStep, setCurrentStep] = useState(0);
  const progress = useSharedValue(0);
  const slideAnim = useSharedValue(0);
  const fadeAnim = useSharedValue(1);

  const handleNext = () => {
    if (currentStep < onboardingSteps.length - 1) {
      fadeAnim.value = withTiming(0, { duration: 200 }, () => {
        runOnJS(setCurrentStep)(currentStep + 1);
        slideAnim.value = withSpring(0);
        fadeAnim.value = withTiming(1);
      });
      slideAnim.value = width;
      progress.value = withSpring((currentStep + 1) / (onboardingSteps.length - 1));
    } else {
      router.replace('/dashboard');
    }
  };

  const progressStyle = useAnimatedStyle(() => {
    return {
      width: `${progress.value * 100}%`,
    };
  });

  const slideStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: slideAnim.value }],
      opacity: fadeAnim.value,
    };
  });

  const iconScale = useSharedValue(0.5);

  useEffect(() => {
    iconScale.value = withSpring(1);
  }, [currentStep]);

  const iconStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: iconScale.value }],
    };
  });

  const backgroundStyle = useAnimatedStyle(() => {
    const rotate = interpolate(
      progress.value,
      [0, 1],
      [0, 45],
      Extrapolate.CLAMP
    );
    return {
      transform: [{ rotate: `${rotate}deg` }],
    };
  });

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.backgroundShape, backgroundStyle]} />
      <View style={styles.content}>
        <Animated.View style={[styles.iconContainer, iconStyle]}>
          {onboardingSteps[currentStep].icon}
        </Animated.View>
        <Animated.View style={slideStyle}>
          <Text style={styles.title}>{onboardingSteps[currentStep].title}</Text>
          <Text style={styles.description}>{onboardingSteps[currentStep].description}</Text>
        </Animated.View>
      </View>
      <View style={styles.footer}>
        <View style={styles.progressContainer}>
          <Animated.View style={[styles.progressBar, progressStyle]} />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleNext}>
          <LinearGradient
            colors={['#4A90E2', '#5AB1FF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={styles.gradient}
          >
            <Text style={styles.buttonText}>
              {currentStep === onboardingSteps.length - 1 ? 'Get Started' : 'Next'}
            </Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    justifyContent: 'space-between',
    padding: 20,
    overflow: 'hidden',
  },
  backgroundShape: {
    position: 'absolute',
    top: -height * 0.4,
    left: -width * 0.4,
    width: width * 1.5,
    height: height * 0.8,
    borderRadius: height * 0.4,
    backgroundColor: '#E8F3FF',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginBottom: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#4A90E2',
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
    color: '#666666',
    paddingHorizontal: 20,
  },
  footer: {
    marginBottom: 20,
  },
  progressContainer: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    marginBottom: 20,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4A90E2',
    borderRadius: 2,
  },
  button: {
    borderRadius: 25,
    overflow: 'hidden',
  },
  gradient: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
