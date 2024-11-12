import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Switch, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

const SettingsScreen = () => {
  const [fontsLoaded] = useFonts({
    'PPMori-Regular': require('../assets/fonts/PPMori-Regular.otf'),
    'PPMori-SemiBold': require('../assets/fonts/PPMori-SemiBold.otf'),
  });

  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [sleepGoal, setSleepGoal] = useState(8);

  if (!fontsLoaded) {
    return null;
  }

  const toggleNotifications = () => setNotifications(previousState => !previousState);
  const toggleDarkMode = () => setDarkMode(previousState => !previousState);

  const changeSleepGoal = (change) => {
    setSleepGoal(prevGoal => {
      const newGoal = prevGoal + change;
      return newGoal >= 4 && newGoal <= 12 ? newGoal : prevGoal;
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView style={styles.screen}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Settings</Text>
          <View style={styles.iconButton} />
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>App Settings</Text>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Notifications</Text>
            <Switch
              trackColor={{ false: "#767577", true: "#A8D5BA" }}
              thumbColor={notifications ? "#f4f3f4" : "#f4f3f4"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleNotifications}
              value={notifications}
            />
          </View>

          <View style={styles.settingItem}>
            <Text style={styles.settingLabel}>Sleep Goal (hours)</Text>
            <View style={styles.sleepGoalContainer}>
              <TouchableOpacity onPress={() => changeSleepGoal(-0.5)} style={styles.sleepGoalButton}>
                <Ionicons name="remove" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.sleepGoalText}>{sleepGoal}</Text>
              <TouchableOpacity onPress={() => changeSleepGoal(0.5)} style={styles.sleepGoalButton}>
                <Ionicons name="add" size={24} color="white" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Account</Text>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>Edit Profile</Text>
            <Ionicons name="chevron-forward" size={24} color="#A8D5BA" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>Change Password</Text>
            <Ionicons name="chevron-forward" size={24} color="#A8D5BA" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>Privacy Settings</Text>
            <Ionicons name="chevron-forward" size={24} color="#A8D5BA" />
          </TouchableOpacity>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Support</Text>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>Help Center</Text>
            <Ionicons name="chevron-forward" size={24} color="#A8D5BA" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>Contact Us</Text>
            <Ionicons name="chevron-forward" size={24} color="#A8D5BA" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>Terms of Service</Text>
            <Ionicons name="chevron-forward" size={24} color="#A8D5BA" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem}>
            <Text style={styles.settingLabel}>Privacy Policy</Text>
            <Ionicons name="chevron-forward" size={24} color="#A8D5BA" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton}>
          <Text style={styles.logoutButtonText}>Log Out</Text>
        </TouchableOpacity>
      </ScrollView>

      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem}>
          <Image source={require('../assets/images/house.png')} style={styles.iconImage} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="bed-outline" size={24} color="#A8D5BA" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navItem}>
          <Ionicons name="stats-chart" size={24} color="#A8D5BA" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
          <Ionicons name="person" size={24} color="#1E1E1E" />
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
  sectionContainer: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontFamily: 'PPMori-SemiBold',
    fontSize: 20,
    color: 'white',
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  settingLabel: {
    fontFamily: 'PPMori-Regular',
    fontSize: 16,
    color: 'white',
  },
  sleepGoalContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sleepGoalButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#A8D5BA',
    justifyContent: 'center',
    alignItems: 'center',
  },
  sleepGoalText: {
    fontFamily: 'PPMori-SemiBold',
    fontSize: 18,
    color: 'white',
    marginHorizontal: 15,
  },
  logoutButton: {
    backgroundColor: '#A8D5BA',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 100,
  },
  logoutButtonText: {
    fontFamily: 'PPMori-SemiBold',
    fontSize: 18,
    color: '#1E1E1E',
  },
  bottomNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 30,
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    height: 70,
  },
  navItem: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  activeNavItem: {
    backgroundColor: '#A8D5BA',
  },
  iconImage: {
    width: 24,
    height: 24,
    tintColor: '#A8D5BA',
  },
});

export default SettingsScreen;
