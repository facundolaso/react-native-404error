import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAddItineraryMutation } from '../features/itinerariesSlice'
import { useNavigation } from '@react-navigation/native';


export default function NewItinerary({ route }) {
    const navigation = useNavigation();

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

    let [addItinerary, resultNewItinerary] = useAddItineraryMutation()

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

    if (resultNewItinerary.isSuccess) {
        alert(resultNewItinerary.data.message)
        resultNewItinerary.isSuccess = false
    }

    return (
        <View style={styles.newCityContainer}>
            <View style={styles.formContainer}>
                <View style={styles.formImageContainer}>
                    <Image style={{ width: '100%', height: '100%' }} source={{ uri: "https://images.pexels.com/photos/4553618/pexels-photo-4553618.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" }} />
                </View>
                <View style={styles.inputWrapper}>
                    <View>
                    <Text style={{ fontSize: 25 }}>Add new itinerary</Text>
                    </View>
                    {/* <Alerts alert={result} /> */}
                    <View style={styles.inputForm}>
                        <Text>Itinerary Name</Text>
                        <TextInput multiline={true} numberOfLines={2} onChangeText={(text) => onChangeName(text)} value={name} style={styles.input} />
                        <Text>Itinerary Price</Text>
                        <TextInput multiline={true} numberOfLines={2} onChangeText={(text) => onChangePrice(text)} value={price} style={styles.input} />
                        <Text>Itinerary Tags</Text>
                        <TextInput multiline={true} numberOfLines={2} onChangeText={(text) => onChangeTags(text)} value={tags} style={styles.input} />
                        <Text>Itinerary Duration</Text>
                        <TextInput multiline={true} numberOfLines={2} onChangeText={(text) => onChangeDuration(text)} value={duration} style={styles.input} />
                        <TouchableOpacity onPress={handleItinerary}>
                            <Text style={styles.newItineraryButton}>Submit</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    newCityContainer: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: 'black',
        borderWidth: .5,
        borderRadius: 5,
    },
    formContainer: {
        flex: 1,
        justifyContent: 'space-evenly',
        width: '80%',
    },
    formImageContainer: {
        flex: .3,
        width: '100%',
        height: '50%'
    },
    inputWrapper: {
        flex: .7,
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
        backgroundColor: '#495C83',
        borderRadius: 5,
        color: '#fff',
        fontWeight: 'bold',
        alignSelf: 'center',
        padding: 3,
        fontSize: 14,
        marginVertical: 5
    },
})