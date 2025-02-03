import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  TextInput,
  RefreshControl,
  Dimensions,
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { MaterialIcons, FontAwesome5 } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const { width } = Dimensions.get('window');

// Types
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

interface TransactionGrouping {
  title: string;
  data: Transaction[];
}

const PurchaseHistoryScreen = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [transactions, setTransactions] = useState<Transaction[]>([
    {
      id: '1',
      date: new Date('2024-01-30'),
      merchantName: 'ASUS ROG STRIX',
      amount: 659999.99,
      category: 'Laptop',
      status: 'completed',
      paymentMethod: 'Visa •••• 4242',
      orderNumber: 'ORD001',
      deliveryAddress: '123 Tech Street, Bangalore, Karnataka 560001',
      items: [
        {
          id: 'item1',
          name: 'ASUS ROG STRIX G15',
          price: 659999.99,
          quantity: 1,
          image: '/api/placeholder/80/80',
        }
      ]
    },
    {
      id: '2',
      date: new Date('2024-01-29'),
      merchantName: 'MSI Mouse',
      amount: 1999.99,
      category: 'Entertainment',
      status: 'completed',
      paymentMethod: 'Visa •••• 4242',
      orderNumber: 'ORD002',
      deliveryAddress: '123 Tech Street, Bangalore, Karnataka 560001',
      items: [
        {
          id: 'item2',
          name: 'MSI Gaming Mouse',
          price: 1999.99,
          quantity: 1,
          image: '/api/placeholder/80/80',
        }
      ]
    },
    {
      id: '3',
      date: new Date('2024-01-29'),
      merchantName: 'Viewsonic OMNI',
      amount: 55559.99,
      category: 'Monitor',
      status: 'completed',
      paymentMethod: 'Visa •••• 4242',
      orderNumber: 'ORD003',
      deliveryAddress: '123 Tech Street, Bangalore, Karnataka 560001',
      items: [
        {
          id: 'item3',
          name: 'Viewsonic OMNI Gaming Monitor',
          price: 55559.99,
          quantity: 1,
          image: '/api/placeholder/80/80',
        }
      ]
    },
  ]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      // You would typically fetch new data here
    } catch (error) {
      console.error('Error refreshing data:', error);
    } finally {
      setRefreshing(false);
    }
  }, []);

  const getStatusColor = (status: Transaction['status']) => {
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

  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'laptop':
        return 'laptop';
      case 'monitor':
        return 'desktop';
      case 'entertainment':
        return 'gamepad';
      default:
        return 'shopping-bag';
    }
  };

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const formatTime = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { 
      hour: 'numeric', 
      minute: 'numeric', 
      hour12: true 
    };
    return date.toLocaleTimeString('en-US', options);
  };

  const groupTransactionsByDate = (transactions: Transaction[]): TransactionGrouping[] => {
    const groups: { [key: string]: Transaction[] } = {};
    
    transactions.forEach(transaction => {
      const date = formatDate(transaction.date);
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(transaction);
    });

    return Object.entries(groups).map(([title, data]) => ({
      title,
      data,
    }));
  };

  const filteredTransactions = transactions.filter(transaction =>
    transaction.merchantName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    transaction.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const renderTransaction = ({ item }: { item: Transaction }) => (
    <TouchableOpacity
      style={styles.transactionCard}
      onPress={() => {
        router.push({
          pathname: "/purchaseDetails",
          params: { transaction: JSON.stringify(item) }
        });
      }}
    >
      <View style={styles.iconContainer}>
        <FontAwesome5 
          name={getCategoryIcon(item.category)} 
          size={24} 
          color="#007AFF"
        />
      </View>
      <View style={styles.transactionContent}>
        <View style={styles.transactionHeader}>
          <View style={styles.merchantInfo}>
            <Text style={styles.merchantName}>{item.merchantName}</Text>
            <View style={styles.categoryContainer}>
              <Text style={styles.category}>{item.category}</Text>
            </View>
          </View>
          <View style={styles.amountContainer}>
            <Text style={styles.amount}>
              ₹{item.amount.toLocaleString('en-IN', {
                maximumFractionDigits: 2,
                minimumFractionDigits: 2,
              })}
            </Text>
            <View style={[
              styles.statusBadge,
              { backgroundColor: getStatusColor(item.status) + '20' }
            ]}>
              <Text style={[
                styles.status,
                { color: getStatusColor(item.status) }
              ]}>
                {item.status}
              </Text>
            </View>
          </View>
        </View>
        <View style={styles.transactionFooter}>
          <View style={styles.paymentMethodContainer}>
            <FontAwesome5 name="credit-card" size={12} color="#666" />
            <Text style={styles.paymentMethod}>{item.paymentMethod}</Text>
          </View>
          <View style={styles.timeContainer}>
            <MaterialIcons name="access-time" size={12} color="#666" />
            <Text style={styles.time}>{formatTime(item.date)}</Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Purchase History</Text>
        <TouchableOpacity style={styles.filterButton}>
          <MaterialIcons name="filter-list" size={24} color="#007AFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.searchContainer}>
        <MaterialIcons name="search" size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search transactions..."
          placeholderTextColor="#999"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      <FlatList
        data={groupTransactionsByDate(filteredTransactions)}
        keyExtractor={item => item.title}
        renderItem={({ item }) => (
          <View style={styles.dateGroup}>
            <Text style={styles.dateHeader}>{item.title}</Text>
            {item.data.map(transaction => (
              <View key={transaction.id}>
                {renderTransaction({ item: transaction })}
              </View>
            ))}
          </View>
        )}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor="#007AFF"
          />
        }
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    paddingTop: 30,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#212529',
  },
  filterButton: {
    padding: 8,
    borderRadius: 8,
    backgroundColor: '#F8F9FA',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    margin: 16,
    padding: 12,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#212529',
  },
  listContainer: {
    padding: 16,
  },
  dateGroup: {
    marginBottom: 24,
  },
  dateHeader: {
    fontSize: 18,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 12,
  },
  transactionCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  transactionContent: {
    flex: 1,
  },
  transactionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  merchantInfo: {
    flex: 1,
    marginRight: 16,
  },
  merchantName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#212529',
    marginBottom: 4,
  },
  categoryContainer: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 6,
    alignSelf: 'flex-start',
  },
  category: {
    fontSize: 12,
    color: '#6C757D',
    fontWeight: '500',
  },
  amountContainer: {
    alignItems: 'flex-end',
  },
  amount: {
    fontSize: 16,
    fontWeight: '700',
    color: '#212529',
    marginBottom: 4,
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  status: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  transactionFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#E9ECEF',
  },
  paymentMethodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  paymentMethod: {
    fontSize: 12,
    color: '#6C757D',
    marginLeft: 4,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  time: {
    fontSize: 12,
    color: '#6C757D',
    marginLeft: 4,
  },
});

export default PurchaseHistoryScreen;
