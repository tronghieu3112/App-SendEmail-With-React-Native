import React, { useState } from "react";
import { Button, TextInput, View, Text, StyleSheet, Image, Alert } from "react-native";

const SendEmailScreen = () => {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [recipientError, setRecipientError] = useState(false);
  const [subjectError, setSubjectError] = useState(false);
  const [bodyError, setBodyError] = useState(false);

  const sendEmail = async () => {
    try {
      const accessToken = "YOUR_ACCESS_TOKEN"; // Thay YOUR_ACCESS_TOKEN bằng token truy cập bạn nhận từ quy trình xác thực.
  
      const emailData = {
        to: recipient,
        subject: subject,
        message: body,
      };

      const response = await fetch("https://www.googleapis.com/gmail/v1/users/me/messages/send", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          raw: btoa(
            `From: Your Name <your.email@gmail.com>\nTo: ${emailData.to}\nSubject: ${emailData.subject}\n\n${emailData.message}`
          ),
        }),
      });

      if (response.ok) {
        console.log("Email sent successfully!");
      } else {
        console.error("Failed to send email:", response.statusText);
      }
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };
  
  const validateInputs = () => {
    let isValid = true;
    if (!recipient.trim()) {
      setRecipientError(true);
      isValid = false;
    }
    if (!subject.trim()) {
      setSubjectError(true);
      isValid = false;
    }
    if (!body.trim()) {
      setBodyError(true);
      isValid = false;
    }
    return isValid;
  };

  const handleSendEmail = () => {
    if (validateInputs()) {
      sendEmail();
    } else {
      Alert.alert("Error", "Please fill in all fields.");
    }
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
          placeholder="example@gmail.com..."
          onChangeText={(text) => {
            setRecipient(text);
            setRecipientError(false);
          }}
          value={recipient}
        />
        {recipientError && (
          <Text style={styles.errorMessage}>Please enter recipient</Text>
        )}
        <Text style={styles.label}>Tiêu Đề</Text>
        <TextInput
          style={[styles.input, subjectError && styles.errorInput]}
          placeholder="Enter your Subject.."
          onChangeText={(text) => {
            setSubject(text);
            setSubjectError(false);
          }}
          value={subject}
        />
        {subjectError && (
          <Text style={styles.errorMessage}>Please enter subject</Text>
        )}
        <Text style={styles.label}>Nội Dung</Text>
        <TextInput
          style={[
            styles.input,
            styles.bodyInput,
            bodyError && styles.errorInput,
          ]}
          placeholder="Write your content here..."
          onChangeText={(text) => {
            setBody(text);
            setBodyError(false);
          }}
          value={body}
          multiline
        />
        {bodyError && (
          <Text style={styles.errorMessage}>Please enter body</Text>
        )}
      </View>
      <Button title="Send Email" onPress={handleSendEmail} />
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
