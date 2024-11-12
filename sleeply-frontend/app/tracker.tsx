//Sleep Tracking
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';
import { useFonts } from 'expo-font';


interface CircularProgressProps {
  percentage: number;
}

const CircularProgress: React.FC<CircularProgressProps> = ({ percentage }) => {
  const radius = 110;
  const strokeWidth = 4;
  const center = radius + strokeWidth;
  const circumference = 2 * Math.PI * radius;

  return (
    <Svg width={center * 2} height={center * 2}>
      <Circle
        cx={center}
        cy={center}
        r={radius}
        stroke="#2A2A2A"
        strokeWidth={strokeWidth}
        fill="none"
      />
      <Circle
        cx={center}
        cy={center}
        r={radius}
        stroke="#A8D5BA"
        strokeWidth={strokeWidth}
        strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - percentage / 100)}
        strokeLinecap="round"
        fill="none"
        transform={`rotate(-90 ${center} ${center})`}
      />
      {Array.from({ length: 40 }).map((_, index) => {
        const angle = (index / 40) * 2 * Math.PI;
        const x = center + radius * Math.cos(angle);
        const y = center + radius * Math.sin(angle);
        return (
          <Circle
            key={index}
            cx={x}
            cy={y}
            r={2}
            fill={index < (percentage / 100) * 40 ? "#A8D5BA" : "#2A2A2A"}
          />
        );
      })}
    </Svg>
  );
};

const SleepTrackingScreen = () => {
  const [sleepDuration, setSleepDuration] = useState('');
  const [sleepQuality, setSleepQuality] = useState('');
  const [comments, setComments] = useState('');
  const [fontsLoaded] = useFonts({
    'PPMori-Regular': require('../assets/fonts/PPMori-Regular.otf'),
    'PPMori-SemiBold': require('../assets/fonts/PPMori-SemiBold.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const handleSubmit = () => {
    // Here you would typically save the sleep entry to your data store
    console.log('Sleep entry:', { sleepDuration, sleepQuality, comments });
    // Reset form
    setSleepDuration('');
    setSleepQuality('');
    setComments('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView style={styles.screen}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Sleep Tracking</Text>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="settings-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.progressContainer}>
          <CircularProgress percentage={75} />
          <View style={styles.progressTextContainer}>
            <Text style={styles.progressText}>75</Text>
            <Text style={styles.progressSubtext}>Sleep Score</Text>
          </View>
        </View>

        <View style={styles.formContainer}>
          <Text style={styles.label}>Sleep Duration (hours)</Text>
          <TextInput
            style={styles.input}
            value={sleepDuration}
            onChangeText={setSleepDuration}
            keyboardType="numeric"
            placeholder="Enter sleep duration"
            placeholderTextColor="#7F7F7F"
          />

          <Text style={styles.label}>Sleep Quality (1-10)</Text>
          <TextInput
            style={styles.input}
            value={sleepQuality}
            onChangeText={setSleepQuality}
            keyboardType="numeric"
            placeholder="Rate your sleep quality"
            placeholderTextColor="#7F7F7F"
          />

          <Text style={styles.label}>Comments</Text>
          <TextInput
            style={[styles.input, styles.textArea]}
            value={comments}
            onChangeText={setComments}
            placeholder="Any factors affecting your sleep?"
            placeholderTextColor="#7F7F7F"
            multiline
          />

          <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Log Sleep Entry</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.recentEntriesContainer}>
          <Text style={styles.recentEntriesTitle}>Recent Sleep Logs</Text>
          {/* You would typically map over your recent entries here */}
          <View style={styles.entryItem}>
            <Text style={styles.entryText}>8 hours - Quality: 9</Text>
            <Text style={styles.entryDate}>Yesterday</Text>
          </View>
          <View style={styles.entryItem}>
            <Text style={styles.entryText}>7.5 hours - Quality: 8</Text>
            <Text style={styles.entryDate}>2 days ago</Text>
          </View>
        </View>
      </ScrollView>
        <StatusBar style="light" />
        <View style={styles.bottomNav}>
            <TouchableOpacity style={styles.navItem}>
            <Image source={require('../assets/images/house.png')} style={styles.iconImage} />
            </TouchableOpacity>
            <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
            <Ionicons name="bed-outline" size={24} color="#A8D5BA" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
            <Ionicons name="stats-chart" size={24} color="#A8D5BA" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
            <Ionicons name="person-outline" size={24} color="#A8D5BA" />
            </TouchableOpacity>
        </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E1E1E',
  },
  screen: {
    flex: 1,
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontFamily: 'PPMori-SemiBold',
    fontSize: 24,
    color: 'white',
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  progressTextContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -40 }, { translateY: -30 }],
  },
  progressText: {
    fontFamily: 'PPMori-SemiBold',
    fontSize: 64,
    color: 'white',
    textAlign: 'center',
  },
  progressSubtext: {
    fontFamily: 'PPMori-Regular',
    fontSize: 14,
    color: '#7F7F7F',
    textAlign: 'center',
  },
  formContainer: {
    marginBottom: 20,
  },
  label: {
    fontFamily: 'PPMori-Regular',
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    padding: 15,
    color: 'white',
    fontFamily: 'PPMori-Regular',
    fontSize: 16,
    marginBottom: 15,
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  submitButton: {
    backgroundColor: '#A8D5BA',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
  },
  submitButtonText: {
    fontFamily: 'PPMori-SemiBold',
    fontSize: 18,
    color: '#1E1E1E',
  },
  recentEntriesContainer: {
    marginTop: 20,
  },
  recentEntriesTitle: {
    fontFamily: 'PPMori-SemiBold',
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
  },
  entryItem: {
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  entryText: {
    fontFamily: 'PPMori-Regular',
    fontSize: 16,
    color: 'white',
  },
  entryDate: {
    fontFamily: 'PPMori-Regular',
    fontSize: 14,
    color: '#7F7F7F',
    marginTop: 5,
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 50,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 80,
    gap: 60,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },



  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 35,
    backgroundColor: '#fff',
    marginHorizontal: 15,
  },

  iconImage: {
    width: 24,
    height: 24,
    tintColor: '#A8D5BA',
  },

  activeNavItem: {
    backgroundColor: '#74AECB',
    padding: 10,
    borderRadius: 35,
  },
  navText: {
    fontFamily: 'PPMori-Regular',
    fontSize: 10,
    color: '#7F7F7F',
    marginTop: 4,
  },
  activeNavText: {
    color: '#A8D5BA',
  },
});

export default SleepTrackingScreen;
