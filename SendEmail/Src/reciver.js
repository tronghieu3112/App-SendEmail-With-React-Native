import React, { useState } from "react";
import { Button, TextInput, View, Text, StyleSheet, Image, Alert } from "react-native";
import axios from "axios"; // Import thư viện Axios

const SendEmailScreen = () => {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  const sendEmail = () => {
    // Tạo một object chứa dữ liệu email
    const emailData = {
      recipient,
      subject,
      body
    };

    // Gửi yêu cầu POST đến endpoint của server backend
    axios.post('YOUR_BACKEND_ENDPOINT', emailData)
      .then(response => {
        console.log("Email sent successfully:", response.data);
        Alert.alert("Success", "Email sent successfully!");
      })
      .catch(error => {
        console.error("Error sending email:", error);
        Alert.alert("Error", "Failed to send email. Please try again later.");
      });
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{
          uri: "https://media.licdn.com/dms/image/D5612AQFoqQzDOOrOPg/article-cover_image-shrink_600_2000/0/1668548104191?e=2147483647&v=beta&t=q_nbDyHK9F1fRSdcaeBMas47L2xZd4T55ohhArbFakY",
        }}
      />
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Recipient</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter recipient's email..."
          onChangeText={(text) => setRecipient(text)}
          value={recipient}
        />
        <Text style={styles.label}>Subject</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter subject..."
          onChangeText={(text) => setSubject(text)}
          value={subject}
        />
        <Text style={styles.label}>Body</Text>
        <TextInput
          style={[styles.input, styles.bodyInput]}
          placeholder="Enter email body..."
          onChangeText={(text) => setBody(text)}
          value={body}
          multiline
        />
      </View>
      <Button title="Send Email" onPress={sendEmail} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  inputContainer: {
    width: "80%",
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
    paddingHorizontal: 10,
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
});

export default SendEmailScreen;
