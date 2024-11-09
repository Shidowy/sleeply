import React from 'react';
import { View, Text, Image, ScrollView, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';

const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="dark" />
      <ScrollView style={styles.scrollView}>
        <View style={styles.header}>
          <View style={styles.userInfo}>
            <Image
              source={{ uri: 'avatar.svg' }}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.userName}>Username</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Ionicons name="notifications-outline" size={24} color="black" />
          </TouchableOpacity>
        </View>

        <View style={styles.searchContainer}>
          <Ionicons name="search" size={20} color="gray" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#999"
          />
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Next class</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.classCard}>
          <View style={styles.classInfo}>
            <View style={styles.classIconContainer}>
              <Ionicons name="calculator-outline" size={24} color="black" />
            </View>
            <View>
              <Text style={styles.className}>Class Name</Text>
              <Text style={styles.classTime}>Today, Time</Text>
            </View>
          </View>
          <View style={styles.teacherInfo}>
            <Image
              source={{ uri: 'avatar.svg' }}
              style={styles.teacherAvatar}
            />
            <Text style={styles.teacherName}>Teacher</Text>
          </View>
          <View style={styles.homeworkTag}>
            <Text style={styles.homeworkText}>Homework</Text>
            <Ionicons name="checkmark" size={16} color="black" />
          </View>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Events</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See all</Text>
          </TouchableOpacity>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.eventsContainer}>
          <View style={styles.eventCard}>
            <Image
              source={{ uri: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/original-1f2ffe3e1a941a60dd7f6d58b387d863-uwGe2iE4djzE43oyOud1434Q5lPR88.jpeg' }}
              style={styles.eventImage}
            />
            <Text style={styles.eventTitle}>Event</Text>
            <Text style={styles.eventDate}>Date</Text>
            <TouchableOpacity style={styles.heartIcon}>
              <Ionicons name="heart-outline" size={20} color="black" />
            </TouchableOpacity>
          </View>
          <View style={styles.eventCard}>
            <Image
              source={{ uri: 'https://hebbkx1anhila5yf.public.blob.vercel-storage.com/original-1f2ffe3e1a941a60dd7f6d58b387d863-uwGe2iE4djzE43oyOud1434Q5lPR88.jpeg' }}
              style={styles.eventImage}
            />
            <Text style={styles.eventTitle}>Event</Text>
            <Text style={styles.eventDate}>Date</Text>
            <TouchableOpacity style={styles.heartIcon}>
              <Ionicons name="heart-outline" size={20} color="black" />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ScrollView>

      <View style={styles.tabBar}>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="home" size={24} color="#4b825a" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="calendar-outline" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="chatbubble-outline" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.tabItem}>
          <Ionicons name="person-outline" size={24} color="gray" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F2F2F7',
  },
  scrollView: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
  },
  userGrade: {
    fontSize: 14,
    color: '#666',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginHorizontal: 16,
    marginTop: 16,
    paddingHorizontal: 12,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 24,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  seeAllText: {
    fontSize: 14,
    color: '#007AFF',
  },
  classCard: {
    backgroundColor: '#E8E8FF',
    borderRadius: 12,
    padding: 16,
    marginHorizontal: 16,
  },
  classInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  classIconContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    padding: 8,
    marginRight: 12,
  },
  className: {
    fontSize: 16,
    fontWeight: '600',
  },
  classTime: {
    fontSize: 14,
    color: '#666',
  },
  teacherInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  teacherAvatar: {
    width: 24,
    height: 24,
    borderRadius: 12,
    marginRight: 8,
  },
  teacherName: {
    fontSize: 14,
    color: '#666',
  },
  homeworkTag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 4,
    alignSelf: 'flex-start',
  },
  homeworkText: {
    fontSize: 12,
    marginRight: 4,
  },
  eventsContainer: {
    paddingLeft: 16,
    paddingBottom: 16,
  },
  eventCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 12,
    marginRight: 12,
    width: 160,
  },
  eventImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 4,
  },
  eventDate: {
    fontSize: 14,
    color: '#666',
  },
  heartIcon: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 4,
  },
  tabBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#bb3c4d',
    marginBottom: -30,
    height: 60,
  },
  tabItem: {
    alignItems: 'center',
  },
});

export default HomeScreen;
