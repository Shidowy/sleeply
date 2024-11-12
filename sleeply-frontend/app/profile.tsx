import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { useFonts } from 'expo-font';

const avatarParts = {
  body: ['default', 'sporty', 'casual'],
  hair: ['short', 'long', 'curly'],
  accessory: ['glasses', 'hat', 'scarf']
};

const ProfileScreen = () => {
  const [fontsLoaded] = useFonts({
    'PPMori-Regular': require('../assets/fonts/PPMori-Regular.otf'),
    'PPMori-SemiBold': require('../assets/fonts/PPMori-SemiBold.otf'),
  });

  const [avatar, setAvatar] = useState({
    body: 'default',
    hair: 'short',
    accessory: 'glasses'
  });

  const [points, setPoints] = useState(500);

  if (!fontsLoaded) {
    return null;
  }

  const achievements = [
    { name: 'Early Bird', description: 'Wake up before 7 AM for 7 days in a row', completed: true },
    { name: 'Perfect Week', description: 'Meet sleep goal for 7 days straight', completed: true },
    { name: 'Sleep Master', description: 'Maintain an average sleep score of 90+ for a month', completed: false },
  ];

  const changeAvatarPart = (part, option) => {
    if (points >= 100) {
      setAvatar(prev => ({ ...prev, [part]: option }));
      setPoints(prev => prev - 100);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      <ScrollView style={styles.screen}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="chevron-back" size={24} color="white" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Profile</Text>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="settings-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.profileInfo}>
          <Image
            source={{ uri: 'https://i.pravatar.cc/150?img=68' }}
            style={styles.profileImage}
          />
          <Text style={styles.userName}>Jane Doe</Text>
          <Text style={styles.userStats}>Level 5 Sleep Master</Text>
        </View>

        <View style={styles.pointsContainer}>
          <Ionicons name="star" size={24} color="#A8D5BA" />
          <Text style={styles.pointsText}>{points} Points</Text>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Sleep Avatar</Text>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: `/placeholder.svg?height=200&width=200&text=${avatar.body}+${avatar.hair}+${avatar.accessory}` }}
              style={styles.avatarImage}
            />
          </View>
        </View>

        <View style={styles.sectionContainer}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          {achievements.map((achievement, index) => (
            <View key={index} style={styles.achievementItem}>
              <View style={styles.achievementIcon}>
                <Ionicons
                  name={achievement.completed ? "checkmark-circle" : "time"}
                  size={24}
                  color={achievement.completed ? "#A8D5BA" : "#7F7F7F"}
                />
              </View>
              <View style={styles.achievementInfo}>
                <Text style={styles.achievementName}>{achievement.name}</Text>
                <Text style={styles.achievementDescription}>{achievement.description}</Text>
              </View>
            </View>
          ))}
        </View>
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
  profileInfo: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  userName: {
    fontFamily: 'PPMori-SemiBold',
    fontSize: 24,
    color: 'white',
    marginBottom: 5,
  },
  userStats: {
    fontFamily: 'PPMori-Regular',
    fontSize: 16,
    color: '#A8D5BA',
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 20,
    padding: 10,
    marginBottom: 20,
  },
  pointsText: {
    fontFamily: 'PPMori-SemiBold',
    fontSize: 18,
    color: 'white',
    marginLeft: 10,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontFamily: 'PPMori-SemiBold',
    fontSize: 20,
    color: 'white',
    marginBottom: 10,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarImage: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#2A2A2A',
  },
  customizationContainer: {
    marginBottom: 20,
  },
  customizationSection: {
    marginBottom: 15,
  },
  customizationTitle: {
    fontFamily: 'PPMori-SemiBold',
    fontSize: 16,
    color: 'white',
    marginBottom: 10,
  },
  customizationOption: {
    backgroundColor: '#2A2A2A',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  selectedOption: {
    backgroundColor: '#A8D5BA',
  },
  customizationOptionText: {
    fontFamily: 'PPMori-Regular',
    fontSize: 14,
    color: 'white',
  },
  achievementItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  achievementIcon: {
    marginRight: 15,
  },
  achievementInfo: {
    flex: 1,
  },
  achievementName: {
    fontFamily: 'PPMori-SemiBold',
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  achievementDescription: {
    fontFamily: 'PPMori-Regular',
    fontSize: 14,
    color: '#7F7F7F',
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

export default ProfileScreen;
