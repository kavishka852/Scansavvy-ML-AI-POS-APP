import { View, StyleSheet, Dimensions, Text, Pressable, TouchableOpacity, Animated, Image } from 'react-native';
import React, { useState, useRef, useEffect } from "react";
import { Tabs, useRouter } from "expo-router";
import { AntDesign, Entypo, EvilIcons, FontAwesome, Ionicons, MaterialCommunityIcons, MaterialIcons } from '@expo/vector-icons';
import { Svg, Path } from "react-native-svg";
import { height, scale } from "react-native-size-scaling";
import { getHeaderTitle, HeaderTitle } from '@react-navigation/elements';
import Constants from 'expo-constants';
import { useFonts } from 'expo-font';
import { createDrawerNavigator, DrawerContentScrollView } from '@react-navigation/drawer';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import Signup from '../Signup';
import WishListScreen from '../wishList';
import CartScreen from '../cart';
import NewsScreen from '../news';
import MyAccountScreen from '../userAcoount';
import aboutScrenn from '../about';
import CollectionScreen from '../collection';
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
    <Drawer.Navigator screenOptions={{ headerShown: false }}>
      <Drawer.Screen name="Home" component={TabRootLayout} />
      <Drawer.Screen name="wishLists" component={WishListScreen} />
      <Drawer.Screen name="Signup" component={Signup} />
    </Drawer.Navigator>
  );
};

