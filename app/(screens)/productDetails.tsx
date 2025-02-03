import { View, Text, Image, useWindowDimensions, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import Svg, { Path } from "react-native-svg";
import { AntDesign, Fontisto, FontAwesome, Ionicons } from '@expo/vector-icons';
import Constants from "expo-constants";
import { useRouter } from 'expo-router';

const ProductDetailsScreen = () => {
  const router = useRouter();
  const { width, height } = useWindowDimensions();
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('Black');
  const [isWishlisted, setIsWishlisted] = useState(false);

  const colors = ['Black', 'White', 'Grey'];
  const maxQuantity = 5;

  const handleQuantityChange = (increment: boolean) => {
    setQuantity(prev => {
      const newValue = increment ? prev + 1 : prev - 1;
      return Math.min(Math.max(1, newValue), maxQuantity);
    });
  };

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header Section */}
        <View style={[styles.headerContainer, { height: height / 3 + 80 }]}>
          {/* Header Buttons */}
          <View style={styles.headerButtons}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
              <AntDesign name="arrowleft" size={20} color="white" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => setIsWishlisted(!isWishlisted)}>
              <View style={[styles.wishlistButton, isWishlisted && styles.wishlistedButton]}>
                <Fontisto name="favorite" size={20} color="#fff" />
              </View>
            </TouchableOpacity>
          </View>

          <Image
            source={require('../../assets/images/PC/Assus rog.png')}
            style={styles.heroImage}
          />

          {/* Decorative SVG */}
          <View style={styles.svgContainer}>
            <Svg width={`${width}`} height={150} fill="none">
              <Path
                d={`M 0 0 C 20 40 40 40 60 40 L ${width - 60} 40 C ${width - 40} 40 ${width - 20} 40 ${width} 80
                      L ${width} 150 C ${width - 20} 110 ${width - 40} 110 ${width - 60} 110 
                      L 60 110 C 40 110 20 110 0 80`}
                fill="#fcfaec"
                stroke={"transparent"}
                strokeWidth={0}
              />
            </Svg>
          </View>


          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <AntDesign name="star" size={20} color="#eebd06" />
              <Text style={styles.statText}>5.0 (24 Reviews)</Text>
            </View>
            <View style={styles.statItem}>
              <AntDesign name="eye" size={20} color="#ee5a06" />
              <Text style={styles.statText}>120 Views</Text>
            </View>
          </View>
        </View>
        <View style={styles.titleSection}>
          <View style={styles.titleCard}>
            <Text style={styles.brandText}>ASUS ROG</Text>
            <Text style={styles.modelText}>STRIX G16 2024</Text>
            <Text style={styles.subModelText}>G614JIR I9 14TH GEN RTX 4070</Text>
          </View>
        </View>
        {/* Content */}
        <View style={styles.contentContainer}>
          {/* Price Section */}
          <View style={styles.priceSection}>
            <Text style={styles.currentPrice}>LKR 700,000</Text>
            <Text style={styles.originalPrice}>LKR 799,999</Text>
            <View style={styles.discountBadge}>
              <Text style={styles.discountText}>12% OFF</Text>
            </View>
          </View>

          {/* Color Selection */}
          <View style={styles.colorSection}>
            <Text style={styles.sectionTitle}>Color</Text>
            <View style={styles.colorOptions}>
              {colors.map((color) => (
                <TouchableOpacity
                  key={color}
                  style={[
                    styles.colorButton,
                    selectedColor === color && styles.selectedColorButton
                  ]}
                  onPress={() => setSelectedColor(color)}
                >
                  <Text style={[
                    styles.colorButtonText,
                    selectedColor === color && styles.selectedColorText
                  ]}>{color}</Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Quantity Selector */}
          <View style={styles.quantitySection}>
            <Text style={styles.sectionTitle}>Quantity</Text>
            <View style={styles.quantitySelector}>
              <TouchableOpacity
                style={[styles.quantityButton, quantity <= 1 && styles.quantityButtonDisabled]}
                onPress={() => handleQuantityChange(false)}
                disabled={quantity <= 1}
              >
                <AntDesign name="minus" size={20} color={quantity <= 1 ? "#ccc" : "#000"} />
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                style={[styles.quantityButton, quantity >= maxQuantity && styles.quantityButtonDisabled]}
                onPress={() => handleQuantityChange(true)}
                disabled={quantity >= maxQuantity}
              >
                <AntDesign name="plus" size={20} color={quantity >= maxQuantity ? "#ccc" : "#000"} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Specifications */}
          <View style={styles.specSection}>
            <Text style={styles.sectionTitle}>Specifications</Text>
            <View style={styles.specList}>
              <Text style={styles.specText}>• Intel Core i9 14900HX (36MB Cache, up to 5.8 GHz)</Text>
              <Text style={styles.specText}>• 16GB DDR5 5600MHZ</Text>
              <Text style={styles.specText}>• 1TB M.2 GEN4 NVME SSD</Text>
              <Text style={styles.specText}>• 16-inch QHD+ 240HZ G-Sync</Text>
              <Text style={styles.specText}>• NVIDIA® GeForce RTX 4070 8GB GDDR6</Text>
              <Text style={styles.specText}>• Backlit Chiclet Keyboard Per-Key RGB</Text>
              <Text style={styles.specText}>• 2.5 kg, 90WHrs</Text>
              <Text style={styles.specText}>• Free ASUS ROG Backpack</Text>
              <Text style={styles.specText}>• Genuine Windows 11 Home 64Bit Pre-installed</Text>
              <Text style={styles.specText}>• Storage upgrades (Additional Slot Available Supports up to GEN4)</Text>
            </View>
          </View>

          {/* Gallery */}
          <View style={{ paddingTop: 10 }}>
            <Text style={{ fontWeight: '500', fontSize: 25, color: '#2e2e2e', paddingBottom: 10 }}>Gallery</Text>
            <View style={{ flexDirection: 'row', gap: 10, justifyContent: 'space-between', marginTop: 5 }}>
              <TouchableOpacity>
                <Image source={require('../../assets/images/PC/1.jpg')} style={{ width: 80, height: 80, borderRadius: 15 }} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={require('../../assets/images/PC/2.jpg')} style={{ width: 80, height: 80, borderRadius: 15 }} />
              </TouchableOpacity>
              <TouchableOpacity>
                <Image source={require('../../assets/images/PC/4.jpg')} style={{ width: 80, height: 80, borderRadius: 15 }} />
              </TouchableOpacity>
              <TouchableOpacity>
                <View style={{ position: 'relative', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                  <Text style={{ position: 'absolute', zIndex: 10, fontSize: 23, color: 'white', fontWeight: '500' }}>5+</Text>
                  <Image source={require('../../assets/images/PC/3.jpg')} style={{ width: 80, height: 80, borderRadius: 15 }} />
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView >

      {/* Footer */}
      < View style={styles.footer} >
        <View style={styles.footerContent}>
          <TouchableOpacity style={styles.cartButton}>
            <Ionicons name="cart-outline" size={24} color="white" />
            <Text style={styles.buttonText}>Add to Cart</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.buyButton}>
            <FontAwesome name="send" size={24} color="white" />
            <Text style={styles.buttonText} onPress={() => router.push('/(screens)/checkout')}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </View >
    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  titleSection: {
    paddingHorizontal: 5,
    marginBottom: 5,
    backgroundColor: '#fff',
    width: 390
  },
  titleCard: {
    zIndex: 100,
    marginTop: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 15,
    padding: 15,
    backdropFilter: 'blur(10px)',
    borderLeftWidth: 4,
    borderLeftColor: '#ee5a06',
  },

  titleContent: {
    gap: 5,
  },

  brandText: {
    color: '#ee5a06',
    fontSize: 18,
    fontWeight: '600',
  },

  modelText: {
    color: '#FFFFFF',
    fontSize: 28,
    fontWeight: 'bold',
  },

  subModelText: {
    color: '#CCCCCC',
    fontSize: 14,
    fontWeight: '500',
  },
  headerContainer: {
    width: '100%',
    position: 'relative',
    marginBottom: 20,
  },
  headerButtons: {
    width: '100%',
    paddingTop: Constants.statusBarHeight,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    position: 'absolute',
    zIndex: 200,
  },
  backButton: {
    padding: 8,
    backgroundColor: '#ee5a06',
    borderRadius: 20,
    width: 35,
    height: 35,
  },
  wishlistButton: {
    width: 35,
    height: 35,
    borderRadius: 20,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ee5a06',
  },
  wishlistedButton: {
    backgroundColor: '#ff0000',
  },
  heroImage: {
    width: '100%',
    height: '100%',
    borderBottomLeftRadius: 50,
    position: 'absolute',
    top: 0,
  },
  svgContainer: {
    position: 'absolute',
    height: 150,
    top: 280,
    left: 0,
    backgroundColor: 'transparent',
  },
  titleContainer: {
    position: 'absolute',
    top: 250,
    left: 30,
  },
  titleText: {
    fontWeight: '600',
    fontSize: 35,
    color: '#FFF',
  },
  statsContainer: {
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    gap: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontWeight: '500',
    fontSize: 17,
    paddingLeft: 10,
  },
  contentContainer: {
    padding: 20,
  },
  priceSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  currentPrice: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  originalPrice: {
    fontSize: 18,
    color: '#666',
    textDecorationLine: 'line-through',
    marginLeft: 10,
  },
  discountBadge: {
    backgroundColor: '#ff4444',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 12,
    marginLeft: 10,
  },
  discountText: {
    color: 'white',
    fontWeight: 'bold',
  },
  colorSection: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
  colorOptions: {
    flexDirection: 'row',
    gap: 10,
  },
  colorButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  selectedColorButton: {
    backgroundColor: '#ee5a06',
    borderColor: '#ee5a06',
  },
  colorButtonText: {
    color: '#000',
  },
  selectedColorText: {
    color: 'white',
  },
  quantitySection: {
    marginBottom: 20,
  },
  quantitySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  quantityButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
    justifyContent: 'center',
    alignItems: 'center',
  },
  quantityButtonDisabled: {
    backgroundColor: '#eee',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '500',
  },
  specSection: {
    marginBottom: 20,
  },
  specList: {
    gap: 8,
  },
  specText: {
    fontSize: 16,
    color: '#545454',
    lineHeight: 24,
  },
  gallerySection: {
    marginBottom: 20,
  },
  galleryItem: {
    marginRight: 10,
  },
  galleryImage: {
    width: 100,
    height: 100,
    borderRadius: 15,
  },
  morePhotosOverlay: {
    position: 'absolute',
    zIndex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 15,
  },
  morePhotosText: {
    color: 'white',
    fontSize: 23,
    fontWeight: '500',
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: '#eee',
    padding: 15,
    backgroundColor: 'white',
  },
  footerContent: {
    flexDirection: 'row',
    gap: 15,
  },
  cartButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#666',
    padding: 15,
    borderRadius: 25,
  },
  buyButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    backgroundColor: '#ee5a06',
    padding: 15,
    borderRadius: 25,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ProductDetailsScreen;