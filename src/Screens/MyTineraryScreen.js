import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { useEffect } from 'react';
import { useGetItineraryUserQuery } from '../features/itinerariesSlice';
import ItineraryCard from '../components/ItineraryCard';


export default function MyTineraryScreen() {
    const navigate = useNavigation();

    let { data: itineraries, refetch } = useGetItineraryUserQuery("63240817c885cdee2c6fe3f8")

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
        alignItems:'center'
    },
})