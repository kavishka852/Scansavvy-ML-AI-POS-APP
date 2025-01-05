import { router } from 'expo-router';
import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated, Easing, PanResponder, PanResponderGestureState } from 'react-native';
import Svg, { Path } from 'react-native-svg';

const Onboarding = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fadeAnim] = useState(new Animated.Value(0)); // For fading in content
  const [slideAnim] = useState(new Animated.Value(100)); // For sliding in content

  const onboardingData = [
    {
      title: 'Scanning Product',
      description: 'The scan result will be automatically added if the item exists.',
      image: require('../../assets/Scanning.png'),
    },
    {
      title: 'Make Payment',
      description: 'Payments can be made in the best and most convenient ways.',
      image: require('../../assets/payment.png'),
    },
    {
      title: 'Get Your Order',
      description: 'Get your orders delivered to your doorstep.',
      image: require('../../assets/order.png'),
    },
  ];

  const handleNext = () => {
    if (currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleGetStarted = () => {
    // router.push('/(tabs)');
    console.log('Get Started');
  };

  const fadeIn = () => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const slideIn = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 1000,
      easing: Easing.ease,
      useNativeDriver: true,
    }).start();
  };

  const handleSwipe = (gestureState: PanResponderGestureState) => {
    if (gestureState.dx > 100 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1); // Swipe left to go back
    } else if (gestureState.dx < -100 && currentIndex < onboardingData.length - 1) {
      setCurrentIndex(currentIndex + 1); // Swipe right to go forward
    }
  };

  React.useEffect(() => {
    fadeIn();
    slideIn();
  }, [currentIndex]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (e, gestureState) => {
      handleSwipe(gestureState);
    },
    onPanResponderRelease: () => {
      // Add any additional behavior on release if needed
    },
  });

  return (
    <View style={styles.container}>
      {/* Animated Background Elements */}
      <View style={styles.backgroundContainer}>
        <Svg style={styles.bgSVG1} width={200} height={200} viewBox="0 0 200 200" fill="none">
          <Path d="M 0 0 L 200 200 L 0 200 Z" fill="#0391FA" opacity={0.15} />
        </Svg>
        <Svg style={styles.bgSVG2} width={300} height={300} viewBox="0 0 300 300" fill="none">
          <Path d="M 0 0 L 300 300 L 0 300 Z" fill="#ADD8E6" opacity={0.1} />
        </Svg>
        <Svg style={styles.bgSVG3} width={300} height={300} viewBox="0 0 300 300" fill="none">
          <Path d="M 0 0 L 300 300 L 0 300 Z" fill="#87CEFA" opacity={0.2} />
        </Svg>
        <Svg style={styles.bgSVG4} width={200} height={200} viewBox="0 0 200 200" fill="none">
          <Path d="M 0 0 L 200 200 L 0 200 Z" fill="#ADD8E6" opacity={0.2} />
        </Svg>
        <Svg style={styles.bgSVG5} width={300} height={300} viewBox="0 0 300 300" fill="none">
          <Path d="M 0 0 L 300 300 L 0 300 Z" fill="#87CEEB" opacity={0.2} />
        </Svg>
      </View>

      {/* Page Content */}
      <View style={styles.slide} {...panResponder.panHandlers}>
        <Animated.Image
          source={onboardingData[currentIndex].image}
          style={[styles.image, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
        />
        <Animated.Text
          style={[styles.title, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
        >
          {onboardingData[currentIndex].title}
        </Animated.Text>
        {onboardingData[currentIndex].description ? (
          <Animated.Text
            style={[styles.description, { opacity: fadeAnim, transform: [{ translateY: slideAnim }] }]}
          >
            {onboardingData[currentIndex].description}
          </Animated.Text>
        ) : null}
      </View>

      {/* Pagination and Buttons */}
      <View style={styles.footer}>
        <View style={styles.pagination}>
          {onboardingData.map((_, index) => (
            <View
              key={index}
              style={[styles.paginationDot, currentIndex === index && styles.paginationDotActive]}
            />
          ))}
        </View>

        {currentIndex < onboardingData.length - 1 ? (
          <TouchableOpacity style={styles.nextButton} onPress={handleNext}>
            <Text style={styles.nextText}>Next</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleGetStarted}>
            <Text style={styles.buttonText}>Get Started</Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1E90FF',
    justifyContent: 'center',
    position: 'relative',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  bgSVG1: { position: 'absolute', top: 0, left: -20, transform: [{ rotate: '20deg' }] },
  bgSVG2: { position: 'absolute', top: -150, right: 0, transform: [{ rotate: '-40deg' }] },
  bgSVG3: { position: 'absolute', top: 100, right: -200, transform: [{ rotate: '45deg' }] },
  bgSVG4: { position: 'absolute', bottom: 0, left: 40, transform: [{ rotate: '45deg' }] },
  bgSVG5: { position: 'absolute', bottom: 0, right: -30, transform: [{ rotate: '-25deg' }] },
  slide: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 1,
  },
  image: {
    width: 250,
    height: 250,
    resizeMode: 'contain',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 10,
    textAlign: 'center',
    color: '#ffffff',
  },
  description: {
    fontSize: 16,
    color: '#ffffff',
    textAlign: 'center',
    marginHorizontal: 20,
    marginTop: 5,
  },
  footer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 1,
  },
  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  paginationDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ccc',
    marginHorizontal: 5,
  },
  paginationDotActive: {
    backgroundColor: '#4CAF50',
  },
  nextButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  nextText: {
    color: '#fff',
    fontSize: 16,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});
