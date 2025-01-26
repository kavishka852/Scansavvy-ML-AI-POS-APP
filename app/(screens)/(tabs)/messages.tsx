import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  Alert,
} from 'react-native';
import { Feather } from '@expo/vector-icons';

// Define the valid Feather icon names
type FeatherIconName =
  | 'filter'
  | 'bold'
  | 'underline'
  | 'mail'
  | 'download'
  | 'lock'
  | 'user-plus'
  | 'type'
  | 'key'
  | 'map'
  | 'search'
  | 'repeat'
  | 'anchor'
  | 'link'
  | 'code'
  | 'menu'
  | 'video'
  | 'circle'
  | 'home'; // Add any other valid icons you need

type Notification = {
  id: string;
  title: string;
  timestamp: string;
  icon: FeatherIconName;
  read: boolean;
};

const MessageScreen = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    { id: '1', title: 'New Message', timestamp: '2 mins ago', icon: 'mail', read: false },
    { id: '2', title: 'App Update Available', timestamp: '1 hour ago', icon: 'download', read: false },
    { id: '3', title: 'Password Changed', timestamp: '3 hours ago', icon: 'lock', read: true },
    { id: '4', title: 'New Friend Request', timestamp: '5 hours ago', icon: 'user-plus', read: false },
  ]);

  const markAsRead = (id: string) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const handleClearAll = () => {
    Alert.alert('Clear All Notifications', 'Are you sure you want to clear all notifications?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear All', onPress: () => setNotifications([]) },
    ]);
  };

  const handleClearSingle = (id: string) => {
    Alert.alert('Clear Notification', 'Are you sure you want to clear this notification?', [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Clear', onPress: () => setNotifications((prev) => prev.filter((item) => item.id !== id)) },
    ]);
  };

  const renderItem = ({ item }: { item: Notification }) => (
    <TouchableOpacity
      style={[styles.notificationItem, item.read && styles.readNotification]}
      onPress={() => markAsRead(item.id)}
    >
      <Feather name={item.icon} size={26} color={item.read ? '#aaa' : '#1E88E5'} />
      <View style={styles.notificationContent}>
        <Text style={[styles.notificationTitle, item.read && styles.readTitle]}>
          {item.title}
        </Text>
        <Text style={[styles.notificationTimestamp, item.read && styles.readTimestamp]}>
          {item.timestamp}
        </Text>
      </View>
      <TouchableOpacity onPress={() => handleClearSingle(item.id)}>
        <Feather name="x-circle" size={22} color="#e74c3c" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      {/* <Text style={styles.header}>Notifications</Text> */}

      {/* Clear All Button */}
      <TouchableOpacity style={styles.clearButton} onPress={handleClearAll}>
        <Text style={styles.clearButtonText}>Clear All Notifications</Text>
      </TouchableOpacity>

      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.notificationList}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f4f4f4',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  header: {
    fontSize: 32,
    fontWeight: '700',
    color: '#333',
    marginBottom: 15, // Reduced margin for better button placement
    textAlign: 'center',
    letterSpacing: 1,
  },
  notificationList: {
    paddingBottom: 80, // Ensure the button is still visible when scrolling
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    paddingVertical: 15,
    paddingHorizontal: 20,
    marginBottom: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
  },
  notificationContent: {
    marginLeft: 18,
    flex: 1,
  },
  notificationTitle: {
    fontSize: 18,
    color: '#333',
    fontWeight: '600',
  },
  notificationTimestamp: {
    fontSize: 13,
    color: '#777',
    marginTop: 6,
  },
  readNotification: {
    backgroundColor: '#e0e0e0',
  },
  readTitle: {
    color: '#aaa',
    textDecorationLine: 'line-through',
  },
  readTimestamp: {
    color: '#aaa',
  },
  clearButton: {
    backgroundColor: '#F5F5F5', 
    paddingVertical: 8,  
    paddingHorizontal: 20, 
    borderRadius: 20, 
    borderWidth: 1,  
    borderColor: '#00796b', 
    marginLeft: 160,
    marginBottom: 15,  
    alignSelf: 'center',  
  },
  clearButtonText: {
    color: '#00796b', 
    fontSize: 14,  
    fontWeight: '600',
  },
});

export default MessageScreen;
