import { View, Text, StyleSheet, RefreshControl, ScrollView } from 'react-native'
import React from 'react'
import { useEffect, useState } from 'react';
import { useGetItineraryUserQuery } from '../features/itinerariesSlice';
import ItineraryCard from '../components/ItineraryCard';
import AsyncStorage from '@react-native-async-storage/async-storage';

const wait = (timeout) => {
    return new Promise(resolve => setTimeout(resolve, timeout));
}

export default function MyTineraryScreen({ route }) {


    const [refreshing, setRefreshing] = useState(false);

    const onRefresh = React.useCallback(() => {
        setRefreshing(true);
        wait(1000).then(() => setRefreshing(false));
        refetch()
    }, []);

    let isUserLogged = route.params.isLogged

    const [logged, setLogged] = React.useState(false);

    useEffect(() => {
        getUser()
        if (isUserLogged) {
            setLogged(true)
        } else if (!isUserLogged) {
            setLogged(false)
        }
    }, [isUserLogged])

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
        <ScrollView style={styles.containerMyTinerary} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
            {itineraries ?
                <>
                    {itineraries.response.length > 0 ?
                        <View>
                            <ItineraryCard search={itineraries} refetchAction={refetch} isLogged={isUserLogged} />
                        </View>
                        :
                        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
                            <Text style={{ fontSize: 40 }}>Swipe Down</Text>
                        </View>
                    }
                </>
                :
                null
            }

        </ScrollView>
    )
}

const styles = StyleSheet.create({
    containerMyTinerary: {
        flex: 1,
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