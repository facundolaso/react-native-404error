import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer'
import HomeScreen from '../Screens/HomeScreen'
import CitiesScreen from '../Screens/CitiesScreen'
import CityDetailsScreen from '../Screens/CityDetailsScreen'
import SignInScreen from '../Screens/SignInScreen'
import MyTineraryScreen from '../Screens/MyTineraryScreen'
import { Image } from 'react-native'

const Drawer = createDrawerNavigator();

export default function DrawerNav() {
    return (
        <Drawer.Navigator screenOptions={{ drawerInactiveBackgroundColor: '#d7def8', drawerActiveTintColor: '#4a00e0', drawerActiveBackgroundColor: '#C8B6E2', headerStyle: { backgroundColor: '#C8B6E2' } }} initialRouteName="Home" useLegacyImplementation>
            <Drawer.Screen options={{drawerIcon: () => <Image style={{width: 30, height: 30}} source={{uri: "https://cdn-icons-png.flaticon.com/512/263/263115.png"}} />}} name="Home" component={HomeScreen} />
            <Drawer.Screen options={{drawerIcon: () => <Image style={{width: 30, height: 30}} source={{uri: "https://cdn-icons-png.flaticon.com/512/2451/2451548.png"}} />}} name="Cities" component={CitiesScreen} />
            <Drawer.Screen options={{drawerIcon: () => <Image style={{width: 30, height: 30}} source={{uri: "https://cdn-icons-png.flaticon.com/512/1150/1150592.png"}} />}} name="Details" component={CityDetailsScreen} />
            <Drawer.Screen options={{drawerIcon: () => <Image style={{width: 30, height: 30}} source={{uri: "https://cdn-icons-png.flaticon.com/512/8109/8109296.png"}} />}} name="SignIn" component={SignInScreen} />
            <Drawer.Screen options={{drawerIcon: () => <Image style={{width: 30, height: 30}} source={{uri: "https://cdn-icons-png.flaticon.com/512/6889/6889707.png"}} />}} name="MyTinerary" component={MyTineraryScreen} />
        </Drawer.Navigator>
    )
}
// options={{drawerIcon: ({tintColor}) => (<Image style={{width: 20, height: 20}} source={{uri: "https://www.adobe.com/es/express/create/media_127a4cd0c28c2753638768caf8967503d38d01e4c.jpeg?width=400&format=jpeg&optimize=medium"}}/>)}}