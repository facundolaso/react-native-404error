import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useGetDetailCityQuery } from '../features/citiesSlice'
import { useGetItineraryCityQuery } from '../features/itinerariesSlice'
import ItineraryCard from '../components/ItineraryCard'
import { useEffect } from 'react'


export default function CityDetailsScreen({ route, navigation }) {
    let { data: citiesDetails } = useGetDetailCityQuery(route.params.cityId)
    let { data: itinerariesCity, refetch } = useGetItineraryCityQuery(route.params.cityId)
    let city = citiesDetails?.response

    let isUserLogged = route.params.isLogged

    const [logged, setLogged] = React.useState(false);

    useEffect(() => {
        if (isUserLogged) {
            setLogged(true)
        } else if (!isUserLogged) {
            setLogged(false)
        }
    }, [isUserLogged])

    return (
        <View style={{ flex: 1, alignItems: 'center', backgroundColor: "#F5EDFF", }}>
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
                {isUserLogged ?
                    <TouchableOpacity onPress={() => navigation.navigate('NewItinerary', { cityId: city._id })}>
                        <Text style={styles.newItineraryButton}>Add new itinerary</Text>
                    </TouchableOpacity>
                    :
                    null}
                <View style={{ flex: 1 }}>
                    <ItineraryCard search={itinerariesCity} refetchAction={refetch} isLogged={route.params.isLogged} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    titleContainer: {
        backgroundColor: "#C89CFF",
        padding: 7,
        borderRadius: 10,
        width: 500,
    },

    title: {
        fontSize: 40,
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },

    subTitle: {
        fontWeight: "bold",
        paddingTop: 10,
    },

    year: {
        fontWeight: "bold",
        padding: 5
    },

    popu: {
        fontWeight: "bold",
        padding: 5
    },

    photoContainer: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: .5,
        shadowRadius: 3,
    },

    cityImage: {
        width: 250,
        height: 200,
        borderRadius: 10,
        margin: 10
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
    }

});