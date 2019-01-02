import React from 'react';
import { ExpoConfigView } from '@expo/samples';
import { Button, AsyncStorage } from 'react-native';
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

        AsyncStorage.removeItem('items')
            .then((items) => { console.log(items) });

    }

    render() {
        /* Go ahead and delete ExpoConfigView and replace it with your
         * content, we just wanted to give you a quick view of your config */
        return <Button title="Remove Local Storage" onPress={this.removeLocal} />;
    }
}