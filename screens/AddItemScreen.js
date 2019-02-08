import React from 'react';
import { View, ScrollView, StyleSheet, TextInput, Button, AsyncStorage, Text, ToastAndroid, } from 'react-native';

import DatePicker from 'react-native-datepicker';

import Colors from '../constants/Colors';
import { Item } from '../components/Item';


const initialState = {
    /* etc */
    myDate: new Date(),
    placeholder: "Title",
    itemTitle: ""
};



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
        this.state = { myDate: new Date(), placeholder: "Title", itemTitle: "" }
        this.state = initialState;

    }

    handleInputChange = (event = {}) => {
        const name = event.target && event.target.name;
        const value = event.target && event.target.value;

        this.setState({
            [name]: value
        });
    }

    render() {


        const title = this.state.itemTitle;
        const date = this.state.myDate
        return (
            <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
                  
            <View style={styles.form}>
                  <TextInput
        style={[styles.addItemInput, {height: 40, borderColor: 'gray', padding: 5, borderWidth: 1}]}
        name="itemTitle"
    onChangeText={(value) => this.setState({itemTitle: value})}
    value={this.state.itemTitle}
    placeholder="Title"

      />
            <DatePicker
        style={[styles.addItemInput, {width: "100%"}]}
        mode="date"
        date={this.state.myDate}
        placeholder="select date"
        format="YYYY-MM-DD"
        confirmBtnText="Set Date"
        cancelBtnText="Cancel" 
        name="mydate"
    onDateChange={(value) => this.setState({myDate: value})}
    

      />
      

      <Button title="Track" onPress={async () => this.addItem(title, date)} color={Colors.tintColor} /> 
      </View>
      <View style={styles.itemPreview} >
      <Text style={styles.previewText}>Preview</Text>
      <Item name={this.state.itemTitle} date={this.state.myDate} onLongPress={false} onPress={false} /> 
      </View>
      </ScrollView>
        );
    }


    async addItem(name, date) {

        let r = Math.random().toString(36).substring(7);

        const item = { id: r, name: name, date: date };

        const existingItems = await AsyncStorage.getItem('items');
        console.log(existingItems);
        let newItems = JSON.parse(existingItems);
        if (!newItems) {
            newItems = [];
            console.log("No Items In Storage");
        }

        newItems.push(item);


        await AsyncStorage.setItem("items", JSON.stringify(newItems))
            .then(() => {

                this.setState(initialState);
                console.log("It was saved successfully")
                this.props.navigation.navigate('Home');
                ToastAndroid.show(
                    'Item Added Successfully',
                    ToastAndroid.SHORT
                );

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
        padding: 15,
    },
    contentContainer: {
        flex: 1,
        justifyContent: "space-between",

    },
    addItemInput: {
        marginBottom: 5,
    },

    itemPreview: {

    },
    previewText: {
        textAlign: "center",
        color: "#aaa",
        margin: 0,
        fontSize: 10,
    },
    form: {

    }
});