// Custom Drawer Navigator
const CustomDrawerContent = (props: any) => {
  const { state, navigation } = props
  return (
    <View style={{ flex: 1, height: '100%' }}>
      <DrawerContentScrollView {...props}>
        {/* <DrawerItemList {...props} /> */}
        <View style={{ width: '100%', height: '100%', flex: 1 }}>
          {/* header top */}
          <View style={{ width: '100%', paddingVertical: 30, paddingHorizontal: 20, borderBottomColor: '#F5F4F4', borderBottomWidth: 1 }}>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
              <View style={{ width: 80, height: 80, borderRadius: 40, backgroundColor: 'gray', justifyContent: 'center', alignItems: 'center' }}>
                <Image source={require('../../../assets/images/avatar/1.png')} style={{ width: 70, height: 70, borderRadius: 35 }} />
              </View>
              <View style={{ paddingTop: 10 }}>
                <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'black' }}>Kavishka Roshan</Text>
                <Text style={{ fontSize: 14, fontWeight: '400', color: 'black' }}>Web Developer</Text>
              </View>
            </View>
          </View>

          {/* menu */}
          <View style={{ flex: 1, height: '100%' }}>
            {
              props.state.routes.map((route: any, index: any) => {
                const { drawerIcon, drawerLabel } = props.descriptors[route.key].options;
                const focused = index === props.state.index;
                //console.warn(route.name)
                return (
                  <TouchableOpacity
                    key={route.key}
                    style={{
                      width: '100%', paddingVertical: 10, paddingHorizontal: 20, flexDirection: 'row', alignContent: 'center'

                    }}
                    onPress={() => navigation.navigate(route.name)}
                  >
                    <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                      {
                        drawerIcon && drawerIcon({ focused, color: focused ? '#fff' : '#1E90FF', size: 30 })
                      }
                      {
                        drawerLabel && drawerLabel({ focused, color: 'black' })
                      }
                    </View>
                  </TouchableOpacity>
                )
              })
            }
          </View>
        </View>
      </DrawerContentScrollView>
      <View style={{ padding: 30, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 14, color: 'black' }}>ScanSavvy App, Version 1.0.0</Text>
      </View>
    </View>
  );
}

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
          toValue: 60,
          duration: 1000,
          useNativeDriver: false,
        }),
        Animated.timing(translation, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: false,
        }),
      ])
    );
    animation.start();

    return () => animation.stop();
  }, [translation]);

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
                        <TouchableOpacity onPress={({ }) => navigation.dispatch(DrawerActions.openDrawer())}>
                          <Ionicons name="filter" size={30} color="white" />
                        </TouchableOpacity>
                        <View style={{ flexShrink: 1, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={[styles.headerTitle, { fontFamily: "Montserrat", fontWeight: 'bold', fontSize: 30, marginLeft: 9 }]}>ScanSavvy</Text>
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
            else if (title === "Favourites") {
              return <>
                <View style={{ width: '100%', height: heightHeader, backgroundColor: "#1E90FF", paddingTop: Constants.statusBarHeight }}>
                  <View style={styles.headerTop}>
                    <View>
                      <View style={styles.headerContent}>
                        <TouchableOpacity onPress={({ }) => navigation.dispatch(DrawerActions.openDrawer())}>
                          <Ionicons name="filter" size={30} color="white" />
                        </TouchableOpacity>
                        <View style={{ flexShrink: 1, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={[styles.headerTitle, { fontFamily: "Montserrat", fontWeight: 'bold', fontSize: 30, marginLeft: 9 }]}>ScanSavvy</Text>
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
            else if (title === "Notifications") {
              return <>
                <View style={{ width: '100%', height: heightHeader, backgroundColor: "#1E90FF", paddingTop: Constants.statusBarHeight }}>
                  <View style={styles.headerTop}>
                    <View>
                      <View style={styles.headerContent}>
                        <TouchableOpacity onPress={({ }) => navigation.dispatch(DrawerActions.openDrawer())}>
                          <Ionicons name="filter" size={30} color="white" />
                        </TouchableOpacity>
                        <View style={{ flexShrink: 1, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={[styles.headerTitle, { fontFamily: "Montserrat", fontWeight: 'bold', fontSize: 30, marginLeft: 9 }]}>ScanSavvy</Text>
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
            else if (title === "Settings") {
              return <>
                <View style={{ width: '100%', height: heightHeader, backgroundColor: "#1E90FF", paddingTop: Constants.statusBarHeight }}>
                  <View style={styles.headerTop}>
                    <View>
                      <View style={styles.headerContent}>
                        <TouchableOpacity onPress={({ }) => navigation.dispatch(DrawerActions.openDrawer())}>
                          <Ionicons name="filter" size={30} color="white" />
                        </TouchableOpacity>
                        <View style={{ flexShrink: 1, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                          <Text style={[styles.headerTitle, { fontFamily: "Montserrat", fontWeight: 'bold', fontSize: 30, marginLeft: 9 }]}>ScanSavvy</Text>
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
            else {
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


const MyDrawerApp = () => {
  const router = useRouter();
  const navigation = useNavigation();
  const Drawer = createDrawerNavigator();
  return (
    <Drawer.Navigator screenOptions={{
      headerShown: false,
      drawerActiveTintColor: "white",
      drawerInactiveTintColor: "white",
      drawerActiveBackgroundColor: "green",
      drawerInactiveBackgroundColor: "transparent",
      drawerStyle: { backgroundColor: "white", width: 300, height: "100%", padding: 0, margin: 0 },
    }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      {/* 
        viết layout cho menu tại đây
        Chú ý chúng ta dùng component={TabRootLayout}  để có bottom tabs ở bên dưới screen
      */}
      <Drawer.Screen name="Home" component={TabRootLayout}
        options={{
          drawerIcon: ({ focused, color, size }) => {
            return (
              <View style={{ backgroundColor: focused ? "green" : "#fff", borderRadius: 8, padding: 2 }}>
                <MaterialCommunityIcons name="home-outline" size={size} color={color} />
              </View>
            )
          },
          drawerLabel: ({ focused, color }) => {
            return (
              <View style={{ flex: 1 }}>
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={{ flex: 1, color: focused ? "green" : color, fontSize: 16, fontWeight: 500, paddingLeft: 10 }}>Home</Text>
                  <Entypo name="chevron-right" size={16} color={color} />
                </View>
              </View>
            )
          }
        }}
      />

      <Drawer.Screen name="collections" component={CollectionScreen}
        options={{
          headerShown: false,
          drawerIcon: ({ focused, color, size }) => {
            return (
              <View style={{ backgroundColor: focused ? "green" : "#fff", borderRadius: 8, padding: 2 }}>
                <MaterialIcons name="collections" size={size} color={color} />
              </View>
            )
          },
          drawerLabel: ({ focused, color }) => {
            return (
              <View style={{ flex: 1 }}>
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={{ flex: 1, color: focused ? "green" : color, fontSize: 16, fontWeight: 500, paddingLeft: 10 }}>Collections</Text>
                  <Entypo name="chevron-right" size={16} color={color} />
                </View>
              </View>
            )
          }
        }}
      />

      <Drawer.Screen name="cart" component={CartScreen}
        options={{
          headerShown: true,
          headerTitle: "Cart",
          // headerLeft: () => <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          //   <Ionicons name="filter" size={30} color="black" />
          // </TouchableOpacity>,

          headerRight: () => <TouchableOpacity style={{ paddingHorizontal: 20 }}>
            <AntDesign name="message1" size={24} color="black" />
          </TouchableOpacity>,

          drawerIcon: ({ focused, color, size }) => {
            return (
              <View style={{ backgroundColor: focused ? "green" : "#fff", borderRadius: 8, padding: 2 }}>

                <Ionicons name="cart" size={size} color={color} />
              </View>
            )
          },
          drawerLabel: ({ focused, color }) => {
            return (
              <View style={{ flex: 1 }}>
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={{ flex: 1, color: focused ? "green" : color, fontSize: 16, fontWeight: 500, paddingLeft: 10 }}>Carts</Text>
                  <Entypo name="chevron-right" size={16} color={color} />

                </View>
              </View>
            )
          }
        }}
      />

      <Drawer.Screen name="news" component={NewsScreen}
        options={{
          headerShown: true,
          headerTitle: "News",
          // headerLeft: () => <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          //   <Ionicons name="filter" size={30} color="black" />
          // </TouchableOpacity>,

          headerRight: () => <TouchableOpacity style={{ paddingHorizontal: 20 }}>
            <AntDesign name="search1" size={24} color="black" />
          </TouchableOpacity>,
          drawerIcon: ({ focused, color, size }) => {
            return (
              <View style={{ backgroundColor: focused ? "green" : "#fff", borderRadius: 8, padding: 2 }}>
                <MaterialIcons name="receipt" size={size} color={color} />
              </View>
            )
          },
          drawerLabel: ({ focused, color }) => {
            return (
              <View style={{ flex: 1 }}>
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={{ flex: 1, color: focused ? "green" : color, fontSize: 16, fontWeight: 500, paddingLeft: 10 }}>News</Text>
                  <Entypo name="chevron-right" size={16} color={color} />
                </View>
              </View>
            )
          }
        }}
      />

      <Drawer.Screen name="wishLists" component={WishListScreen}
        options={{
          headerShown: true,
          title: 'wishLists',
          headerTitle: "My Wishlist",
          // headerLeft: () => <TouchableOpacity style={{ paddingHorizontal: 20 }} onPress={() => navigation.dispatch(DrawerActions.openDrawer())}>
          //   <Ionicons name="filter" size={30} color="black" />
          // </TouchableOpacity>,

          drawerIcon: ({ focused, color, size }) => {
            return (
              <View style={{ backgroundColor: focused ? "green" : "#fff", borderRadius: 8, padding: 2 }}>
                <FontAwesome name="heart" size={size} color={color} />
              </View>
            )
          },
          drawerLabel: ({ focused, color }) => {
            return (
              <View style={{ flex: 1 }}>
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={{ flex: 1, color: focused ? "green" : color, fontSize: 16, fontWeight: 500, paddingLeft: 10 }}>My
                    Wishlist</Text>
                  <Entypo name="chevron-right" size={16} color={color} />
                </View>
              </View>
            )
          }
        }}
      />


      <Drawer.Screen name="RecentlyViewed" component={TabRootLayout}
        options={{
          drawerIcon: ({ focused, color, size }) => {
            return (
              <View style={{ backgroundColor: focused ? "green" : "#fff", borderRadius: 8, padding: 2 }}>
                <Ionicons name="eye" size={size} color={color} />
              </View>
            )
          },
          drawerLabel: ({ focused, color }) => {
            return (
              <View style={{ flex: 1 }}>
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={{ flex: 1, color: focused ? "green" : color, fontSize: 16, fontWeight: 500, paddingLeft: 10 }}>Recently Viewed</Text>
                  <Entypo name="chevron-right" size={16} color={color} />
                </View>
              </View>
            )
          }
        }}
      />


      <Drawer.Screen name="userAcoount" component={MyAccountScreen}
        options={{
          headerShown: true,
          title: 'userAcoount',
          headerTitle: "My Account",
          drawerIcon: ({ focused, color, size }) => {
            return (
              <View style={{ backgroundColor: focused ? "green" : "#fff", borderRadius: 8, padding: 2 }}>
                <Ionicons name="person" size={size} color={color} />
              </View>
            )
          },
          drawerLabel: ({ focused, color }) => {
            return (
              <View style={{ flex: 1 }}>
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={{ flex: 1, color: focused ? "green" : color, fontSize: 16, fontWeight: 500, paddingLeft: 10 }}>My Account </Text>
                  <Entypo name="chevron-right" size={16} color={color} />
                </View>
              </View>
            )
          }
        }}
      />

      <Drawer.Screen name="Shipping" component={TabRootLayout}
        options={{
          drawerIcon: ({ focused, color, size }) => {
            return (
              <View style={{ backgroundColor: focused ? "green" : "#fff", borderRadius: 8, padding: 2 }}>
                <MaterialIcons name="local-shipping" size={size} color={color} />
              </View>
            )
          },
          drawerLabel: ({ focused, color }) => {
            return (
              <View style={{ flex: 1 }}>
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={{ flex: 1, color: focused ? "green" : color, fontSize: 16, fontWeight: 500, paddingLeft: 10 }}>Shipping</Text>
                  <Entypo name="chevron-right" size={16} color={color} />
                </View>
              </View>
            )
          }
        }}
      />

      <Drawer.Screen name="About" component={aboutScrenn}
        options={{
          headerShown: true,
          title: 'About',
          headerTitle: "About App",
          drawerIcon: ({ focused, color, size }) => {
            return (
              <View style={{ backgroundColor: focused ? "green" : "#fff", borderRadius: 8, padding: 2 }}>
                <Entypo name="info" size={size} color={color} />
              </View>
            )
          },
          drawerLabel: ({ focused, color }) => {
            return (
              <View style={{ flex: 1 }}>
                <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={{ flex: 1, color: focused ? "green" : color, fontSize: 16, fontWeight: 500, paddingLeft: 10 }}>About</Text>
                  <Entypo name="chevron-right" size={16} color={color} />
                </View>
              </View>
            )
          }
        }}
      />
      <Drawer.Screen name="register" component={Signup} />

    </Drawer.Navigator>
  );
}



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

//export default TabRootLayout;
export default MyDrawerApp;