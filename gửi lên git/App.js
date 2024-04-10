import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import email from "react-native-email";

export default function App() {
  const [email, setEmail] = useState({
    sender: 'Gordon Ramsay',
    subject: 'Gordon Ramsay Criticizes Dish!!!',
    content: 'This is the worst dish I have ever tasted!',
    marked: false,
    receivedAt: new Date().toLocaleString(),
  });

  const toggleMarkAsRead = () => {
    setEmail(prevState => ({
      ...prevState,
      marked: !prevState.marked,
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
        <TouchableOpacity onPress={toggleMarkAsRead} style={styles.toolbarButton}>
          <Text>{email.marked ? 'Readed' : 'Mark as Read'}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={navigateBack} style={styles.toolbarButton}>
          <Text>Back</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={deleteEmail} style={styles.toolbarButton}>
          <Text>Delete</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.datetimeContainer}>
        <Text style={styles.datetime}>{email.receivedAt}</Text>
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
  datetimeContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  datetime: {
    fontSize: 16,
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


// import React, { useState, useEffect } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
// import { MailCore } from 'react-native-mailcore';

// export default function App() {
//   const [emailData, setEmailData] = useState({
//     sender: '',
//     subject: '',
//     content: '',
//     receivedAt: '',
//   });

//   const fetchEmail = async () => {
//     try {
//       const email = await MailCore.fetchLatestEmail({
//         username: 'test@gmail.com', // Email cần lấy tin nhắn mới nhất
//         password: 'YourPassword', // Mật khẩu của email
//         hostname: 'imap.gmail.com', // Địa chỉ IMAP server
//         port: 993, // Cổng của IMAP server
//         tls: true, // Sử dụng TLS để kết nối
//       });

//       setEmailData({
//         sender: email.from,
//         subject: email.subject,
//         content: email.htmlBody, // HTML body của email
//         receivedAt: email.receivedDate,
//       });
//     } catch (error) {
//       Alert.alert('Error', 'Failed to fetch email. Please check your email configuration.');
//     }
//   };

//   useEffect(() => {
//     fetchEmail();
//   }, []);

//   const toggleMarkAsRead = () => {
//     setEmail(prevState => ({
//       ...prevState,
//       marked: !prevState.marked,
//     }));
//   };

//   const deleteEmail = () => {
//     // Logic to delete email
//   };

//   const replyEmail = () => {
//     // Logic to reply to email
//   };

//   const navigateBack = () => {
//     // Logic to navigate back to main screen
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.toolbar}>
//         <TouchableOpacity onPress={toggleMarkAsRead} style={styles.toolbarButton}>
//           <Text>{email.marked ? 'Readed' : 'Mark as Read'}</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={navigateBack} style={styles.toolbarButton}>
//           <Text>Back</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={deleteEmail} style={styles.toolbarButton}>
//           <Text>Delete</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.datetimeContainer}>
//         <Text style={styles.datetime}>{email.receivedAt}</Text>
//       </View>
//       <ScrollView style={styles.emailContainer}>
//         <Text style={styles.sender}>{email.sender}</Text>
//         <Text style={styles.subject}>{email.subject}</Text>
//         <Text style={styles.content}>{email.content}</Text>
//       </ScrollView>
//       <TouchableOpacity onPress={replyEmail} style={styles.replyButton}>
//         <Text>Reply</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#fff',
//     padding: 10,
//   },
//   toolbar: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     marginBottom: 10,
//     marginTop: 20,
//   },
//   toolbarButton: {
//     padding: 10,
//     borderRadius: 5,
//     backgroundColor: '#DDDDDD',
//   },
//   datetimeContainer: {
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   datetime: {
//     fontSize: 16,
//   },
//   emailContainer: {
//     flex: 1,
//   },
//   sender: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginBottom: 5,
//   },
//   subject: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 10,
//   },
//   content: {
//     fontSize: 16,
//   },
//   replyButton: {
//     alignItems: 'center',
//     justifyContent: 'center',
//     padding: 15,
//     borderRadius: 5,
//     backgroundColor: '#DDDDDD',
//   },
// });
