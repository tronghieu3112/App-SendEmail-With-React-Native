<<<<<<< HEAD
import React, { useState } from "react";
import { TextInput, View, Text, StyleSheet, Image, Alert, TouchableOpacity } from "react-native";
import RNSmtpMailer from "react-native-smtp-mailer";
import { Ionicons } from '@expo/vector-icons';

const SendEmailScreen = ({ navigation }) => {
  const [sender, setSender] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [senderError, setSenderError] = useState(false);
  const [subjectError, setSubjectError] = useState(false);
  const [bodyError, setBodyError] = useState(false);
  const [senderFilled, setSenderFilled] = useState(false);
  const [subjectFilled, setSubjectFilled] = useState(false);
  const [bodyFilled, setBodyFilled] = useState(false);

  const sendEmail = async () => {
    try {
      if (!senderFilled) {
        console.error('sender is empty');
        setSenderError(true);
        return;
      }
      if (!subjectFilled) {
        console.error('subject is empty');
        setSubjectError(true);
        return;
      }
      if (!bodyFilled) {
        console.error('body is empty');
        setBodyError(true);
        return;
      }

      await RNSmtpMailer.sendMail({
        mailhost: "smtp.gmail.com",
        port: 465,
        ssl: true,
        username: "tronghieutruonghp@gmail.com",
        password: "smtpmailer", 
        from: "tronghieutruonghp@gmail.com",
        sender: sender,
        subject: subject,
        htmlBody: body
      });
      Alert.alert('Success', 'Email sent successfully!');
    } catch (error) {
      console.error('SMTP Mailer Error:', error);
      Alert.alert('Error', 'Failed to send email. Please try again later.');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.replyButton}>
          <Text style={styles.replyText}>Reply Email</Text>
        </TouchableOpacity>
      </View>
      <Image
        style={styles.logo}
        source={{
          uri: "https://media.licdn.com/dms/image/D5612AQFoqQzDOOrOPg/article-cover_image-shrink_600_2000/0/1668548104191?e=2147483647&v=beta&t=q_nbDyHK9F1fRSdcaeBMas47L2xZd4T55ohhArbFakY",
        }}
      />
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Người Nhận</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="mail" size={24} color="black" style={styles.inputIcon} />
          <TextInput
            style={[
              styles.input,
              senderError && styles.errorInput
            ]}
            placeholder="Nhập email người nhận..."
            onChangeText={(text) => {
              setSender(text);
              setSenderError(false);
              setSenderFilled(!!text.trim()); 
            }}
            value={sender}
          />
        </View>
        {senderError && <Text style={styles.errorText}>Vui lòng nhập email người nhận</Text>}
        
        <Text style={styles.label}>Tiêu Đề</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="md-paper" size={24} color="black" style={styles.inputIcon} />
          <TextInput
            style={[
              styles.input,
              subjectError && styles.errorInput
            ]}
            placeholder="Nhập tiêu đề..."
            onChangeText={(text) => {
              setSubject(text);
              setSubjectError(false);
              setSubjectFilled(!!text.trim()); 
            }}
            value={subject}
          />
        </View>
        {subjectError && <Text style={styles.errorText}>Vui lòng nhập tiêu đề</Text>}
        
        <Text style={styles.label}>Nội Dung</Text>
        <View style={styles.inputWrapper}>
          <Ionicons name="document-text" size={24} color="black" style={styles.inputIcon} />
          <TextInput
            style={[
              styles.input,
              styles.bodyInput,
              bodyError && styles.errorInput
            ]}
            placeholder="Nhập nội dung email..."
            onChangeText={(text) => {
              setBody(text);
              setBodyError(false);
              setBodyFilled(!!text.trim()); 
            }}
            value={body}
            multiline
          />
        </View>
        {bodyError && <Text style={styles.errorText}>Vui lòng nhập nội dung email</Text>}
      </View>
      <TouchableOpacity style={styles.button} onPress={sendEmail}>
        <Text style={styles.buttonText}>Gửi Email</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: -30, // Move header up a bit
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  inputContainer: {
    width: "80%",
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontWeight: "bold",
  },
  inputWrapper: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  inputIcon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderWidth: 0, // Remove border
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "black", // Add border bottom
  },
  bodyInput: {
    height: 100,
    paddingTop: 10,
  },
  logo: {
    width: 150,
    height: 150,
    marginBottom: 20,
  },
  errorInput: {
    borderBottomColor: "red", 
  },
  errorText: {
    color: "red",
    marginBottom: 5,
  },
  button: {
    backgroundColor: "blue",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  backButton: {
    marginRight: 20,
  },
  replyButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  replyText: {
    marginLeft: 5,
  },
});

export default SendEmailScreen;
=======
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator} from "@react-navigation/stack";
import React, { useState, useEffect } from "react";
import { firebase } from './config';

import { Login, Signup, Welcome, Dashboard} from "./src";
//import { HeaderX } from "./components/HeaderX";

const Stack = createStackNavigator();

function App() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(()=>{
    const subscriber = firebase.auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);
  if (initializing) return null;

  if (!user) {
    return (
      <Stack.Navigator>
        <Stack.Screen
        name="Welcome" 
        component={Welcome}
        options={{
           headerShown: false
         }} 
        />
        
        <Stack.Screen
        name="Login" 
        component={Login}
        options={{
            headerShown: false
          }
        } 
        />
         <Stack.Screen
        name="Signup" 
        component={Signup}
        options={{
            headerShown: false
          }
        } 
        />        
      </Stack.Navigator>
    );
  }

  return(
    <Stack.Navigator>
      <Stack.Screen
      name="Dashboard" 
      component={Dashboard}
      options={{
        headerShown: false
      }} 
      />
    </Stack.Navigator>
  );
}

export default () => {
  return (
    <NavigationContainer>
      <App />
    </NavigationContainer>
  )
}
>>>>>>> 73d262d795dcd16ad12029524afcce3054ba4dff
