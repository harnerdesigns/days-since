import React from 'react';
import { Text, StyleSheet, View, TouchableHighlight, Vibration, Alert } from 'react-native';

import Colors from '../constants/Colors';
import moment from 'moment'



export class Item extends React.Component {

    deleteItem() {

        console.error("What");

    }


    _onLongPressItem() {
        Vibration.vibrate(15);
        Alert.alert(
            'Delete Item?',
            'Are you sure you want to delete this? (No Undo)',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'Delete Date', onPress: () => this.deleteItem, }
            ]
        )
    }



    _onShortPressItem() {

        Vibration.vibrate(10);

        console.log("Short press");
    }


    render() {
        return (
            <TouchableHighlight onLongPress={() => this.props.onLongPress(this.props.itemId)}  onPress={this._onShortPressItem}  underlayColor="#ccc">
            <View style={styles.item} >
            <View style={styles.titles}>
        		<Text style={styles.itemTitle} >{this.props.name}</Text>
        		<Text style={styles.itemSubTitle} >{this.props.itemId}</Text>
        		<Text style={styles.itemSubTitle} >{this.formatDate(this.props.date)}</Text>

        		</View>
        		<View style={styles.counts}>
        		<Text>{this.daysSince(this.props.date)} Days</Text>
        		<Text>{this.yearsSince(this.props.date)} Years</Text>
        		</View>
        	</View>
        	</TouchableHighlight>
        );
    }

    daysSince(date) {
        return moment().diff(date, 'days');
    }
    yearsSince(date) {
        const years = moment().diff(date, 'years', true);
        if (years > 0.01) {

            return years.toFixed(2);
        } else {
            return years.toFixed(0);
        }
    }

    formatDate(date) {
        date = moment(date).format("MM/DD/YYYY");
        return date;
    }
}

const styles = StyleSheet.create({
    item: {
        marginTop: 7,
        marginBottom: 7,
        marginLeft: 15,

        marginRight: 15,

        padding: 7,
        backgroundColor: "#fff",
        elevation: 2,
        borderLeftWidth: 5,
        borderLeftColor: Colors.tintColor,
        flexDirection: 'row',
        alignItems: "center",
        justifyContent: "space-between",
    },
    titles: {
        flex: 3
    },
    itemTitle: {
        fontSize: 24,
        fontWeight: "bold",
        color: Colors.tintColor,
    },
    itemSubTitle: {
        fontSize: 18,
    },
    counts: {
        width: "auto",
        flex: 1,
    }
});