import { View, StyleSheet, Dimensions, Text, Pressable, TouchableOpacity,Animated } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { Tabs } from 'expo-router';
import { AntDesign, EvilIcons, Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { getHeaderTitle, HeaderTitle } from '@react-navigation/elements';
import Constants from 'expo-constants';
import { useFonts } from 'expo-font';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import Signup from '../Signup';
// const MyHeader = ({ title, style }: any) => {
//   console.warn(title);
//   return <View style={style}>
//     <Text style={{ fontSize: 20, color: "black", paddingTop: 100 }}>1222212</Text>
//   </View>
// }

// Menu drower
const DrawerNavigator = () => {
  const Drawer = createDrawerNavigator();

  return (
    <Drawer.Navigator screenOptions={{headerShown:false}}>
      <Drawer.Screen name="Home" component={TabRootLayout} />
      <Drawer.Screen name="Signup" component={Signup} />
    </Drawer.Navigator>
  );
};
const TabRootLayout = () => {
  const [fontsLoaded, fontError] = useFonts({
    HelvetIns: require("../../../assets/fonts/HelvetIns.ttf"),
    PlaywriteNL: require("../../../assets/fonts/Playwrite_NL/Playwrite-NL.ttf"),
    Montserrat: require("../../../assets/fonts/Montserrat/static/Montserrat-Regular.ttf"),
  
  });
  const { width } = Dimensions.get('window');
  const heightHeader = Constants.statusBarHeight + 55;
  const translation = useRef(new Animated.Value(0)).current;
  const Drawer = createDrawerNavigator();
  


  useEffect(() => {
    const animation = Animated.loop(
      Animated.sequence([ 
        Animated.timing(translation, {
          toValue: 60, // chiều cao của nút qrcode
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(translation, {
          toValue: 1, // bắt đầu từ 0 đến 60
          duration: 1000, // số giây
          useNativeDriver: false,
        }),
      ])
    );
    animation.start(); // chạy cái function animation

    // xoá animation sau khi chạy xong ->"unmount"
    return () => animation.stop();
  }, [translation]); // Nếu translation thay đổi , thì nó sẽ chạy lại animation

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: true,
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
          header: ({ navigation, route, options }) => {
            const title = getHeaderTitle(options, route.name);
            if (title === "Home") {
              return <>
                <View style={{ width: '100%', height: heightHeader, backgroundColor: "#1E90FF", paddingTop: Constants.statusBarHeight }}>
                  <View style={styles.headerTop}>
                    <View>
                      <View style={styles.headerContent}>
                        <TouchableOpacity onPress={({}) => navigation.dispatch(DrawerActions.openDrawer())}>
                          <Ionicons name="filter" size={30} color="white" />
                        </TouchableOpacity>
                        <View style={{ flexShrink: 1, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={[styles.headerTitle, { fontFamily: "HelvetIns", fontSize: 30, marginLeft: 9 }]}>ScanSavvy</Text>
                        </View>
                        <TouchableOpacity>
                          <View>
                            <EvilIcons name="bell" size={40} color="white" />
                            <View style={{ width: 22, height: 22, borderRadius: 20, backgroundColor: 'red', position: 'absolute', top: -5, right: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                              <Text style={{ color: 'white', textAlign: 'center', fontSize: 10, fontWeight: 'bold' }}>99</Text>
                            </View>
                          </View>
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                </View>
              </>
            }
            else{
              return null;
            }
          }
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            // headerStyle: styles.headerStyle,
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
                <Animated.View
                  style={[
                    {
                      position: "absolute",
                      right: 5,
                      width: 55,
                      height: 2,
                      backgroundColor: "white",
                    },
                    { top: translation },
                  ]}
                ></Animated.View>
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
  headerStyle: {
    height: 80,
    backgroundColor: '#1E90FF',
  },
  headerTop: {
    width: '100%',
    paddingHorizontal: 20,

  },
  headerContent: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  headerTitle: {
    fontSize: 25,
    fontWeight: '600',
    color: 'white'
  },
});

export default DrawerNavigator;
