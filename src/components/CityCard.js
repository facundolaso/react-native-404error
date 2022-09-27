import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'

export default function CityCard(props) {
  return (
    <View style={styles.cardContainer}>
        <Text>{props.title}</Text>
        <Image style={styles.cityImage} source={{uri: props.photo}}/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },

    cityImage : {
        width: 120,
        height: 100
    },

    cardContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    }
  });