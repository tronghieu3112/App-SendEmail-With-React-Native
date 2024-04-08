import React, { useState } from 'react';
import { Button, TextInput, View, Text, StyleSheet, Image } from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import nodemailer from 'nodemailer';

const SendEmailScreen = () => {
  const [recipient, setRecipient] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [file, setFile] = useState(null);
  const [recipientError, setRecipientError] = useState(false);
  const [subjectError, setSubjectError] = useState(false);
  const [bodyError, setBodyError] = useState(false);

  const pickFile = async () => {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });
      console.log(
        res.uri,
        res.type, 
        res.name,
        res.size
      );
      setFile(res);
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        console.log('User cancelled the picker');
      } else {
        console.log('Error picking file:', err);
      }
    }
  };

  const sendEmail = async () => {
    try {
      if (!recipient.trim() || !subject.trim() || !body.trim()) {
        if (!recipient.trim()) setRecipientError(true);
        if (!subject.trim()) setSubjectError(true);
        if (!body.trim()) setBodyError(true);
        return;
      }

      const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
          user: 'your-email@gmail.com',
          pass: 'your-password'
        }
      });

      const mailOptions = {
        from: 'your-email@gmail.com',
        to: recipient,
        subject: subject,
        text: body,
        attachments: file ? [{ path: file.uri }] : []
      };

      await transporter.sendMail(mailOptions);
      console.log('Email sent successfully');
    } catch (error) {
      console.error('Error sending email:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Image
        style={styles.logo}
        source={{ uri: 'https://media.licdn.com/dms/image/D5612AQFoqQzDOOrOPg/article-cover_image-shrink_600_2000/0/1668548104191?e=2147483647&v=beta&t=q_nbDyHK9F1fRSdcaeBMas47L2xZd4T55ohhArbFakY' }}
      />
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Người Nhận</Text>
        <TextInput
          style={[styles.input, recipientError && styles.errorInput]}
          placeholder='example@gmail.com...'
          onChangeText={(text) => {
            setRecipient(text);
            setRecipientError(false);
          }}
          value={recipient}
        />
        {recipientError && <Text style={styles.errorMessage}>Please enter recipient</Text>}
        <Text style={styles.label}>Tiêu Đề</Text>
        <TextInput
          style={[styles.input, subjectError && styles.errorInput]}
          placeholder='Enter your Subject..'
          onChangeText={(text) => {
            setSubject(text);
            setSubjectError(false);
          }}
          value={subject}
        />
        {subjectError && <Text style={styles.errorMessage}>Please enter subject</Text>}
        <Text style={styles.label}>Nội Dung</Text>
        <TextInput
          style={[styles.input, styles.bodyInput, bodyError && styles.errorInput]}
          placeholder='Write your content here...'
          onChangeText={(text) => {
            setBody(text);
            setBodyError(false);
          }}
          value={body}
          multiline
        />
        {bodyError && <Text style={styles.errorMessage}>Please enter body</Text>}
        <Button title="Chọn tệp" onPress={pickFile} />
        {file && <Text>{file.name}</Text>}
      </View>
      <Button title="Send Email" onPress={sendEmail} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    width: '80%',
    marginBottom: 20,
  },
  label: {
    marginBottom: 5,
    fontWeight: 'bold',
  },
  input: {
    width: '100%',
    height: 40,
    borderWidth: 1,
    borderColor: 'black',
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

    borderColor: 'red',
  },
  errorMessage: {
    color: 'red',
    marginBottom: 5,
  },
});

export default SendEmailScreen;
