import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, SafeAreaView, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import Svg, { Circle, Path } from 'react-native-svg';
import { useFonts } from 'expo-font';
import { BlurView } from 'expo-blur';

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

const SleepTrackerApp = () => {
  const [activeScreen, setActiveScreen] = useState(1);
  const [fontsLoaded] = useFonts({
    'PPMori-Regular': require('../assets/fonts/PPMori-Regular.otf'),
    'PPMori-SemiBold': require('../assets/fonts/PPMori-SemiBold.otf'),
  });

  if (!fontsLoaded) {
    return null;
  }

  const Screen1 = () => (
    <ScrollView style={styles.screen}>
      <View style={styles.header}>
        <Text style={styles.logo}>MYSLEEP</Text>
        <View style={styles.dotContainer}>
          <View style={[styles.dot, styles.activeDot]} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      </View>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Smart{'\n'}Sleep{'\n'}Tracker</Text>
        <View style={styles.iconContainer}>
          <Ionicons name="moon" size={24} color="#A8D5BA" />
        </View>
      </View>
      <Image
        source={require('../assets/images/icon.png')}
        style={styles.deviceImage}
      />
      <View style={styles.infoBox}>
        <Ionicons name="time-outline" size={24} color="#A8D5BA" />
        <Text style={styles.infoText}>8 Hour{'\n'}Sleep Goal</Text>
      </View>
      <View style={styles.navigation}>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={[styles.navButton, styles.activeNavButton]}>
          <Ionicons name="flash" size={24} color="#1E1E1E" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="chevron-forward" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const Screen2 = () => (
    <ScrollView style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Image
            source={require('../assets/images/icon.png')}
            style={styles.avatar}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.progressContainer}>
        <CircularProgress percentage={86} />
        <View style={styles.progressTextContainer}>
          <Text style={styles.progressText}>86</Text>
          <Text style={styles.progressSubtext}>Score</Text>
        </View>
      </View>
      <View style={styles.statsContainer}>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>7.5</Text>
          <Text style={styles.statUnit}>HOURS</Text>
          <Text style={styles.statLabel}>Duration</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statValue}>95</Text>
          <Text style={styles.statUnit}>%</Text>
          <Text style={styles.statLabel}>Quality</Text>
        </View>
      </View>
      <View style={styles.streakContainer}>
        <View>
          <Text style={styles.streakValue}>28</Text>
          <Text style={styles.streakUnit}>DAYS</Text>
          <Text style={styles.streakLabel}>Sleep Goal Streak</Text>
        </View>
        <TouchableOpacity style={[styles.iconButton, styles.activeIconButton]}>
          <Ionicons name="checkmark" size={24} color="#1E1E1E" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  const Screen3 = () => (
    <ScrollView style={styles.screen}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="share-outline" size={24} color="white" />
        </TouchableOpacity>
      </View>
      <Text style={styles.moduleTitle}>SleepOne™</Text>
      <Text style={styles.moduleSubtitle}>Sleep insights</Text>
      <View style={styles.tabContainer}>
        <TouchableOpacity style={[styles.tab, styles.activeTab]}>
          <Text style={[styles.tabText, styles.activeTabText]}>Duration</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Quality</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.tab}>
          <Text style={styles.tabText}>Cycles</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.chartContainer}>
        {/* Placeholder for chart */}
        <View style={styles.chartPlaceholder} />
      </View>
      <View style={styles.monthSelector}>
        <TouchableOpacity style={styles.monthButton}>
          <Ionicons name="chevron-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.monthText}>November</Text>
        <TouchableOpacity style={styles.monthButton}>
          <Ionicons name="chevron-forward" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="light" />
      {activeScreen === 0 && <Screen1 />}
      {activeScreen === 1 && <Screen2 />}
      {activeScreen === 2 && <Screen3 />}
        <View style={styles.bottomNav}>
            <TouchableOpacity style={[styles.navItem, styles.activeNavItem]}>
            <Image source={require('../assets/images/house.png')} style={styles.iconImage} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.navItem}>
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
    paddingBottom: 100,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    fontFamily: 'PPMori-SemiBold',
    fontSize: 24,
    color: 'white',
  },
  dotContainer: {
    flexDirection: 'row',
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#333',
    marginLeft: 5,
  },
  activeDot: {
    backgroundColor: '#A8D5BA',
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontFamily: 'PPMori-SemiBold',
    fontSize: 48,
    color: 'white',
    lineHeight: 56,
  },
  iconContainer: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: '#2A2A2A',
    borderRadius: 20,
    padding: 10,
  },
  deviceImage: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
  },
  infoBox: {
    position: 'absolute',
    bottom: 120,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(42, 42, 42, 0.8)',
    borderRadius: 20,
    padding: 10,
  },
  infoText: {
    fontFamily: 'PPMori-Regular',
    color: 'white',
    marginLeft: 10,
    fontSize: 16,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  navButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
  },
  activeNavButton: {
    backgroundColor: '#A8D5BA',
  },
  iconButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeIconButton: {
    backgroundColor: '#A8D5BA',
  },
  avatar: {
    width: 44,
    height: 44,
    borderRadius: 22,
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
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  statBox: {
    backgroundColor: '#2A2A2A',
    borderRadius: 25,
    padding: 20,
    width: '49%',
  },
  statValue: {
    fontFamily: 'PPMori-SemiBold',
    fontSize: 32,
    color: 'white',
  },
  statUnit: {
    fontFamily: 'PPMori-Regular',
    fontSize: 12,
    color: '#7F7F7F',
    marginTop: 5,
  },
  statLabel: {
    fontFamily: 'PPMori-Regular',
    fontSize: 16,
    color: '#7F7F7F',
    marginTop: 5,
  },
  streakContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 25,
    padding: 20,
    marginBottom: 20,
  },
  streakValue: {
    fontFamily: 'PPMori-SemiBold',
    fontSize: 32,
    color: 'white',
  },
  streakUnit: {
    fontFamily: 'PPMori-Regular',
    fontSize: 12,
    color: '#7F7F7F',
    marginTop: 5,
  },
  streakLabel: {
    fontFamily: 'PPMori-Regular',
    fontSize: 16,
    color: '#7F7F7F',
    marginTop: 5,
  },
  moduleTitle: {
    fontFamily: 'PPMori-SemiBold',
    fontSize: 32,
    color: 'white',
    marginBottom: 5,
  },
  moduleSubtitle: {
    fontFamily: 'PPMori-Regular',
    fontSize: 16,
    color: '#7F7F7F',
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#2A2A2A',
    borderRadius: 20,
    padding: 4,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
  },
  activeTab: {
    backgroundColor: 'white',
    borderRadius: 16,
  },
  tabText: {
    fontFamily: 'PPMori-Regular',
    color: '#7F7F7F',
    fontSize: 14,
  },
  activeTabText: {
    color: '#1E1E1E',
  },
  chartContainer: {
    flex: 1,
    marginBottom: 20,
  },
  chartPlaceholder: {
    height: 200,
    backgroundColor: '#2A2A2A',
    borderRadius: 20,
  },
  monthSelector: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  monthButton: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: '#2A2A2A',
    justifyContent: 'center',
    alignItems: 'center',
  },
  monthText: {
    fontFamily: 'PPMori-Regular',
    fontSize: 16,
    color: 'white',
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

export default SleepTrackerApp;
