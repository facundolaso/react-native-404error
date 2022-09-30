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


    // useEffect(() => {
    //     let id = setInterval(function () {
    //         next()
    //     }, interval)
    //     setIntervalId(id)
    //     return () => clearInterval(id);
    // }, [start])

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
    // let leftArrow = <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor"  viewBox="0 0 16 16">
    // <path d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z" />
    // </svg>
    // let rightArrow = <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="currentColor"  viewBox="0 0 16 16">
    // <path d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
    // </svg>
     const leftArrow = { uri: "https://cdn-icons-png.flaticon.com/512/109/109618.png" }
     const rightArrow = { uri: "https://www.pngmart.com/files/3/Right-Arrow-PNG-Transparent-Picture.png" }
    return (
        <View style={{ flex: 1 }}>
            <View style={styles.carouselContainer}>
                <View >
                    <Text style={styles.title}>Popular MYtineraries</Text>
                </View>
                <View style={styles.slide}>


                    <TouchableOpacity style={styles.arrowContainer} onPress={previous} >

                            <Image style={styles.buttonTxt} source={leftArrow} />
                    </TouchableOpacity>


                    <View style={styles.imageContainer}>
                        {cities?.slice(start, end).map(cityView)}
                    </View>

                    
                    <TouchableOpacity style={styles.arrowContainer} onPress={next} >
                    <Image style={styles.buttonTxt} source={rightArrow} />
                    </TouchableOpacity>

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
        flex: 1,
        width: '100%',
        height: '100%',
        backgroundColor: '#A8A4CE',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonTxt: {
        width:20,
        height:20,
        margin: 10
    },
    arrowContainer:{
        width:40,
        height:"100%",
        alignItems: "center",
        justifyContent: 'center'
    },

    title: {
        color: '#fff',
        fontSize: 20,
        padding: 4,
        fontWeight: "bold"
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
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: .6,
        shadowRadius: 3,
    },

    cityView: {
        textAlign: 'center',
    },

    carouselImage: {
        width: 100,
        height: 80,
        margin: 5,
        borderRadius: 10,
        
    },

    // cont: {
    //     flex: 1,
    //     backgroundColor: 'red'
    // }
});
