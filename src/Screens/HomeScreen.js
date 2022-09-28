import { View, Text, Button } from 'react-native'
import React from 'react'
import Carousel from '../components/Carousel'
import CallToAction from '../components/CallToAction'

export default function HomeScreen({ navigation }) {
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <CallToAction/>
            <Carousel/>
        </View>
    )
}