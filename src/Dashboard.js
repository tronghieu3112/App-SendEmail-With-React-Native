import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import React, {useState, useEffect} from "react";
import ButtonX from "../components/ButtonX";
import COLORS from "../constants/colors";
import { firebase } from "../config";

const Dashboard = ({navigation}) =>{
    const [name, setName] = useState('');
    let docRef = firebase.firestore().collection("users").doc(firebase.auth().currentUser.uid);

    docRef.get().then((doc) => {
        if (doc.exists) {
            // console.log("Document data:", doc.data());
            setName(doc.data().firstName)
        } else {
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });



    // useEffect( () => {
    //     firebase.firestore().collection('user')
    //     .doc(firebase.auth().currentUser.uid).get()
    //     .then( (doc) => {
    //         if (doc.exists) {
    //             setName(doc.data().firstName)
    //             // console.log()
    //         }
    //         else {
    //             console.log("User does not exist")
    //         }
    //     })
    // }, [])
    
    return(
        <SafeAreaView style={styles.container}>
            <Text style={{fontSize:30, fontWeight:'bold'}}>
                Hello,<Text style={{color:COLORS.primary}}> Mr. {name}</Text>
            </Text>
            <Text style={{fontSize:20, fontWeight:'bold'}}>What you what to do today.</Text>

            <ButtonX
                title='Mail Received'
                
                style={styles.buttonX}
            />

            <ButtonX
                title='Compose'
                onPress= { () => navigation.navigate("SendEmailScreen")}
                style={styles.buttonX}
            />

            <ButtonX
                title='Mail Deleted'
                
                onPress= { () => navigation.navigate("MailDeleted")}
                style={styles.buttonX}
            />

            <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 22}}>
                <View style={{
                    flex: 1,
                    height: 2,
                    backgroundColor: COLORS.black,
                    //marginHorizontal: 10
                    }}></View>
            </View>

            <ButtonX
                title='Sign out...'
                
                onPress= { () => {firebase.auth().signOut()}}
                style={styles.buttonX}
            />
                  
        </SafeAreaView>
    )
}

export default Dashboard


const styles = StyleSheet.create({
    container:{
        flex:1, 
        alignItems:'center',
        borderColor:COLORS.primary,
        marginTop:100,
    },
    buttonX:{
        marginTop:22,
        width:'80%'
    },
     
})