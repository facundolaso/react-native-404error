import { View, Text, StyleSheet, Image, TouchableOpacity,  KeyboardAvoidingView, TouchableWithoutFeedback ,Keyboard } from 'react-native'
import React from 'react'
import { useGetDetailCityQuery } from '../features/citiesSlice'
import { useGetItineraryCityQuery } from '../features/itinerariesSlice'
import ItineraryCard from '../components/ItineraryCard'


export default function CityDetailsScreen({ route, navigation }) {
    let { data: citiesDetails } = useGetDetailCityQuery(route.params.cityId)
    let { data: itinerariesCity, refetch } = useGetItineraryCityQuery(route.params.cityId)
    let city = citiesDetails?.response


    return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: "#F5EDFF", }}>
            <View style={{ flex: 1, alignItems: "center", }}>
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                <View style={{ flex: 1, alignItems: "center", }}>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>{city?.city}</Text>
                </View>

                <View>
                    <Text style={styles.subTitle}>{city?.country}</Text>
                </View>

                <View>
                    <Text style={styles.year}>Funded in {(new Date(city?.fundation)).getFullYear().toLocaleString()}</Text>
                </View>

                <View>
                    <Text style={styles.popu}>Population: {city?.population}</Text>
                </View>

                <View style={styles.photoContainer}>
                    <Image style={styles.cityImage} source={{ uri: city?.photo }} />
                </View>
                </View>
        </TouchableWithoutFeedback>

                <View style={styles.newItinerary}>
                <TouchableOpacity onPress={() => navigation.navigate('NewItinerary', {cityId: city._id})}>
                    <Text style={styles.newItineraryButton}>Add new itinerary</Text>
                </TouchableOpacity>
                </View>

                <View style={{ flex: 1 }}>
                    <ItineraryCard search={itinerariesCity} refetchAction={refetch} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        width:300,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleContainer: {
        backgroundColor: "#C89CFF",
        padding: 2,
        borderRadius: 10,
        width: 500,
    },

    title: {
        fontSize: 31,
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },

    subTitle: {
        fontWeight: "bold",
        paddingTop: 5,
    },

    year: {
        fontWeight: "bold",
        padding: 1
    },

    popu: {
        fontWeight: "bold",
        padding: 1
    },

    photoContainer: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: .5,
        shadowRadius: 3,
    },

    cityImage: {
        width: 290,
        height: 130,
        borderRadius: 10,
        margin: 10
    },

    newItineraryButton: {
        color: '#fff',
        fontWeight: 'bold',
        alignSelf: 'center',
        padding: 3,
        fontSize: 14,
        marginVertical: 5,
    },
    newItinerary: {
        borderRadius:10,
        backgroundColor: '#495C83',
        margin:10,
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: .5,
        shadowRadius: 3,
    },

});