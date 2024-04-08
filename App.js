// import { StatusBar } from 'expo-status-bar';
// import React from 'react';
// import { StyleSheet, Text, View } from 'react-native';

// export default function App() {
//   return (
//     <View style={styles.container}>
//       <Text>minh đẹp zai</Text>
//       <StatusBar style="auto" />
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });


import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

export default function App() {
  const [email, setEmail] = useState({
    sender: 'Gordon Ramsay',
    subject: 'It is raw!!!',
    content: 'This is the worst dish I have ever tasted!',
    marked: false,
  });

  const markAsRead = () => {
    setEmail(prevState => ({
      ...prevState,
      marked: true,
    }));
  };

  const deleteEmail = () => {
    // Logic to delete email
  };

  const replyEmail = () => {
    // Logic to reply to email
  };

  const navigateBack = () => {
    // Logic to navigate back to main screen
  };

  return (
    <View style={styles.container}>
      <View style={styles.toolbar}>
        <TouchableOpacity onPress={markAsRead} style={styles.toolbarButton}>
          <Text>{email.marked ? 'Readed' : 'Mark as Read'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateBack} style={styles.toolbarButton}>
          <Text>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteEmail} style={styles.toolbarButton}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
      <ScrollView style={styles.emailContainer}>
        <Text style={styles.sender}>{email.sender}</Text>
        <Text style={styles.subject}>{email.subject}</Text>
        <Text style={styles.content}>{email.content}</Text>
      </ScrollView>
      <TouchableOpacity onPress={replyEmail} style={styles.replyButton}>
        <Text>Reply</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 10,
  },
  toolbar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
    marginTop: 20,
  },
  toolbarButton: {
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#DDDDDD',
  },
  emailContainer: {
    flex: 1,
  },
  sender: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subject: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  content: {
    fontSize: 16,
  },
  replyButton: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 15,
    borderRadius: 5,
    backgroundColor: '#DDDDDD',
  },
});
