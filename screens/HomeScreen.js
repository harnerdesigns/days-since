'use-strict';

import React from 'react';
import {
    Image,
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    AsyncStorage,
    Button,Vibration, Alert
} from 'react-native';
import { WebBrowser, Icon } from 'expo';



import Colors from '../constants/Colors';

import { MonoText } from '../components/StyledText';
import { Item } from '../components/Item';
import { NoItems } from '../components/noItems';

export default class HomeScreen extends React.Component {
    static navigationOptions = {
        title: 'Days Since',
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
        this.state = { items: [] };
        this.deleteItem = this.deleteItem.bind(this);
        this.onLongPressItem = this.onLongPressItem.bind(this);
    }



    render() {




        return (


            <View style={styles.container}>
        <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <Text style={styles.instructions}>Long Press To Delete</Text>
            {this.formatList()}
              </ScrollView>
      </View>
        );

    };





    async retrieveItem(key) {
        try {
            const retrievedItem = await AsyncStorage.getItem(key);
            const item = JSON.parse(retrievedItem);
            return item;
        } catch (error) {
            console.log(error.message);
        }
        return
    } 




    deleteItem = async (id) => {


        const getIndex = (value, arr, prop) => {
            for(var i = 0; i < arr.length; i++) {
                if(arr[i][prop] === value) {
                    return i;
                }
            }
            return -1; //to handle the case where the value doesn't exist
        }
        
        const existingItems = await AsyncStorage.getItem('items');
        console.log(existingItems); 

        let newItems = JSON.parse(existingItems);
        var index = getIndex(id, newItems, 'id');  
        console.log("index: " + index);

        if (!newItems) {
            newItems = [];
            console.log("No Items In Storage");
        }
        console.log(newItems);
        newItems.splice(index, 1);
        console.log(newItems);


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



    onLongPressItem = (id) => {
        Vibration.vibrate(15);
        Alert.alert(
            'Delete Item?',
            'Are you sure you want to delete this? (No Undo)',
            [
                { text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel' },
                { text: 'Delete Date', onPress: () => this.deleteItem(id) }
            ]
        )
    }
    

    formatList() {

        this.retrieveItem("items").then((items) => {
            //this callback is executed when your Promise is resolved
            this.setState({ items: items });


        }).catch((error) => {
            //this callback is executed when your Promise is rejected
            console.log('Cant Retrieve Item - error: ' + error);
        });

        if (this.state.items) {

            return this.state.items.map((data, index) => {
                return ( 
                    <Item key={index} itemId={data.id} name={data.name} date={data.date} onLongPress={this.onLongPressItem} />
                )
            })
        } else {
            return (
                <NoItems />
            )
        }


    }




}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    developmentModeText: {
        marginBottom: 20,
        color: 'rgba(0,0,0,0.4)',
        fontSize: 14,
        lineHeight: 19,
        textAlign: 'center',
    },
    contentContainer: {
        paddingTop: 7,
    },
    welcomeContainer: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
    },

    welcomeImage: {
        width: '100%',
        height: 80,
        resizeMode: 'contain',
        marginTop: 3,
        marginLeft: -10,
    },
    getStartedContainer: {
        alignItems: 'center',
        marginHorizontal: 50,
    },
    homeScreenFilename: {
        marginVertical: 7,
    },
    codeHighlightText: {
        color: 'rgba(96,100,109, 0.8)',
    },
    codeHighlightContainer: {
        backgroundColor: 'rgba(0,0,0,0.05)',
        borderRadius: 3,
        paddingHorizontal: 4,
    },
    getStartedText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        lineHeight: 24,
        textAlign: 'center',
    },
    tabBarInfoContainer: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        ...Platform.select({
            ios: {
                shadowColor: 'black',
                shadowOffset: { height: -3 },
                shadowOpacity: 0.1,
                shadowRadius: 3,
            },
            android: {
                elevation: 20,
            },
        }),
        alignItems: 'center',
        backgroundColor: '#444',
        paddingVertical: 20,
    },
    tabBarInfoText: {
        fontSize: 17,
        color: 'rgba(96,100,109, 1)',
        textAlign: 'center',
    },
    navigationFilename: {
        marginTop: 5,
    },

    instructions: {
        textAlign: "center",
        color: "#aaa",
        margin: 0,
        fontSize: 10,
    }
});