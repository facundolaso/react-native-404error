import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, KeyboardAvoidingView, TouchableWithoutFeedback ,Keyboard} from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAddItineraryMutation } from '../features/itinerariesSlice'
import { useNavigation } from '@react-navigation/native';


export default function NewItinerary({ route }) {

    const [loggedUser, setUser] = useState()
    const [token, setToken] = useState()

    const getUser = async () => {
        try {
            const savedUser = await AsyncStorage.getItem("loggedUser");
            let currentUser = JSON.parse(savedUser)
            const savedToken = await AsyncStorage.getItem("token");
            let currentToken = JSON.parse(savedToken)
            setUser(currentUser)
            setToken(currentToken)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        onChangeName('')
        onChangePrice('')
        onChangeTags('')
        onChangeDuration('')
        getUser()
    }, [])

    const [name, onChangeName] = React.useState('');
    const [price, onChangePrice] = React.useState('');
    const [tags, onChangeTags] = React.useState('');
    const [duration, onChangeDuration] = React.useState('');

    let [addItinerary] = useAddItineraryMutation()

    const handleItinerary = async (form) => {
        let tagsEdit = tags.replace(/,/g, "").replace(/;/g, "")
        tagsEdit = tagsEdit.trim().split(/\s* \s*/)

        const newItinerary = {
            name: name,
            user: loggedUser.user.id,
            city: route.params.cityId,
            price: price,
            likes: [],
            tags: tagsEdit,
            duration: duration,
        };
        await addItinerary(newItinerary);
    }

    return (
        <View style={styles.newCityContainer}>
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
<View style={styles.formContainer}>
                <View style={styles.inputWrapper}>
                    <View>
                    <Text style={{ fontSize: 25, color: "#fff", fontWeight: 'bold',}}>Add new itinerary</Text>
                    </View>

                    <View style={styles.inputForm}>
                        <Text style={styles.txtForm}>Itinerary Name</Text>
                        <TextInput multiline={true} numberOfLines={2} onChangeText={(text) => onChangeName(text)} value={name} style={styles.input} />
                        <Text style={styles.txtForm} >Itinerary Price</Text>
                        <TextInput multiline={true} numberOfLines={2} onChangeText={(text) => onChangePrice(text)} value={price} style={styles.input} />
                        <Text style={styles.txtForm} >Itinerary Tags</Text>
                        <TextInput multiline={true} numberOfLines={2} onChangeText={(text) => onChangeTags(text)} value={tags} style={styles.input} />
                        <Text style={styles.txtForm} >Itinerary Duration</Text>
                        <TextInput multiline={true} numberOfLines={2} onChangeText={(text) => onChangeDuration(text)} value={duration} style={styles.input} />
                        <TouchableOpacity style={styles.editButtonCn} onPress={handleItinerary}>
                            <Text style={styles.newItineraryButton}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
</TouchableWithoutFeedback>
</KeyboardAvoidingView>
</View>
    )
}



const styles = StyleSheet.create({

    newCityContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: "#F5EDFF",
    },
    container: {
        flex:1,
        width:300,
        justifyContent: 'center',
        alignItems: 'center'
    },
    formContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        backgroundColor: "#C8B6E2",
        width: '90%',
        margin: 10,
        borderRadius:10,
    },
    formImageContainer: {
        flex: .3,
        width: '100%',
        height: '50%'
    },
    txtForm: {
        color: "#fff",
        fontWeight: 'bold'
    },
    inputWrapper: {
        flex: .9,
        alignItems: 'center',
        justifyContent: 'center'
    },
    inputForm: {
        padding: 5,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 10,
    },
    input: {
        marginVertical: 10,
        borderColor: 'black',
        borderWidth: 0.5,
        width: 200,
        borderRadius: 5,
        borderTopWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 1,
        shadowRadius: 2,
    },
    newItineraryButton: {
        color: '#fff',
        fontWeight: 'bold',
        alignSelf: 'center',
        padding: 3,
        fontSize: 14,
    },
    editButtonCn:{
        backgroundColor: '#495C83',
        borderRadius: 10,
        margin: 2,
        padding:8,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: .4,
        shadowRadius: 3,
    },
})