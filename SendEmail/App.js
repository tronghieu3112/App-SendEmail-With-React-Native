import React, { useState } from "react";
import { Button, TextInput, View, Text, StyleSheet, Image, Alert } from "react-native";
import email from "react-native-email";

const SendEmailScreen = () => {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [recipientError, setRecipientError] = useState(false);
  const [subjectError, setSubjectError] = useState(false);
  const [bodyError, setBodyError] = useState(false);

  const sendEmail = () => {
    if (!recipient.trim() || !subject.trim() || !body.trim()) {
      if (!recipient.trim()) setRecipientError(true);
      if (!subject.trim()) setSubjectError(true);
      if (!body.trim()) setBodyError(true);
      return;
    }

    const to = [recipient];
    email(to, {
      subject,
      body,
    }).catch(error => {
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
        <Text style={styles.label}>Người Nhận</Text>
        <TextInput
          style={[styles.input, recipientError && styles.errorInput]}
          placeholder="Nhập email người nhận..."
          onChangeText={(text) => {
            setRecipient(text);
            setRecipientError(false);
          }}
          value={recipient}
        />
        {recipientError && (
          <Text style={styles.errorMessage}>Vui lòng nhập email người nhận</Text>
        )}
        <Text style={styles.label}>Tiêu Đề</Text>
        <TextInput
          style={[styles.input, subjectError && styles.errorInput]}
          placeholder="Nhập tiêu đề..."
          onChangeText={(text) => {
            setSubject(text);
            setSubjectError(false);
          }}
          value={subject}
        />
        {subjectError && (
          <Text style={styles.errorMessage}>Vui lòng nhập tiêu đề</Text>
        )}
        <Text style={styles.label}>Nội Dung</Text>
        <TextInput
          style={[
            styles.input,
            styles.bodyInput,
            bodyError && styles.errorInput,
          ]}
          placeholder="Nhập nội dung email..."
          onChangeText={(text) => {
            setBody(text);
            setBodyError(false);
          }}
          value={body}
          multiline
        />
        {bodyError && (
          <Text style={styles.errorMessage}>Vui lòng nhập nội dung email</Text>
        )}
      </View>
      <Button title="Gửi Email" onPress={sendEmail} />
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
  errorInput: {
    borderColor: "red",
  },
  errorMessage: {
    color: "red",
    marginBottom: 5,
  },
});

export default SendEmailScreen;
