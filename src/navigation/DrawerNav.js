import React from 'react'
import { useState, useEffect } from 'react'
import { Image } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'

import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeScreen from '../Screens/HomeScreen'
import CitiesScreen from '../Screens/CitiesScreen'
import CityDetailsScreen from '../Screens/CityDetailsScreen'
import SignInScreen from '../Screens/SignInScreen'
import MyTineraryScreen from '../Screens/MyTineraryScreen'

const Drawer = createDrawerNavigator();

export default function DrawerNav() {

    const [loggedUser, setUser] = useState()

    const getUser = async () => {
        try {
            const savedUser = await AsyncStorage.getItem("loggedUser");
            let currentUser = JSON.parse(savedUser)
            setUser(currentUser)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUser()
    }, [])


    return (
        <Drawer.Navigator screenOptions={{ drawerInactiveBackgroundColor: '#d7def8', drawerActiveTintColor: '#4a00e0', drawerActiveBackgroundColor: '#C8B6E2', headerStyle: { backgroundColor: '#C8B6E2' } }} initialRouteName="Home" useLegacyImplementation>
            <Drawer.Screen options={{ drawerIcon: () => <Image style={{ width: 30, height: 30 }} source={{ uri: "https://cdn-icons-png.flaticon.com/512/263/263115.png" }} /> }} name="Home" component={HomeScreen} />
            <Drawer.Screen options={{ drawerIcon: () => <Image style={{ width: 30, height: 30 }} source={{ uri: "https://cdn-icons-png.flaticon.com/512/2451/2451548.png" }} /> }} name="Cities" component={CitiesScreen} />
            <Drawer.Screen options={{ drawerItemStyle:{display: 'none'}}} name="Details" component={CityDetailsScreen} />
            {loggedUser ?
                <>
                    <Drawer.Screen options={{ drawerIcon: () => <Image style={{ width: 30, height: 30 }} source={{ uri: "https://cdn-icons-png.flaticon.com/512/6889/6889707.png" }} /> }} name="MyTinerary" component={MyTineraryScreen} />
                    <Drawer.Screen options={{ title: "Sign Out",drawerIcon: () => <Image style={{ width: 30, height: 30 }} source={{ uri: "https://cdn-icons-png.flaticon.com/512/8109/8109296.png" }} /> }} name="SignIn" component={SignInScreen} />
                </>
                :
                <Drawer.Screen options={{ drawerIcon: () => <Image style={{ width: 30, height: 30 }} source={{ uri: "https://cdn-icons-png.flaticon.com/512/8109/8109296.png" }} /> }} name="SignIn" component={SignInScreen} />
            }

        </Drawer.Navigator>
    )
}
// options={{drawerIcon: ({tintColor}) => (<Image style={{width: 20, height: 20}} source={{uri: "https://www.adobe.com/es/express/create/media_127a4cd0c28c2753638768caf8967503d38d01e4c.jpeg?width=400&format=jpeg&optimize=medium"}}/>)}}