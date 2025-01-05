import { View, Text } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router';
import { MaterialCommunityIcons} from '@expo/vector-icons'
import { Colors } from 'react-native/Libraries/NewAppScreen';
const TabRootLayout = () => {
  return (
    <>
     <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: "blue",
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Home",
          tabBarIcon: ({ color, focused }) => {
              return   <MaterialCommunityIcons name="home" size={24} color= {color}/>
            },
            headerShown: false,
        }}
      />
      <Tabs.Screen
        name="fovourites"
        options={{
          title: 'Fovourites',
          tabBarIcon: ({ color, focused }) => {
            return (
              <MaterialCommunityIcons name="heart" size={24} color= {color}/>
            );
          }
        }}
      />
      <Tabs.Screen
        name="setting"
        options={{
          title: 'Setting',
          tabBarIcon: ({ color, focused }) => {
            return (
              <MaterialCommunityIcons name="cog" size={24} color= {color}/>
            );
          }
          
        }}
      />
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarIcon: ({ color, focused }) => {
            return (
              <MaterialCommunityIcons name="message" size={24} color= {color}/>
            );
          }
        }}
      />
    </Tabs>
    </>
  )
}

export default TabRootLayout