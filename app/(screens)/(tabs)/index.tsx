import { View, Text, SafeAreaView, Dimensions, Platform, StyleSheet, TouchableOpacity, TextInput, Image, useWindowDimensions, ScrollView } from 'react-native'
import React from 'react'
import { useFonts } from 'expo-font';
import { Ionicons, FontAwesome5, MaterialIcons, EvilIcons, FontAwesome } from '@expo/vector-icons';
import Carousel, { ParallaxImage } from 'react-native-snap-carousel';
import { useRouter } from 'expo-router';
import { DrawerActions, useNavigation } from '@react-navigation/native';
import DiscountBanner from '@/components/Scansavy_Prop/discount';

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
        <DiscountBanner
          discount="20% OFF"
          description="on your first order"
          code="WELCOME KAVISHKA"
        />

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
            <FontAwesome5 name="shopping-cart" size={20} color="#1E90FF" />
            <Text style={{ fontWeight: 'bold', fontSize: 16, paddingLeft: 10 }}>Our Services</Text>
          </View>

          {/* Icons and Text */}
          <View style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' }}>
            {[
              { icon: <FontAwesome name="qrcode" size={30} color="#1E90FF" />, label: 'Smart QR Scanner' },
              { icon: <FontAwesome name="camera" size={30} color="#1E90FF" />, label: 'Instant Image Capture' },
              { icon: <FontAwesome5 name="bell" size={30} color="#1E90FF" />, label: 'Stock Release Alerts' },
              { icon: <FontAwesome name="heart" size={30} color="#1E90FF" />, label: 'Recommend Alerts' },
              { icon: <FontAwesome name="gift" size={30} color="#1E90FF" />, label: 'Exclusive Deals Today' },
              { icon: <FontAwesome name="shopping-cart" size={30} color="#1E90FF" />, label: 'Pick your item' },
              // { icon: <FontAwesome name="dollar" size={30} color="#1E90FF" />, label: 'Price Comparison' },
              // { icon: <MaterialIcons name="store" size={30} color="#1E90FF" />, label: 'Inventory Management' },
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
            <FontAwesome name="plane" size={30} color="#1E90FF" />
            <Text style={{ fontWeight: 'bold', fontSize: 16, paddingVertical: 20, paddingLeft: 10, textTransform: 'capitalize' }}>PC 2024 (hot)</Text>
          </View>
          <View style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', flexWrap: 'wrap' }}>
            <TouchableOpacity
              style={styles.cardContainer}
              onPress={() => router.push('/(screens)/productDetails')}
            >
              <View style={styles.card}>
                {/* Product Image */}
                <View style={styles.imageContainer}>
                  <Image
                    source={require("../../../assets/images/PC/Assus rog.png")}
                    style={styles.image}
                  />
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>12% OFF</Text>
                  </View>
                </View>

                {/* Product Details */}
                <View style={styles.detailsContainer}>
                  {/* Title */}
                  <Text numberOfLines={2} style={styles.title}>
                    ASUS ROG STRIX G16 2024 G614JIR I9 14TH GEN RTX 4070
                  </Text>

                  {/* Price and Rating Section */}
                  <View style={styles.priceRatingContainer}>
                    <View style={styles.priceContainer}>
                      <Text style={styles.currentPrice}>Rs. 700,000</Text>
                      <Text style={styles.originalPrice}>Rs. 799,999</Text>
                    </View>

                    <View style={styles.ratingContainer}>
                      <FontAwesome name="star" size={16} color="#F59E0B" />
                      <Text style={styles.ratingText}>4.5</Text>
                    </View>
                  </View>

                  {/* Category and Stock */}
                  <View style={styles.bottomContainer}>
                    <Text style={styles.categoryText}>Laptop</Text>
                    <Text style={styles.stockText}>In Stock</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cardContainer}
              onPress={() => router.push('/(screens)/productDetails')}
            >
              <View style={styles.card}>
                {/* Product Image */}
                <View style={styles.imageContainer}>
                  <Image
                    source={require("../../../assets/images/PC/MSI thin.png")}
                    style={styles.image}
                  />
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>15% OFF</Text>
                  </View>
                </View>

                {/* Product Details */}
                <View style={styles.detailsContainer}>
                  {/* Title */}
                  <Text numberOfLines={2} style={styles.title}>
                    MSI THIN 15 B12UC I5 12TH GEN RTX 3050
                  </Text>

                  {/* Price and Rating Section */}
                  <View style={styles.priceRatingContainer}>
                    <View style={styles.priceContainer}>
                      <Text style={styles.currentPrice}>Rs. 259,000</Text>
                      <Text style={styles.originalPrice}>Rs. 265,999</Text>
                    </View>

                    <View style={styles.ratingContainer}>
                      <FontAwesome name="star" size={16} color="#F59E0B" />
                      <Text style={styles.ratingText}>4.3</Text>
                    </View>
                  </View>

                  {/* Category and Stock */}
                  <View style={styles.bottomContainer}>
                    <Text style={styles.categoryText}>Laptop</Text>
                    <Text style={styles.stockText}>In Stock</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cardContainer}
              onPress={() => router.push('/(screens)/productDetails')}
            >
              <View style={styles.card}>
                {/* Product Image */}
                <View style={styles.imageContainer}>
                  <Image
                    source={require("../../../assets/images/PC/Vievsonic.png")}
                    style={styles.image}
                  />
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>10% OFF</Text>
                  </View>
                </View>

                {/* Product Details */}
                <View style={styles.detailsContainer}>
                  {/* Title */}
                  <Text numberOfLines={2} style={styles.title}>
                    Viewsonic OMNI VX2479-HD-PRO 24” 165Hz Gaming Monitor
                  </Text>

                  {/* Price and Rating Section */}
                  <View style={styles.priceRatingContainer}>
                    <View style={styles.priceContainer}>
                      <Text style={styles.currentPrice}>Rs. 49,000</Text>
                      <Text style={styles.originalPrice}>Rs. 55,999</Text>
                    </View>

                    <View style={styles.ratingContainer}>
                      <FontAwesome name="star" size={16} color="#F59E0B" />
                      <Text style={styles.ratingText}>4.3</Text>
                    </View>
                  </View>

                  {/* Category and Stock */}
                  <View style={styles.bottomContainer}>
                    <Text style={styles.categoryText}>Monitor</Text>
                    <Text style={styles.stockText}>In Stock</Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.cardContainer}
              onPress={() => router.push('/(screens)/productDetails')}
            >
              <View style={styles.card}>
                {/* Product Image */}
                <View style={styles.imageContainer}>
                  <Image
                    source={require("../../../assets/images/PC/MSI modern monitor.png")}
                    style={styles.image}
                  />
                  <View style={styles.discountBadge}>
                    <Text style={styles.discountText}>13% OFF</Text>
                  </View>
                </View>

                {/* Product Details */}
                <View style={styles.detailsContainer}>
                  {/* Title */}
                  <Text numberOfLines={2} style={styles.title}>
                    MSI Modern MD342CQP 34" UWQHD 120HZ Curved Monitor with PD 98W
                  </Text>

                  {/* Price and Rating Section */}
                  <View style={styles.priceRatingContainer}>
                    <View style={styles.priceContainer}>
                      <Text style={styles.currentPrice}>Rs. 259,000</Text>
                      <Text style={styles.originalPrice}>Rs. 265,999</Text>
                    </View>

                    <View style={styles.ratingContainer}>
                      <FontAwesome name="star" size={16} color="#F59E0B" />
                      <Text style={styles.ratingText}>4.3</Text>
                    </View>
                  </View>

                  {/* Category and Stock */}
                  <View style={styles.bottomContainer}>
                    <Text style={styles.categoryText}>Monitor</Text>
                    <Text style={styles.stockText}>In Stock</Text>
                  </View>
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
  },
  cardContainer: {
    width: '50%',
    padding: 8,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  imageContainer: {
    position: 'relative',
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 120,
    resizeMode: 'cover',
  },
  discountBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    backgroundColor: '#EF4444',
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  discountText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: 'bold',
  },
  detailsContainer: {
    padding: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
    marginBottom: 8,
    height: 44, // Approximately 2 lines
  },
  priceRatingContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  priceContainer: {
    flex: 1,
  },
  currentPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1F2937',
  },
  originalPrice: {
    fontSize: 14,
    color: '#6B7280',
    textDecorationLine: 'line-through',
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 14,
    color: '#4B5563',
    marginLeft: 4,
  },
  bottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  categoryText: {
    fontSize: 14,
    color: '#6B7280',
  },
  stockText: {
    fontSize: 14,
    color: '#059669',
    fontWeight: '500',
  },
})

export default HomeScreens