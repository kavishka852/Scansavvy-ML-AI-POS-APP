import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  SafeAreaView,
} from 'react-native';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';

interface Transaction {
  id: string;
  date: Date;
  merchantName: string;
  amount: number;
  category: string;
  status: 'completed' | 'pending' | 'refunded';
  paymentMethod: string;
  orderNumber: string;
  deliveryAddress: string;
  items: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
  }>;
}

const PurchaseDetailScreen = () => {
  const router = useRouter();
  const params = useLocalSearchParams();
  
  // Parse the transaction data and handle date conversion
  const rawTransaction = params.transaction ? JSON.parse(params.transaction as string) : null;
  const transaction: Transaction | null = rawTransaction ? {
    ...rawTransaction,
    date: new Date(rawTransaction.date)
  } : null;

  if (!transaction) {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity 
            onPress={() => router.back()}
            style={styles.backButton}
          >
            <MaterialIcons name="arrow-back-ios" size={24} color="#007AFF" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Order Details</Text>
        </View>
        <View style={[styles.content, { justifyContent: 'center', alignItems: 'center' }]}>
          <Text>No transaction details available</Text>
        </View>
      </SafeAreaView>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return '#4CAF50';
      case 'pending':
        return '#FFC107';
      case 'refunded':
        return '#F44336';
      default:
        return '#000000';
    }
  };

  const formatDate = (date: Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          onPress={() => router.back()}
          style={styles.backButton}
        >
          <MaterialIcons name="arrow-back-ios" size={24} color="#007AFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Order Details</Text>
        <TouchableOpacity style={styles.shareButton}>
          <MaterialIcons name="share" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Status Card */}
        <View style={styles.card}>
          <View style={styles.statusHeader}>
            <View style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(transaction.status) + '20' }
            ]}>
              <Text style={[
                styles.statusText,
                { color: getStatusColor(transaction.status) }
              ]}>
                {transaction.status.toUpperCase()}
              </Text>
            </View>
            <Text style={styles.orderNumber}>Order #{transaction.orderNumber}</Text>
          </View>
          <Text style={styles.dateText}>{formatDate(transaction.date)}</Text>
        </View>

        {/* Items Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Items</Text>
          {transaction.items.map((item, index) => (
            <View key={item.id} style={styles.itemContainer}>
              <Image
                source={{ uri: item.image }}
                style={styles.itemImage}
              />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemQuantity}>Quantity: {item.quantity}</Text>
                <Text style={styles.itemPrice}>₹{item.price.toLocaleString('en-IN')}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Payment Details Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Payment Details</Text>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Payment Method</Text>
            <View style={styles.paymentMethod}>
              <FontAwesome5 name="credit-card" size={16} color="#666" />
              <Text style={styles.paymentText}>{transaction.paymentMethod}</Text>
            </View>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Subtotal</Text>
            <Text style={styles.paymentText}>₹{(transaction.amount * 0.82).toLocaleString('en-IN')}</Text>
          </View>
          <View style={styles.paymentRow}>
            <Text style={styles.paymentLabel}>Tax (18%)</Text>
            <Text style={styles.paymentText}>₹{(transaction.amount * 0.18).toLocaleString('en-IN')}</Text>
          </View>
          <View style={[styles.paymentRow, styles.totalRow]}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalAmount}>₹{transaction.amount.toLocaleString('en-IN')}</Text>
          </View>
        </View>

        {/* Shipping Address Card */}
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Shipping Address</Text>
          <View style={styles.addressContainer}>
            <MaterialIcons name="location-on" size={20} color="#666" />
            <Text style={styles.addressText}>{transaction.deliveryAddress}</Text>
          </View>
        </View>

        {/* Support Button */}
        <TouchableOpacity style={styles.supportButton}>
          <MaterialIcons name="headset-mic" size={20} color="#fff" />
          <Text style={styles.supportButtonText}>Contact Support</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  backButton: {
    padding: 8,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
  },
  shareButton: {
    padding: 8,
  },
  content: {
    flex: 1,
    padding: 16,
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statusHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
  },
  orderNumber: {
    fontSize: 16,
    color: '#6C757D',
    fontWeight: '500',
  },
  dateText: {
    fontSize: 14,
    color: '#6C757D',
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
    paddingBottom: 16,
  },
  itemImage: {
    width: 80,
    height: 80,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
  },
  itemDetails: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 16,
    fontWeight: '500',
    color: '#212529',
    marginBottom: 4,
  },
  itemQuantity: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 4,
  },
  itemPrice: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
  },
  paymentRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  paymentLabel: {
    fontSize: 14,
    color: '#6C757D',
  },
  paymentMethod: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentText: {
    fontSize: 14,
    color: '#212529',
    marginLeft: 8,
  },
  totalRow: {
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212529',
  },
  addressContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  addressText: {
    flex: 1,
    fontSize: 14,
    color: '#212529',
    marginLeft: 8,
    lineHeight: 20,
  },
  supportButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#007AFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 32,
  },
  supportButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
});

export default PurchaseDetailScreen;