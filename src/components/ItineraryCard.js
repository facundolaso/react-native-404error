import { View, Text, Image, StyleSheet, ScrollView, FlatList, RefreshControl, TouchableOpacity, TextInput } from 'react-native'
import React from 'react'
import { useState, useEffect } from 'react';
import Activities from './Activities';
import Comments from './Comments';
import Like from './Like';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api';
import { useEditItineraryMutation, useDeleteItineraryMutation} from '../features/itinerariesSlice';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function ItineraryCard({ search, refetchAction, isLogged }) {
    const axios = require('axios').default;

    let isUserLogged = isLogged

    const [logged, setLogged] = React.useState(false);

    useEffect(()=>{
        getUser()
        if (isUserLogged) {
            setLogged(true)
        } else if (!isUserLogged){
            setLogged(false)
        }
    },[isUserLogged])


    const [name, onChangeName] = React.useState('');
    const [price, onChangePrice] = React.useState('');
    const [tags, onChangeTags] = React.useState('');
    const [duration, onChangeDuration] = React.useState('');


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
        getUser()
    }, [])

    const [editItinearyOpen, setEditItinerary] = useState(false)
    function toggleEditItinerary() {
        onChangeName('')
        onChangePrice('')
        onChangeTags('')
        onChangeDuration('')
        setEditItinerary(wasOpened => !wasOpened)
    }

    let [editItinerary, resultEditItinerary] = useEditItineraryMutation()
    const handleEditItinerary = async (itineraryId) => {
        const newEditItinerary =
        {
            name: name,
            price: price,
            tags: tags,
            duration: duration,
            id: itineraryId
        };
        await editItinerary(newEditItinerary);
        setEditItinerary(false)
        refetchAction()
    }

    if (resultEditItinerary.isSuccess) {
        alert(resultEditItinerary.data.message)
        resultEditItinerary.isSuccess = false
    }

    const [deleteCity, resultDeleteItinerary] = useDeleteItineraryMutation()
    const handleDeleteItinerary = async (itineraryId) => {
        await deleteCity(itineraryId);
        refetchAction()
    }
    if (resultDeleteItinerary.isSuccess) {
        alert(resultDeleteItinerary.data.message)
        resultDeleteItinerary.isSuccess = false
    }


    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        refetchAction()
        wait(1000).then(() => setRefreshing(false));
    }, []);

    const handleLike = async (itineraryId) => {
        const config = {
            headers: { Authorization: `Bearer ${token}` }
        };

        const bodyParameters = {
            
        };

        axios.patch(
            `${api}/itineraries/likes/${itineraryId}`,
            bodyParameters,
            config
        ).then(res => console.log(res.data)).catch(err => console.log(err)).finally(()=> refetchAction())
    }

    let itineraries = search

    const itineraryView = (itinerary) => (

        <View style={styles.itineraryCard} key={itinerary._id}>
            <View style={styles.itineraryCardBody}>
                <View style={styles.itineraryTag}>
                    <Text style={{ color: '#fff' }}>
                        {itinerary.city.city}
                    </Text>
                </View>
                <Text style={styles.info}>
                    {itinerary.name} Itinerary
                </Text>
                <Text style={styles.info}>
                    Duration (Minutes): {itinerary.duration}
                </Text>
                <Text style={styles.info}>
                    $ {itinerary.price}
                </Text>
                <Text style={styles.info}>
                    Tags: {itinerary.tags}
                </Text>
                <View style={styles.itineraryUser}>
                    <View style={styles.itineraryUserInfo}>
                        <Image style={styles.itineraryUserImg} source={{ uri: itinerary.user.photo }} alt="user" />
                        <View>
                            <Text>{itinerary.user.name} {itinerary.user.lastName}</Text>
                            <Text>
                            <Like handleLike={handleLike} itinerary={itinerary} loggedUser={loggedUser}></Like>
                            </Text>
                            <Text>Likes: {itinerary.likes.length}</Text>
                        </View>
                    </View>
                    {isUserLogged ?
                        <>
                            {loggedUser?.user.id == itinerary.user._id ?
                                <View>
                                    <TouchableOpacity style={styles.editButtonCn} onPress={() => toggleEditItinerary()}>
                                        <Text style={styles.editButton}>Edit Itinerary</Text>
                                    </TouchableOpacity>
                                    <>{editItinearyOpen && (
                                        <>
                                            <Text>Itinerary Name</Text>
                                            <TextInput multiline={true} numberOfLines={4} onChangeText={(text) => onChangeName(text)} value={name} style={{ marginVertical: 10, borderColor: 'black', borderWidth: 0.5, width: 200 }} />
                                            <Text>Itinerary Price</Text>
                                            <TextInput multiline={true} numberOfLines={4} onChangeText={(text) => onChangePrice(text)} value={price} style={{ marginVertical: 10, borderColor: 'black', borderWidth: 0.5, width: 200 }} />
                                            <Text>Itinerary Tags</Text>
                                            <TextInput multiline={true} numberOfLines={4} onChangeText={(text) => onChangeTags(text)} value={tags} style={{ marginVertical: 10, borderColor: 'black', borderWidth: 0.5, width: 200 }} />
                                            <Text>Itinerary Duration</Text>
                                            <TextInput multiline={true} numberOfLines={4} onChangeText={(text) => onChangeDuration(text)} value={duration} style={{ marginVertical: 10, borderColor: 'black', borderWidth: 0.5, width: 200 }} />
                                            <TouchableOpacity style={styles.editButtonCn} onPress={() => handleEditItinerary(itinerary._id)}>
                                                <Text style={styles.editButtonCn}>Submit</Text>
                                            </TouchableOpacity>
                                        </>
                                    )}
                                    </>
                                    <TouchableOpacity style={styles.editButtonCn} onPress={() => handleDeleteItinerary(itinerary._id)}>
                                        <Text style={styles.editButton}>Delete Itinerary</Text>
                                    </TouchableOpacity>
                                </View>
                                :
                                <>

                                    {loggedUser?.user.role == "admin" ? <View>
                                    <View style={styles.editButtonCn}>
                                        <TouchableOpacity onPress={() => toggleEditItinerary()}>
                                            <Text style={styles.editButtonCn}>Edit Itinerary</Text>
                                        </TouchableOpacity>
                                    </View>
                                        <>{editItinearyOpen && (
                                            <>
                                                <Text>Itinerary Name</Text>
                                                <TextInput multiline={true} numberOfLines={4} onChangeText={(text) => onChangeName(text)} value={name} style={{ marginVertical: 10, borderColor: 'black', borderWidth: 0.5, width: 200 }} />
                                                <Text>Itinerary Price</Text>
                                                <TextInput multiline={true} numberOfLines={4} onChangeText={(text) => onChangePrice(text)} value={price} style={{ marginVertical: 10, borderColor: 'black', borderWidth: 0.5, width: 200 }} />
                                                <Text>Itinerary Tags</Text>
                                                <TextInput multiline={true} numberOfLines={4} onChangeText={(text) => onChangeTags(text)} value={tags} style={{ marginVertical: 10, borderColor: 'black', borderWidth: 0.5, width: 200 }} />
                                                <Text>Itinerary Duration</Text>
                                                <TextInput multiline={true} numberOfLines={4} onChangeText={(text) => onChangeDuration(text)} value={duration} style={{ marginVertical: 10, borderColor: 'black', borderWidth: 0.5, width: 200 }} />
                                                <TouchableOpacity style={styles.editButtonCn} onPress={() => handleEditItinerary(itinerary._id)}>
                                                    <Text style={styles.editButtonCn}>Submit</Text>
                                                </TouchableOpacity>
                                            </>
                                        )}
                                        </>
                                    </View> : null}
                                </>
                            }
                        </>
                        :
                        null
                    }
                </View>
                <Activities itinerary={itinerary._id}/>
                <Comments itinerary={itinerary._id} isLogged={isLogged}/>
            </View>
        </View>
    )

    return (
        <ScrollView refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        } showsVerticalScrollIndicator={false} style={styles.itineraryContainer}>
            <View>
                {itineraries?.response.map(itineraryView)}
            </View>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    itineraryCard: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#fff',
        margin: 10,
        borderRadius: 10,
        shadowColor: '#52006A',
        elevation: 5,
        width: 300
    },
    itineraryCardBody: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-start',
        padding: 20,
        width: '100%'
    },
    itineraryTag: {
        backgroundColor: '#ad88e9',
        borderRadius: 10,
        padding: 5,
        textTransform: 'uppercase',
        color: '#fff'
    },
    info: {
        margin: 5
    },
    itineraryUser: {
        flex: 1,
        padding: 10,
        justifyContent: 'space-between',
        borderBottomColor: '#666dce',
        borderBottomWidth: 2,
        width: '100%'
    },
    itineraryUserInfo: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },
    itineraryUserImg: {
        width: 25,
        height: 25,
        borderRadius: 50,
        marginRight: 5
    },
    editButton: {
        backgroundColor: '#495C83',
        borderRadius: 5,
        color: '#fff',
        fontWeight: 'bold',
        alignSelf: 'center',
        fontSize: 14,
        marginVertical: 5
    },
    editButtonCn:{
        flex:1,
        alignSelf: 'center',
        backgroundColor: '#495C83',
        borderRadius: 10,
        width:"50%",
        margin: 2,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: .4,
        shadowRadius: 3,
    },
});