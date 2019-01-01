import React from 'react';
import { ScrollView, StyleSheet, TextInput, Button, AsyncStorage } from 'react-native';

import DatePicker from 'react-native-datepicker';

import Colors from '../constants/Colors';


export default class AddItemScreen extends React.Component {
    static navigationOptions = {
        title: 'Add Date To Track',
        headerStyle: {
            backgroundColor: Colors.tintColor,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
            fontWeight: 'bold',
        },
    };

    constructor(props) {
        super(props);
        this.state = { myDate: new Date(), placeholder: "Title", text: "" }

    }


    updateState(date) {
        console.log(date);
        this.setState({ myDate: date });
        alert("The new Selected Date is : " + this.state.myDate);
    }

    render() {
        return (
            <ScrollView style={styles.container}>
                  <TextInput
        style={[styles.addItemInput, {height: 40, borderColor: 'gray', padding: 5, borderWidth: 1}]}
        onChangeText={(text) => this.setState({text})}
        placeholder={this.state.placeholder}
        text={this.state.text}
      />
            <DatePicker
        style={[styles.addItemInput, {width: "100%"}]}
        mode="date"
        date={this.state.myDate}
        placeholder="select date"
        format="YYYY-MM-DD"
        confirmBtnText="Set Date"
        cancelBtnText="Cancel" 
        onDateChange={(date) => {this.updateState(date)}}

      />
      <Button title="Submit" onPress={async () => this.addItem("Today", new Date())} color={Colors.tintColor} /> 
      </ScrollView>
        );
    }


    async addItem(name, date) {

        const item = { name: name, date: date };

        const existingItems = await AsyncStorage.getItem('items');
        console.log(existingItems);
        let newItems = JSON.parse(existingItems);
        if (!newItems) {
            newItems = [];
        }

        newItems.push(item);


        await AsyncStorage.setItem("items", JSON.stringify(newItems))
            .then(() => {
                console.log("It was saved successfully")
            })
            .catch(() => {
                console.log("There was an error saving the product")
            })


    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 15
    },
    addItemInput: {
        marginBottom: 5,
    }
});