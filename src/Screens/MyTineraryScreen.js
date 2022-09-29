import { View, StyleSheet} from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react';
import { useGetItineraryUserQuery } from '../features/itinerariesSlice';
import ItineraryCard from '../components/ItineraryCard';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function MyTineraryScreen() {

    const [user, setUser] = useState()

    const getUser = async () => {
        try {
            const savedUser = await AsyncStorage.getItem("loggedUser");
            let currentUser = JSON.parse(savedUser)
            setUser(currentUser)
        } catch (error) {
            console.log(error);
        }
    };
    
    useEffect(() => {
        getUser()
    }, [])

    let { data: itineraries, refetch } = useGetItineraryUserQuery(user?.user.id)

    return (
        <View style={styles.containerMyTinerary}>
            <View>
                <ItineraryCard search={itineraries} refetchAction={refetch} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    containerMyTinerary: {
        flex: 1,
        alignItems: 'center'
    },
    loginBtn: {
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#FF1493",
    },
})