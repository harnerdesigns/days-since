import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {View, Button, AsyncStorage, Alert, ScrollView, StyleSheet, Platform, Image, Text, Linking, TouchableOpacity} from 'react-native';
import Colors from '../constants/Colors';





export default class SettingsScreen extends React.Component {
    static navigationOptions = {
        title: 'Settings',
        headerStyle: {
            backgroundColor: Colors.tintColor,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        }, 
    };

    removeLocal() {
        Alert.alert(
            'Delete Everything?',
            'Are you sure you want to delete EVERYTHING? (No Undo)',
            [
                { text: 'Cancel', onPress: () => console.log('Canceled'), style: 'cancel' },
                { text: 'DELETE EVERYTHING', onPress: () => AsyncStorage.removeItem('items')
                .then(console.log("Everything Deleted")) }
            ]
        )
        

    }

    render() {
        /* Go ahead and delete ExpoConfigView and replace it with your
         * content, we just wanted to give you a quick view of your config */
        return (
        
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>


        <TouchableOpacity style={[styles.buttons, {alignSelf: "center", flex: 0}]} onPress={this.removeLocal}>
            <Text style={styles.buttonText}>Delete All Dates?</Text>
        </TouchableOpacity>

        <Text style={styles.instructions}>Everything is stored local on your device. Tapping This Undoes that.</Text>

        <TouchableOpacity style={[styles.buttons, styles.buttonAlt, {alignSelf: "center", flex: 0}]} title="Issue or Feature Request?" onPress={() => Linking.openURL("https://github.com/harnerdesigns/days-since/issues")}>
            
        <Text style={styles.buttonText}>Issue or Feature Request?</Text>
        </TouchableOpacity>
        <Text style={styles.instructions}>Let Us Know, or help us build it! It's Open Source</Text>
        
 
        <View style={styles.harnerDesigns}>
        <Text style={{textAlign: "center", margin: 10, color: "#fff", fontSize: 16}} >Made With Love By:</Text> 
        <Image resizeMode='contain' style={styles.image} source={{uri: 'https://harnerdesigns.com/wp-content/uploads/2019/02/harner-designs-white-icon-text.png'}} />
        <View style={{flexDirection: "row", justifyContent: "space-around", margin: 5,}}>
        
            <TouchableOpacity style={[styles.buttons, styles.buttonAlt]} onPress={() => Linking.openURL("https://harnerdesigns.com")}><Text style={styles.buttonText}>Portfolio</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.buttons, styles.buttonAlt]}  onPress={() => Linking.openURL("https://harnerdesigns.com/shop")}><Text style={styles.buttonText}>Shop</Text></TouchableOpacity>
            <TouchableOpacity style={[styles.buttons, styles.buttonAlt]} title="Hire Us"  onPress={() => Linking.openURL("https://harnerdesigns.com/contact-us")}   ><Text style={styles.buttonText}>Hire Us</Text></TouchableOpacity>


        </View>
        </View>
        </ScrollView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    contentContainer: {
        paddingTop: 0,
        minHeight: "100%",
    },
    image: {width: "90%", flex: 1, alignSelf: "center", flexShrink: 1, height: 100 },
    buttons: {

        margin: 7.5, 
        flex: 1,
        padding: 15,
        width: "90%",
        textAlign: "center",
        backgroundColor: Colors.warningBackground,
        flex: 1,
        borderRadius: 10,
        
    },
    buttonAlt: { 
        backgroundColor: "#333"
    },
    buttonText:{
            textAlign:"center",
            color: Colors.warningText
            },
            harnerDesigns: {
                marginTop: "auto",
                backgroundColor: "#3e50b2"
            },
            instructions: {
                textAlign: "center",
                color: "#aaa",
                margin: 0,
                marginBottom: 10,
                fontSize: 10,
            }
    
});