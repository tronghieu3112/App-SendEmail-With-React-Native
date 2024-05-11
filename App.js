// import React, { useState } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from 'react-native';

// export default function App({ navigation }) { // Nhận navigation làm prop
//   const [emailData, setEmailData] = useState({
//     sender: 'Gordon Ramsay',
//     subject: 'Gordon Ramsay Criticizes Dish!!!',
//     content: 'This is the worst dish I have ever tasted!',
//     marked: false,
//     receivedAt: new Date().toLocaleString(),
//   });

//   const toggleMarkAsRead = () => {
//     setEmailData(prevState => ({
//       ...prevState,
//       marked: !prevState.marked,
//     }));
//   };

//   const deleteEmail = () => {
//     // Logic to delete email
//   };

//   const replyEmail = () => {
//     navigation.navigate('SendEmail', {
//       recipient: emailData.sender, // Truyền sender của email cũ để gửi lại
//       subject: `Re: ${emailData.subject}`, // Tiêu đề email trả lời
//     });
//   };

//   const navigateBack = () => {
//     // Logic to navigate back to main screen 
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.toolbar}>
//         <TouchableOpacity onPress={toggleMarkAsRead} style={styles.toolbarButton}>
//           <Text>{emailData.marked ? 'Readed' : 'Mark as Read'}</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={navigateBack} style={styles.toolbarButton}>
//           <Text>Back</Text>
//         </TouchableOpacity>
//         <TouchableOpacity onPress={deleteEmail} style={styles.toolbarButton}>
//           <Text>Delete</Text>
//         </TouchableOpacity>
//       </View>
//       <View style={styles.datetimeContainer}>
//         <Text style={styles.datetime}>{emailData.receivedAt}</Text>
//       </View>
//       <ScrollView style={styles.emailContainer}>
//         <Text style={styles.sender}>{emailData.sender}</Text>
//         <Text style={styles.subject}>{emailData.subject}</Text>
//         <Text style={styles.content}>{emailData.content}</Text>
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
import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Searchbar } from 'react-native-paper';

