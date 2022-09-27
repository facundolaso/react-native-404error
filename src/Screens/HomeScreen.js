import { View, Text, Button } from 'react-native'
import React from 'react'
import Carousel from '../components/Carousel'

export default function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Carousel></Carousel>
        </View>
    )
}