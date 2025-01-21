import { View, Text, SafeAreaView, Dimensions, Platform, StyleSheet, TouchableOpacity, TextInput, Image, useWindowDimensions, ScrollView } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font';
import { Ionicons, FontAwesome5, MaterialIcons, EvilIcons, FontAwesome } from '@expo/vector-icons';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { useRouter } from 'expo-router';
import { DrawerActions, useNavigation } from '@react-navigation/native';

// data image
const slides = [
  {
    image: require("../../../assets/images/PC/1.jpg"),
  },
  {
    image: require("../../../assets/images/PC/2.jpg"),
  },
  {
    image: require("../../../assets/images/PC/3.jpg"),
  },
  {
    image: require("../../../assets/images/PC/4.jpg"),
  },
  {
    image: require("../../../assets/images/PC/5.jpg"),
  },
  {
    image: require("../../../assets/images/PC/6.jpg"),
  }
]
const { width: screenWidth } = Dimensions.get('window')

const HomeScreens = () => {
  const router = useRouter()
  const navigation = useNavigation()
  const { width, height } = useWindowDimensions()
  const [fontsLoaded, fontError] = useFonts({
    HelvetIns: require("../../../assets/fonts/HelvetIns.ttf"),
    PlaywriteNL: require("../../../assets/fonts/Playwrite_NL/Playwrite-NL.ttf"),
    Montserrat: require("../../../assets/fonts/Montserrat/static/Montserrat-Regular.ttf"),

  });
  const _renderItem = ({ item }: any) => {
    return (
      <TouchableOpacity style={{ width: '100%' }}>
        <Image source={item.image} style={{ width: '100%', height: 280, borderRadius: 15 }} />
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.box}>
      <ScrollView style={styles.container}>
        {/* {header} */}
        {/* <View style={styles.headerTop}>
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
        </View> */}


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
          <View style={{ width: '100%' }}>

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

        {/* category */}
        <View style={{ width: '100%', padding: 20 }}>
          {/* Title */}
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', marginBottom: 20 }}>
            <FontAwesome5 name="shopping-cart" size={20} color="green" />
            <Text style={{ fontWeight: 'bold', fontSize: 16, paddingLeft: 10 }}>Our Services</Text>
          </View>

          {/* Icons and Text */}
          <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {[
              { icon: <FontAwesome name="qrcode" size={30} color="green" />, label: 'QR & Barcode Scanning' },
              { icon: <FontAwesome name="dollar" size={30} color="green" />, label: 'Price Comparison' },
              { icon: <FontAwesome name="camera" size={30} color="green" />, label: 'Image Recognition' },
              { icon: <FontAwesome5 name="bell" size={30} color="green" />, label: 'Stock Alerts' },
              { icon: <FontAwesome name="heart" size={30} color="green" />, label: 'Recommendations' },
              { icon: <MaterialIcons name="store" size={30} color="green" />, label: 'Inventory Management' },
            ].map((item, index) => (
              <TouchableOpacity
                key={index}
                style={{
                  width: '30%', // Adjust the width as needed
                  alignItems: 'center',
                  marginBottom: 20,
                }}
              >
                <View
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderWidth: 1,
                    borderColor: '#EBEBEB',
                  }}
                >
                  {item.icon}
                </View>
                <Text
                  style={{
                    textAlign: 'center',
                    marginTop: 10,
                    color: '#000',
                    fontFamily: 'Montserrat',
                    fontSize: 12,
                  }}
                >
                  {item.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* list PC */}

        <View style={{ width: '100%', paddingHorizontal: 10 }}>
          <View style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', paddingHorizontal: 10 }}>
            <FontAwesome name="plane" size={30} color="green" />
            <Text style={{ fontWeight: 'bold', fontSize: 16, paddingVertical: 20, paddingLeft: 10, textTransform: 'capitalize' }}>PC 2024 (hot)</Text>
          </View>
          <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <TouchableOpacity style={{ width: '50%', padding: 10 }}>
              <View style={{ width: '100%', backgroundColor: '#F4F4F4', borderRadius: 10 }}>
                <Image source={require("../../../assets/images/PC/7.jpg")} style={{ width: '100%', height: 120, borderTopRightRadius: 10, borderTopLeftRadius: 10 }} />
                <View style={{ width: '100%', paddingHorizontal: 20 }}>

                  <Text style={{ fontSize: 16, paddingTop: 15, textAlign: 'left', fontWeight: 'bold', height: 65 }}>Đảo Tuần Châu</Text>
                  <View style={{ paddingTop: 5, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Text style={{ fontSize: 14 }}>4,4</Text>
                    <FontAwesome name="star" size={16} color="orange" />
                    <Text style={{ fontSize: 14 }}>(1,3N)</Text>
                  </View>
                  <Text style={{ fontSize: 14, paddingVertical: 15 }} numberOfLines={1}>Đảo</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: '50%', padding: 10 }}>
              <View style={{ width: '100%', backgroundColor: '#F4F4F4', borderRadius: 10 }}>
                <Image source={require("../../../assets/images/PC/8.jpg")} style={{ width: '100%', height: 120, borderTopRightRadius: 10, borderTopLeftRadius: 10 }} />
                <View style={{ width: '100%', paddingHorizontal: 20 }}>

                  <Text style={{ fontSize: 16, paddingTop: 15, textAlign: 'left', fontWeight: 'bold', height: 65 }}>Vịnh Bái Tử Long</Text>
                  <View style={{ paddingTop: 5, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Text style={{ fontSize: 14 }}>4,4</Text>
                    <FontAwesome name="star" size={16} color="orange" />
                    <Text style={{ fontSize: 14 }}>(1,3N)</Text>
                  </View>
                  <Text style={{ fontSize: 14, paddingVertical: 15 }} numberOfLines={1}>Vịnh</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: '50%', padding: 10 }}>
              <View style={{ width: '100%', backgroundColor: '#F4F4F4', borderRadius: 10 }}>
                <Image source={require("../../../assets/images/PC/9.jpg")} style={{ width: '100%', height: 120, borderTopRightRadius: 10, borderTopLeftRadius: 10 }} />
                <View style={{ width: '100%', paddingHorizontal: 20 }}>

                  <Text style={{ fontSize: 16, paddingTop: 15, textAlign: 'left', fontWeight: 'bold', height: 65 }}>Bải Biển Hạ Long</Text>
                  <View style={{ paddingTop: 5, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Text style={{ fontSize: 14 }}>4,4</Text>
                    <FontAwesome name="star" size={16} color="orange" />
                    <Text style={{ fontSize: 14 }}>(1,3N)</Text>
                  </View>
                  <Text style={{ fontSize: 14, paddingVertical: 15 }} numberOfLines={1}>Điểm thu hút khách nước ngoài</Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={{ width: '50%', padding: 10 }}>
              <View style={{ width: '100%', backgroundColor: '#F4F4F4', borderRadius: 10 }}>
                <Image source={require("../../../assets/images/PC/10.jpg")} style={{ width: '100%', height: 120, borderTopRightRadius: 10, borderTopLeftRadius: 10 }} />
                <View style={{ width: '100%', paddingHorizontal: 20 }}>

                  <Text style={{ fontSize: 16, paddingTop: 15, textAlign: 'left', fontWeight: 'bold', height: 65 }}>Núi Bài Thơ</Text>
                  <View style={{ paddingTop: 5, display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    <Text style={{ fontSize: 14 }}>4,4</Text>
                    <FontAwesome name="star" size={16} color="orange" />
                    <Text style={{ fontSize: 14 }}>(1,3N)</Text>
                  </View>
                  <Text style={{ fontSize: 14, paddingVertical: 15 }} numberOfLines={1}>Điểm thu hút khách nước ngoài</Text>
                </View>
              </View>
            </TouchableOpacity>

          </View>
        </View>
      </ScrollView>
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