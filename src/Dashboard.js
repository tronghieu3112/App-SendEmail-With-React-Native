import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, TextInput } from "react-native";
import React, {useState, useEffect} from "react";
import ButtonX from "../components/ButtonX";
import { firebase } from "../config";

const Dashboard = () =>{
    const [name, setName] = useState('');

    useEffect( () => {
        firebase.firestore().collection('user')
        .doc(firebase.auth().currentUser.uid).get()
        .then( (snapsot) => {
            if (snapsot.exists) {
                setName(snapsot.data().firstName)
            }
            else {
                console.log("User does not exist")
            }
        })
    }, [])
    
    return(
        <SafeAreaView style={styles.container}>
            <Text style={{fontSize:30, fontWeight:'bold'}}>
                Hello, {name}
            </Text>
           
            <ButtonX
                title='Sign out...'
                
                onPress= { () => {firebase.auth().signOut()}}
                style={{
                    marginTop:22,
                    width:"100%"
                }}
            />   
        </SafeAreaView>
    )
}

export default Dashboard


const styles = StyleSheet.create({
    container:{
        flex:1, 
        alignItems:'center',
        borderColor:'green',
        marginTop:100,
    },
     
})