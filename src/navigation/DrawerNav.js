import { View, Text } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeScreen from '../Screens/HomeScreen'
import CitiesScreen from '../Screens/CitiesScreen'

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
    return (
        <Drawer.Navigator initialRouteName="Home" useLegacyImplementation>
            <Drawer.Screen name="Home" component={HomeScreen}/>
            <Drawer.Screen name="Cities" component={CitiesScreen}/>
        </Drawer.Navigator>
    )
}