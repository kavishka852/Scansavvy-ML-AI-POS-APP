import { View, Text, SafeAreaView ,Dimensions,Platform, StyleSheet, TouchableOpacity, TextInput, Image, useWindowDimensions, ScrollView} from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font';
import { Ionicons, FontAwesome5, MaterialIcons, EvilIcons, FontAwesome } from '@expo/vector-icons';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { useRouter } from 'expo-router';
import { DrawerActions, useNavigation } from '@react-navigation/native';
// data image
const slides = [
  {
    image: require("../../../assets/images/travel/1.jpg"),
  },
  {
    image: require("../../../assets/images/travel/2.jpg"),
  },
  {
    image: require("../../../assets/images/travel/3.jpg"),
  },
  {
    image: require("../../../assets/images/travel/4.jpg"),
  },
  {
    image: require("../../../assets/images/travel/5.jpg"),
  },
  {
    image: require("../../../assets/images/travel/6.jpg"),
  }
]
const { width: screenWidth } = Dimensions.get('window')

const HomeScreens = () => {
  const router = useRouter( )
  const navigation = useNavigation()
  const {width,height} = useWindowDimensions()
  const [fontsLoaded, fontError] = useFonts({
    HelvetIns: require("../../../assets/fonts/HelvetIns.ttf"),
    PlaywriteNL: require("../../../assets/fonts/Playwrite_NL/Playwrite-NL.ttf"),
    Montserrat: require("../../../assets/fonts/Montserrat/static/Montserrat-Regular.ttf"),

  });
  const _renderItem = ({item} :  any) => {
    return (
      <TouchableOpacity style={{width:'100%'}}>
          <Image source = {item.image} style={{width:'100%',height:280, borderRadius:15}} />
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.box}>
      <View style={styles.container}>
        {/* {header} */}
        <View style={styles.headerTop}>
          <View>
            <View style={styles.headerContent}>
              <TouchableOpacity>
                <Ionicons name="filter" size={30} color="black" />
              </TouchableOpacity>
              <View style={{ flexShrink: 1, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={[styles.headerTitle, { fontFamily: "HelvetIns", fontSize: 30, marginLeft: 9 }]}>ScanSavvy</Text>
              </View>
              <TouchableOpacity>
                <View>
                  <EvilIcons name="bell" size={40} color="black" />
                  <View style={{ width: 22, height: 22, borderRadius: 20, backgroundColor: 'red', position: 'absolute', top: -5, right: 0, flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ color: 'white', textAlign: 'center', fontSize: 10, fontWeight: 'bold' }}>99</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>


        {/* {Search product} */}
        <View style={styles.boxSearch}>
          <View style={styles.boxSearchContent}>
            <Text style={styles.searchTitle}>
              What do you want
            </Text>
            <Text style={styles.searchTitle}>
              to try?
            </Text>
            <View style={{ paddingVertical: 30, position: 'relative' }}>
              <TextInput placeholder='E.g. Nero PC House' style={{
                height: 50, paddingRight: 10, paddingVertical: 20,
                borderRadius: 7, backgroundColor: '#F0F1F1', paddingLeft: 40
              }} placeholderTextColor={'gray'}></TextInput>
              <TouchableOpacity style={{ position: 'absolute', top: 43, left: 10 }}>
                <FontAwesome name="map-marker" size={24} color="gray" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View>
                <View style={{width:'100%'}}>
                   
                   {
                    
                       <Carousel
                       sliderWidth={screenWidth}
                       sliderHeight={screenWidth}
                       itemWidth={screenWidth - 100}
                       data={slides}
                       renderItem={_renderItem}
                       hasParallaxImages={true}
                   />
                   }
                </View>
            </View>

      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  box: {
    flex: 1,
    backgroundColor: 'white'
  },
  container: {
    width: '100%',
    height: '100%',
  },
  headerTop: {
    width: '100%',
    paddingHorizontal: 20,
    paddingVertical: 10,
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
    color: '#1E90FF'
  },
  boxSearch: {
    width: '100%',
    paddingHorizontal: 20,
    paddingTop: 30


  },
  boxSearchContent: {
    width: '100%',

  },
  searchTitle: {
    fontSize: 30,
    fontWeight: '500',
    color: '#000',
    fontFamily: "Montserrat",
    letterSpacing: 2,
    lineHeight: 40
  }
})

export default HomeScreens