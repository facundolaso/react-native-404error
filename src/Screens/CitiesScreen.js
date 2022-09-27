import { Text, View, FlatList, ListItem } from 'react-native'
import React, { Component } from 'react'
import { useGetAllCitiesQuery } from '../features/citiesSlice'
import CityCard from '../components/CityCard';

export default function CitiesScreen({ navigation }) {

    let { data: citiesData } = useGetAllCitiesQuery()

    return (
        <FlatList
            data={citiesData?.response}
            numColumns={3}
            keyExtractor={(data) => data._id}
            renderItem={({ item }) => <CityCard title={item.city} photo={item.photo} id={item._id}/>}
        />

        // <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        //     <Button onPress={() => navigation.goBack()} title="Go back home" />
        // </View>
    )
}