import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'

export default function Like({ handleLike, itinerary, loggedUser }) {

    return (
        <>
            {loggedUser?.user ?
                <> {itinerary?.likes.includes(loggedUser?.user.id) ?
                    <TouchableOpacity onPress={() => handleLike(itinerary._id)}>
                        <Image style={{ width: 20, height: 20 }} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1053/1053222.png' }} />
                    </TouchableOpacity>

                    :
                    <TouchableOpacity onPress={() => handleLike(itinerary._id)}>
                        <Image style={{ width: 20, height: 20 }} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/2961/2961957.png' }} />
                    </TouchableOpacity>
                }</>
                :
                <Image style={{ width: 20, height: 20 }} source={{ uri: 'https://cdn-icons-png.flaticon.com/512/1053/1053222.png' }} />
                }
        </>
    )
}

const styles = StyleSheet.create({

});