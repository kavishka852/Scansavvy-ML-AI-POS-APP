import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

const FavouritesScreen = () => {
  const favouriteItems = [
    {
      id: '1',
      title: 'Beautiful Sunset',
      image: require('../../../assets/images/PC/8.jpg'),
      description: 'A stunning view of the sunset.',
    },
    {
      id: '2',
      title: 'Mountain Adventure',
      image: require('../../../assets/images/PC/7.jpg'),
      description: 'Explore the scenic mountain trails.',
    },
    {
      id: '3',
      title: 'City Lights',
      image: require('../../../assets/images/PC/4.jpg'),
      description: 'Experience the vibrant city nightlife.',
    },
    {
      id: '4',
      title: 'Beach Vibes',
      image: require('../../../assets/images/PC/9.jpg'),
      description: 'Relax by the shore with calming waves.',
    },
    {
      id: '5',
      title: 'Forest Retreat',
      image: require('../../../assets/images/PC/10.jpg'),
      description: 'Reconnect with nature in a serene forest.',
    },
    {
      id: '6',
      title: 'Desert Escape',
      image: require('../../../assets/images/PC/11.png'),
      description: 'Discover the beauty of golden sands.',
    },
    {
      id: '7',
      title: 'Snowy Mountains',
      image: require('../../../assets/images/PC/12.png'),
      description: 'Enjoy breathtaking views of snow-covered peaks.',
    },
    {
      id: '8',
      title: 'Tropical Paradise',
      image: require('../../../assets/images/PC/13.jpg'),
      description: 'Soak in the sun on a tropical island.',
    },
  ];

  const renderItem = ({ item }:any) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => router.push("/(screens)/productDetails")}
    >
      <Image source={item.image} style={styles.cardImage} />
      <LinearGradient
        colors={['rgba(0,0,0,0.6)', 'rgba(0,0,0,0.3)', 'transparent']}
        style={styles.overlay}
      />
      <View style={styles.cardContent}>
        <Text style={styles.cardTitle}>{item.title}</Text>
        <Text style={styles.cardDescription}>{item.description}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {favouriteItems.length > 0 ? (
        <FlatList
          data={favouriteItems}
          renderItem={renderItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.list}
          numColumns={2}
          ListFooterComponent={<View style={{ height: 100 }} />} // Add spacing for the bottom
        />
      ) : (
        <Text style={styles.emptyText}>
          You haven't added any favorites yet.
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f9',
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  list: {
    justifyContent: 'space-between',
    paddingBottom: 100, // Ensure padding to avoid overlap with the navigator
  },
  card: {
    flex: 1,
    margin: 10,
    borderRadius: 15,
    overflow: 'hidden',
    elevation: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    aspectRatio: 1, // Make the card a perfect square
  },
  cardImage: {
    width: '100%',
    height: '100%', // Ensure the image covers the card
    resizeMode: 'cover',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  cardContent: {
    padding: 12,
    zIndex: 2,
    position: 'absolute',
    bottom: 10,
    left: 10,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  cardDescription: {
    fontSize: 14,
    color: '#ddd',
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    marginTop: 4,
  },
  emptyText: {
    fontSize: 18,
    color: '#bbb',
    textAlign: 'center',
    marginTop: 50,
  },
});

export default FavouritesScreen;
