import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import {View, Button, AsyncStorage, Alert, ScrollView, StyleSheet, Platform, Image, Text, Linking} from 'react-native';
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
        <Button title="Remove Local Storage" onPress={this.removeLocal} />
        <Button title="Issue or Feature Request?" onPress={() => Linking.openURL("https://github.com/harnerdesigns/days-since/issues")}/>
        <Text style={{textAlign: "center", margin: 10}} >Made With Love By</Text>
        <Image resizeMode='contain' style={styles.image} source={{uri: 'https://harnerdesigns.com/wp-content/uploads/2018/12/harner-designs-blue-icon-black-text.png'}} />
        <View style={{flexDirection: "row", justifyContent: "space-around", margin: 5,}}>
        
            <Button title="Portfolio" onPress={() => Linking.openURL("https://harnerdesigns.com")}/>
            <Button title="Shop" onPress={() => Linking.openURL("https://harnerdesigns.com/shop")}  />       
            <Button title="Hire Us"  onPress={() => Linking.openURL("https://harnerdesigns.com/contact-us")}   />


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
    },
    image: {width: "90%", flex: 1, alignSelf: "center", flexShrink: 1, height: 100 }
    
});