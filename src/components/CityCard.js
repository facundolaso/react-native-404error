import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';

export default function CityCard(props) {
  const navigation = useNavigation();
  return (
    <View style={styles.cardContainer}>

      <Text style={styles.title}>{props.title}</Text>

      <View style={styles.photoContainer}>
        <Image style={styles.cityImage} source={{ uri: props.photo }} />
      </View>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Details', {
        cityId: props.id
      })}>
        <Text style={styles.textButton}>Details</Text>
      </TouchableOpacity>

    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontWeight: "bold",
    color: "black",
    padding: 5,
    fontSize: 13
  },

  photoContainer: {
    flex: 1,
    width: 100,
    height: 100,
    margin: 1,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: .6,
    shadowRadius: 2,
  },

  cityImage: {
    width: 100,
    height: 100,
    margin: 1,
    borderRadius: 10
  },

  button: {
    backgroundColor: "#C89CFF",
    alignItems: "center",
    borderRadius: 5,
    padding: 3,
    shadowColor: '#171717',
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: .2,
    shadowRadius: 3,
    margin: 6,
  },

  textButton: {
    color: "white",
    fontWeight: "bold",
  },

  cardContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#FFF",
  }
});