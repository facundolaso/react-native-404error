import { View, Text } from 'react-native'
import React from 'react'
import SignIn from '../components/SignInForm'

export default function SignInScreen({route}) {


  let isUserLogged = route.params.setIsLogged

  return (
    <View>
      <SignIn isUserLogged={isUserLogged}/>
    </View>
  )
}