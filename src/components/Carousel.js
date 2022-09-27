import { View, Text, Button, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useGetAllCitiesQuery } from '../features/citiesSlice'
import { useState, useEffect } from 'react'
import { useNavigation } from '@react-navigation/native'

export default function Carousel() {
    let { data: citiesData } = useGetAllCitiesQuery()

    let navigation = useNavigation()

    const range = 4
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(start + range)
    const [intervalId, setIntervalId] = useState()
    const interval = 5 * 700
    const limitSlides = (3 * range)

    let cities = citiesData?.response

    const cityView = (city) => (

        <View style={styles.cityView} key={city.city}>
            {/* <LinkRouter to={`/details?id=${city._id}`}><img src={city.photo} /></LinkRouter> */}
            <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Details', 
                {
                    cityId: city._id
                })}
            >
                <Image style={styles.carouselImage} source={{ uri: city.photo }} />
                <Text style={{ color: '#fff', textAlign: 'center' }} >{city.city}</Text>
            </TouchableOpacity>
        </View>
    )


    useEffect(() => {
        let id = setInterval(function () {
            next()
        }, interval)
        setIntervalId(id)
        return () => clearInterval(id);
    }, [start])

    function previous() {
        if (start >= range) {
            setStart(start - range)
            setEnd(end - range)
        }
        else {
            setStart(cities.length - range)
            setEnd(cities.length)
        }
        clearInterval(intervalId)
    }

    function next() {
        if (start < limitSlides - range) {
            setStart(start + range)
            setEnd(end + range)
        } else {
            setStart(0)
            setEnd(range)
        }
        clearInterval(intervalId)
    }

    return (
        <View style={{ flex: 1 }}>
            <View style={styles.carouselContainer}>
                <View >
                    <Text style={styles.title}>Popular MYtineraries</Text>
                </View>
                <View style={styles.slide}>
                    <View>
                        <Button title="Previous" onPress={previous} />
                    </View>
                    <View style={styles.imageContainer}>
                        {cities?.slice(start, end).map(cityView)}
                    </View>
                    <View >
                        <Button title="Next" onPress={next} />
                    </View>
                </View>
            </View>
            {/* <View style={styles.cont}>
                <Text >Otro contenedor</Text>
            </View> */}
        </View>
    )
}

const styles = StyleSheet.create({
    carouselContainer: {
        flex: 0.3,
        width: '100%',
        height: '50%',
        backgroundColor: '#A8A4CE',
        alignItems: 'center',
        justifyContent: 'center'
    },

    title: {
        color: '#fff',
        fontSize: 23,
    },

    slide: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },

    imageContainer: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        // margin-bottom: 2rem,
    },

    cityView: {
        textAlign: 'center',
    },

    carouselImage: {
        width: 140,
        height: 80,
        margin: 5
    },

    // cont: {
    //     flex: 1,
    //     backgroundColor: 'red'
    // }
});
