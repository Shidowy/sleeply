import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView, TextInput, Image, Modal } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle } from 'react-native-svg';
import { useFonts } from 'expo-font';
import { LineChart } from 'react-native-chart-kit';

const CircularProgress = ({ percentage }: { percentage: number }) => {
  const radius = 70;
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
    </Svg>
  );
};

const EnhancedSleepTrackingScreen = () => {
  const [activeTab, setActiveTab] = useState('analyze');
  const [mood, setMood] = useState('');
  const [stressLevel, setStressLevel] = useState('');
  const [schedule, setSchedule] = useState([
    { title: 'Math Class', time: '9:00 AM - 10:30 AM', icon: 'book-outline' },
    { title: 'Soccer Practice', time: '4:00 PM - 6:00 PM', icon: 'football-outline' },
  ]);
  const [modalVisible, setModalVisible] = useState(false);
  const [newEventTitle, setNewEventTitle] = useState('');
  const [newEventTime, setNewEventTime] = useState('');
  const [newEventIcon, setNewEventIcon] = useState('calendar-outline');

  const [fontsLoaded] = useFonts({
    'PPMori-Regular': require('../assets/fonts/PPMori-Regular.otf'),
    'PPMori-SemiBold': require('../assets/fonts/PPMori-SemiBold.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const renderAnalyzePatterns = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Sleep Patterns</Text>
      <LineChart
        data={{
          labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          datasets: [{ data: [7, 6.5, 8, 7.5, 6, 9, 8] }]
        }}
        width={300}
        height={200}
        chartConfig={{
          backgroundColor: "#2A2A2A",
          backgroundGradientFrom: "#2A2A2A",
          backgroundGradientTo: "#2A2A2A",
          decimalPlaces: 1,
          color: (opacity = 1) => `rgba(168, 213, 186, ${opacity})`,
          style: { borderRadius: 16 }
        }}
        bezier
        style={styles.chart}
      />
      <Text style={styles.insightText}>Your sleep has been consistent this week. Great job maintaining a regular schedule!</Text>
      <Text style={styles.insightText}>Weekly sleep debt: 1.5 hours</Text>
    </View>
  );

  const renderImproveSleep = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Improve Sleep Quality</Text>
      <View style={styles.tipContainer}>
        <Ionicons name="bulb-outline" size={24} color="#A8D5BA" />
        <Text style={styles.tipText}>Limit screen time 1 hour before bed to improve sleep quality.</Text>
      </View>
      <View style={styles.tipContainer}>
        <Ionicons name="water-outline" size={24} color="#A8D5BA" />
        <Text style={styles.tipText}>Try a relaxing bedtime routine like reading or meditation.</Text>
      </View>
    </View>
  );

  const renderMoodTracking = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Mood and Stress Tracking</Text>
      <Text style={styles.label}>Today's Mood</Text>
      <View style={styles.moodContainer}>
        {['😊', '😐', '😔', '😡', '😴'].map((emoji, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.moodButton, mood === emoji && styles.selectedMood]}
            onPress={() => setMood(emoji)}
          >
            <Text style={styles.moodEmoji}>{emoji}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Text style={styles.label}>Stress Level (1-10)</Text>
      <TextInput
        style={styles.input}
        value={stressLevel}
        onChangeText={setStressLevel}
        keyboardType="numeric"
        placeholder="Enter stress level"
        placeholderTextColor="#7F7F7F"
      />
      <TouchableOpacity style={styles.submitButton}>
        <Text style={styles.submitButtonText}>Log Mood and Stress</Text>
      </TouchableOpacity>
    </View>
  );

  const renderScheduleIntegration = () => (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>Schedule Integration</Text>
      {schedule.map((item, index) => (
        <View key={index} style={styles.scheduleItem}>
          <Ionicons name={item.icon} size={24} color="#A8D5BA" />
          <View style={styles.scheduleTextContainer}>
            <Text style={styles.scheduleTitle}>{item.title}</Text>
            <Text style={styles.scheduleTime}>{item.time}</Text>
          </View>
        </View>
      ))}
      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Ionicons name="add" size={24} color="#1E1E1E" />
        <Text style={styles.addButtonText}>Add New Event</Text>
      </TouchableOpacity>
      <Text style={styles.scheduleAdvice}>
        Based on your schedule, aim to sleep by 10:30 PM to get 8 hours of sleep before your first class.
      </Text>
    </View>
  );

  const addNewEvent = () => {
    if (newEventTitle && newEventTime) {
      setSchedule([...schedule, { title: newEventTitle, time: newEventTime, icon: newEventIcon }]);
      setNewEventTitle('');
      setNewEventTime('');
      setNewEventIcon('calendar-outline');
      setModalVisible(false);
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
          <Text style={styles.headerTitle}>Sleep Insights</Text>
          <TouchableOpacity style={styles.iconButton}>
            <Ionicons name="settings-outline" size={24} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.progressContainer}>
          <CircularProgress percentage={85} />
          <View style={styles.progressTextContainer}>
            <Text style={styles.progressText}>85</Text>
            <Text style={styles.progressSubtext}>Sleep Score</Text>
          </View>
        </View>

        <View style={styles.tabContainer}>
          {['analyze', 'improve', 'mood', 'schedule'].map((tab) => (
            <TouchableOpacity
              key={tab}
              style={[styles.tab, activeTab === tab && styles.activeTab]}
              onPress={() => setActiveTab(tab)}
            >
              <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {activeTab === 'analyze' && renderAnalyzePatterns()}
        {activeTab === 'improve' && renderImproveSleep()}
        {activeTab === 'mood' && renderMoodTracking()}
        {activeTab === 'schedule' && renderScheduleIntegration()}
      </ScrollView>

      <View style={styles.bottomNav}>
        {['house', 'bed-outline', 'stats-chart', 'person-outline'].map((icon, index) => (
          <TouchableOpacity key={icon} style={[styles.navItem, index === 1 && styles.activeNavItem]}>
            {icon === 'house' ? (
              <Image source={require('../assets/images/house.png')} style={styles.iconImage} />
            ) : (
              <Ionicons name={icon} size={24} color={index === 1 ? '#1E1E1E' : '#A8D5BA'} />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Add New Event</Text>
            <TextInput
              style={styles.modalInput}
              placeholder="Event Title"
              placeholderTextColor="#7F7F7F"
              value={newEventTitle}
              onChangeText={setNewEventTitle}
            />
            <TextInput
              style={styles.modalInput}
              placeholder="Event Time (e.g., 9:00 AM - 10:30 AM)"
              placeholderTextColor="#7F7F7F"
              value={newEventTime}
              onChangeText={setNewEventTime}
            />
            <View style={styles.iconSelector}>
              {['book-outline', 'football-outline', 'musical-notes-outline', 'briefcase-outline'].map((icon) => (
                <TouchableOpacity
                  key={icon}
                  style={[styles.iconOption, newEventIcon === icon && styles.selectedIcon]}
                  onPress={() => setNewEventIcon(icon)}
                >
                  <Ionicons name={icon} size={24} color={newEventIcon === icon ? '#1E1E1E' : '#A8D5BA'} />
                </TouchableOpacity>
              ))}
            </View>
            <TouchableOpacity style={styles.addEventButton} onPress={addNewEvent}>
              <Text style={styles.addEventButtonText}>Add Event</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
              <Text style={styles.cancelButtonText}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
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
    transform: [{ translateX: -30 }, { translateY: -20 }],
  },
  progressText: {
    fontFamily: 'PPMori-SemiBold',
    fontSize: 36,
    color: 'white',
    textAlign: 'center',
  },
  progressSubtext: {
    fontFamily: 'PPMori-Regular',
    fontSize: 12,
    color: '#7F7F7F',
    textAlign: 'center',
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#2A2A2A',
    borderRadius: 25,
    marginBottom: 20,
    padding: 5,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 20,
  },
  activeTab: {
    backgroundColor: '#A8D5BA',
  },
  tabText: {
    fontFamily: 'PPMori-Regular',
    fontSize: 14,
    color: '#7F7F7F',
  },
  activeTabText: {
    color: '#1E1E1E',
    fontFamily: 'PPMori-SemiBold',
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
  chart: {
    marginVertical: 8,
    borderRadius: 16,
    alignSelf: 'center',
  },
  insightText: {
    fontFamily: 'PPMori-Regular',
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  tipContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  tipText: {
    fontFamily: 'PPMori-Regular',
    fontSize: 16,
    color: 'white',
    marginLeft: 10,
    flex: 1,
  },
  label: {
    fontFamily: 'PPMori-Regular',
    fontSize: 16,
    color: 'white',
    marginBottom: 5,
  },
  moodContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  moodButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedMood: {
    backgroundColor: '#A8D5BA',
  },
  moodEmoji: {
    fontSize: 24,
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
  scheduleItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  scheduleTextContainer: {
    marginLeft: 10,
    flex: 1,
  },
  scheduleTitle: {
    fontFamily: 'PPMori-SemiBold',
    fontSize: 16,
    color: 'white',
  },
  scheduleTime: {
    fontFamily: 'PPMori-Regular',
    fontSize: 14,
    color: '#7F7F7F',
  },
  scheduleAdvice: {
    fontFamily: 'PPMori-Regular',
    fontSize: 16,
    color: 'white',
    marginTop: 10,
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
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#A8D5BA',
    borderRadius: 25,
    padding: 15,
    marginTop: 10,
  },
  addButtonText: {
    fontFamily: 'PPMori-SemiBold',
    fontSize: 16,
    color: '#1E1E1E',
    marginLeft: 10,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: '#2A2A2A',
    borderRadius: 20,
    padding: 20,
    width: '80%',
  },
  modalTitle: {
    fontFamily: 'PPMori-SemiBold',
    fontSize: 20,
    color: 'white',
    marginBottom: 15,
    textAlign: 'center',
  },
  modalInput: {
    backgroundColor: '#1E1E1E',
    borderRadius: 10,
    padding: 15,
    color: 'white',
    fontFamily: 'PPMori-Regular',
    fontSize: 16,
    marginBottom: 15,
  },
  iconSelector: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 15,
  },
  iconOption: {
    padding: 10,
    borderRadius: 20,
    backgroundColor: '#1E1E1E',
  },
  selectedIcon: {
    backgroundColor: '#A8D5BA',
  },
  addEventButton: {
    backgroundColor: '#A8D5BA',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
  },
  addEventButtonText: {
    fontFamily: 'PPMori-SemiBold',
    fontSize: 18,
    color: '#1E1E1E',
  },
  cancelButton: {
    backgroundColor: '#1E1E1E',
    borderRadius: 25,
    padding: 15,
    alignItems: 'center',
  },
  cancelButtonText: {
    fontFamily: 'PPMori-SemiBold',
    fontSize: 18,
    color: '#A8D5BA',
  },
});

export default EnhancedSleepTrackingScreen;
