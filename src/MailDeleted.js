import { View, Text, SafeAreaView, StyleSheet , Pressable, ScrollView} from "react-native";
import React from "react";
import ButtonX from "../components/ButtonX";
import COLORS from "../constants/colors";


const MailDeleted = ({navigation}) => {

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.navigateBar}>
                <Text style={{color:COLORS.primary,fontSize:22, fontWeight:'bold'}} > Mail Deleted </Text>
                <ButtonX
                    title="Dashboard"
                    onPress= { () => navigation.navigate("Dashboard")}
                    style={styles.buttonX}
                />
            </View>
            <ScrollView>
                <View style={{ marginTop: 22, alignItems:'center'}}>
                    { listMail()}
                </View>
            </ScrollView>
        </SafeAreaView>
    )

}

export default MailDeleted

function listMail() {
    let views = [];
    for (let index = 1; index <= 10; index++) {
        views.push(
            <View style={styles.mailBox}>
                <Text style={styles.textH1}>This is a title {index}</Text>
                <Text>This is mail {index} blabla blabla....</Text>
                <Pressable onPress={ () => console.log('press',index)}>
                    <Text style={styles.textDetail}>See Detail</Text>
                </Pressable>
            </View>
        );
    }

    return <>{views}</>;

}
 
const styles = StyleSheet.create({
    container:{
        flex:1, 
        borderColor:COLORS.primary,
        marginTop:22,
    },
    buttonX:{
        marginVertical:4,
        width:'38%'
    },
    navigateBar:{
        flexDirection:'row',
        width: "100%",
        height: 68,
        borderColor: COLORS.black,
        borderBottomWidth: 2,
        borderRadius: 8,
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        paddingHorizontal: 8,    
    },
    mailBox:{
        paddingBottom: 5,
        paddingVertical: 10,
        paddingLeft: 10,
        borderColor: COLORS.grey,
        borderWidth: 4,
        borderRadius: 12,
        marginVertical: 5,
        justifyContent: 'center',
        width: '96%',
    },
    textH1: {
        color: COLORS.primary, 
        fontSize: 18,
        fontWeight:'bold'
    },
    textDetail:{
        color: COLORS.primary, 
        fontSize: 16,
        fontWeight:'bold',
        alignSelf: 'flex-end', 
        paddingRight:10
    } 
})