import { View, StyleSheet, Dimensions, Text, Pressable } from 'react-native';
import React from 'react';
import { Tabs } from 'expo-router';
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons';

const TabRootLayout = () => {
  const { width } = Dimensions.get('window');

  return (
    <>
          <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#1E90FF', // Active icon color
          tabBarInactiveTintColor: '#A9A9A9', // Inactive icon color
          tabBarStyle: {
            backgroundColor: '#F5F5F5', // Bottom navigator background color
            borderRadius: 20,
            marginHorizontal: 20,
            marginBottom: 20,
            height: 70,
            position: 'absolute',
            elevation: 5,
            shadowColor: '#000',
            shadowOffset: { width: 0, height: 3 },
            shadowOpacity: 0.1,
            shadowRadius: 5,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            fontWeight: '600',
          },
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="home" size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="fovourites"
          options={{
            title: 'Favourites',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="heart" size={28} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="qrcode"
          options={{
            tabBarIcon: () => (
              <Pressable
                onPress={() => console.log('QR Code Pressed')}
                style={({ pressed }) => [
                  styles.qrCodeButton,
                  { transform: [{ scale: pressed ? 0.9 : 1 }] },
                ]}
              >
                <AntDesign name="qrcode" size={36} color="white" />
              </Pressable>
            ),
            tabBarLabel: () => null, // Hide label for QR Code
            tabBarItemStyle: { height: 0 },
          }}
        />
        <Tabs.Screen
          name="messages"
          options={{
            title: 'Notifications',
            tabBarIcon: ({ color }) => (
              <View>
                <MaterialCommunityIcons name="message" size={28} color={color} />
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>3</Text>
                </View>
              </View>
            ),
          }}
        />
        <Tabs.Screen
          name="settings"
          options={{
            title: 'Settings',
            tabBarIcon: ({ color }) => (
              <MaterialCommunityIcons name="cog" size={28} color={color} />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

const styles = StyleSheet.create({
  qrCodeButton: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    width: 70,
    backgroundColor: '#1E90FF',
    borderRadius: 35,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  badge: {
    position: 'absolute',
    top: -5,
    right: -10,
    backgroundColor: '#FF4500',
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  badgeText: {
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold',
  },
});

export default TabRootLayout;
