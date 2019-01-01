import React from 'react';
import { Text, StyleSheet, View } from 'react-native';

import Colors from '../constants/Colors';


export class NoItems extends React.Component {


    render() {
        return (
            <View>
                <Text style={styles.heading}>No Items</Text>
                <Text style={styles.subheading}>Hit "Add Item" To Add One </Text>
                </View>
        );
    }


}

const styles = StyleSheet.create({
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        color: "#aaa",
    },
    subheading: {
        fontSize: 18,
        textAlign: "center",
        color: "#aaa",

    }
});