const EmailListScreen = ({ navigation }) => {
    const [emails, setEmails] = useState([]);
    const [selectedEmail, setSelectedEmail] = useState(null);
    const [selectedEmailContent, setSelectedEmailContent] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [showOptions, setShowOptions] = useState(false);
    const [showSettings, setShowSettings] = useState(false);
    const [showCompose, setShowCompose] = useState(false);

    const fetchEmails = async () => {
        try {
            const response = await fetch('http://192.168.1.81:3000/emails');
            if (!response.ok) {
                throw new Error('Failed to fetch emails');
            }
            const data = await response.json();
            const sortedEmails = data.sort((a, b) => new Date(b.received) - new Date(a.received));
            setEmails(sortedEmails);
        } catch (error) {
            console.error('Error fetching emails:', error);
            // You can handle error here, e.g., show a toast or alert
        }
    };

    const fetchEmailContent = async (emailId) => {
        try {
            const response = await fetch(`http://192.168.1.81:3000/emails/${emailId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch email content');
            }
            const data = await response.json();
            setSelectedEmailContent(data.text); // Đổi 'content' thành 'text' hoặc 'body' tùy thuộc vào API trả về
        } catch (error) {
            console.error('Error fetching email content:', error);
            // You can handle error here, e.g., show a toast or alert
        }
    };

    useEffect(() => {
        const interval = setInterval(fetchEmails, 5000);
        return () => clearInterval(interval);
    }, []);

    const handlePressItem = async (item) => {
        setSelectedEmail(item);
        await fetchEmailContent(item.id);
    };

    const handleReply = () => {
        // Logic to handle reply action
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const formattedDate = `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
        return formattedDate;
    };

    const renderEmailDetail = () => {
        if (!selectedEmail) return null;
        
        const contentLines = selectedEmailContent ? selectedEmailContent.split('\n') : [];
    
        return (
            <View style={styles.emailDetailContainer}>
                <Text style={styles.fromText}>From: {selectedEmail.from}</Text>
                <Text>Subject: {selectedEmail.subject}</Text>
                <Text>Received Time: {formatDate(selectedEmail.received)}</Text>
                {contentLines.map((line, index) => (
                    <Text key={index} style={styles.emailContentText}>{line}</Text>
                ))}
                <TouchableOpacity onPress={handleReply} style={styles.replyButton}>
                    <Feather name="edit" size={24} color="white" />
                </TouchableOpacity>
            </View>
        );
    };
    

    const renderItem = ({ item }) => {
        const receivedDate = new Date(item.received);
        const formattedReceivedTime = `${receivedDate.toLocaleDateString()} ${receivedDate.toLocaleTimeString()}`;
    
        return (
            <TouchableOpacity style={styles.emailItem} onPress={() => handlePressItem(item)}>
                <Feather name="trash-2" size={24} color="black" style={[styles.icon, styles.trashIcon]} />
                <View style={styles.emailContent}>
                    <Text style={styles.fromText}>From: {item.from}</Text>
                    <Text>Subject: {item.subject}</Text>
                    <Text>Email Content: {item.id === selectedEmail?.id ? selectedEmailContent : ''}</Text>
                    <Text>Received Time: {formattedReceivedTime}</Text>
                </View>
                <Feather name="star" size={24} color="black" style={[styles.icon, styles.starIcon]} />
            </TouchableOpacity>
        );
    };
    

    const handleSearch = (query) => {
        setSearchQuery(query);
    };

    const filteredEmails = emails.filter((email) => {
        const emailContent = email.from.toLowerCase() + ' ' + email.subject.toLowerCase();
        return emailContent.includes(searchQuery.toLowerCase());
    });

    const toggleOptions = () => {
        setShowOptions(!showOptions);
    };

    const toggleSettings = () => {
        setShowSettings(!showSettings);
    };

    const toggleCompose = () => {
        setShowCompose(!showCompose);
    };

    return (
        <View style={styles.container}>
            <View style={styles.searchContainer}>
                <Searchbar
                    placeholder="Tìm kiếm..."
                    onChangeText={handleSearch}
                    value={searchQuery}
                    style={styles.searchBar}
                />
                <TouchableOpacity onPress={toggleOptions} style={styles.iconContainer}>
                    <Feather name="menu" size={24} color="black" />
                </TouchableOpacity>
            </View>
            {showOptions && (
                <View style={styles.optionContainer}>
                    <TouchableOpacity style={styles.optionItem}>
                        <Feather name="star" size={24} color="black" />
                        <Text style={styles.optionText}>Email đã đánh dấu</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionItem}>
                        <Feather name="trash" size={24} color="black" />
                        <Text style={styles.optionText}>Email đã xóa</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionItem} onPress={toggleCompose}>
                        <Feather name="edit" size={24} color="black" />
                        <Text style={styles.optionText}>Soạn thư</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.optionItem} onPress={toggleSettings}>
                        <Feather name="settings" size={24} color="black" />
                        <Text style={styles.optionText}>Cài đặt</Text>
                    </TouchableOpacity>
                </View>
            )}
            {showSettings && (
                <View style={styles.settingsContainer}>
                    <Text style={styles.settingsTitle}>Cài đặt</Text>
                    {/* Add your settings options here */}
                </View>
            )}
            {showCompose && (
                <View style={styles.composeContainer}>
                    {/* Add your compose email form here */}
                </View>
            )}
            <FlatList
                data={filteredEmails}
                renderItem={renderItem}
                keyExtractor={(item, index) => index.toString()}
                onRefresh={fetchEmails}
                refreshing={false}
            />
            {renderEmailDetail()}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
    },
    searchContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 20,
    },
    searchBar: {
        flex: 1,
    },
    iconContainer: {
        paddingHorizontal: 10,
    },
    emailItem: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 20,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 10,
    },
    emailContent: {
        flex: 1,
        marginLeft: 10,
    },
    fromText: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    emailDetailContainer: {
        padding: 20,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 10,
        marginTop: 20,
    },
    emailContentText: {
        marginTop: 10,
    },
    replyButton: {
        backgroundColor: 'blue',
        padding: 10,
        borderRadius: 5,
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    icon: {
        marginRight: 10,
    },
    trashIcon: {
        alignSelf: 'flex-start',
        marginTop: 20,
    },
    starIcon: {
        alignSelf: 'flex-end',
        marginBottom: 20,
    },
    optionContainer: {
        position: 'absolute',
        top: 60,
        right: 20,
        backgroundColor: '#fff',
        elevation: 5,
        borderRadius: 5,
        padding: 10,
    },
    optionItem: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
    },
    optionText: {
        marginLeft: 10,
    },
    settingsContainer: {
        position: 'absolute',
        top: 120,
        right: 20,
        backgroundColor: '#fff',
        elevation: 5,
        borderRadius: 5,
        padding: 10,
    },
    settingsTitle: {
        fontWeight: 'bold',
        marginBottom: 10,
    },
    composeContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: '#fff',
        elevation: 5,
        padding: 20,
        borderTopWidth: 1,
        borderTopColor: '#ccc',
    },
});

export default EmailListScreen;
