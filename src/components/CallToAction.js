import { View, Text, StyleSheet, ImageBackground, Image, TouchableHighlight } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';


export default function CallToAction() {
    let navigation = useNavigation()

    const image = { uri: "https://images.alphacoders.com/887/887585.jpg" };
    const logo = { uri: "https://i.ibb.co/1nNLRzt/logo.png" }

    return (
        <View style={styles.callToActionContainer}>
            <ImageBackground source={image} resizeMode="cover" style={styles.imageBackground}>
                <View style={styles.callToAction}>
                    <View style={styles.imgContainer}>
                        <Image style={styles.image} resizeMode="cover" source={logo}></Image>
                    </View>
                    <View style={{ flex: 1, alignItems: 'center' }}>
                        <Text style={styles.title}>MyTinerary</Text>
                        <Text style={{fontSize: 15, fontWeight: 'bold'}}>A trip to happiness</Text>
                    </View>
                    <View>
                        <TouchableHighlight
                            style={styles.button}
                            onPress={() => navigation.navigate('Cities')}
                        >
                            <Text style={{ color: '#fff' }}>Get started</Text>
                        </TouchableHighlight>
                    </View>
                </View>
            </ImageBackground>
        </View>
    )
}

const styles = StyleSheet.create({
    callToActionContainer: {
        flex: 1,
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    imageBackground: {
        flex: 1,
        width: '100%',
        justifyContent: "center",
        alignItems: 'center'
    },
    imgContainer: {
        width: 120,
        height: 100,
        padding: 5
    },
    image: {
        width: '90%',
        height: '90%'
    },
    callToAction: {
        flex: 0.6,
        width: 250,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        padding: 10
    },
    title: {
        fontSize: 50,
        color: '#495c83',
    },
    button: {
        backgroundColor: '#495c83',
        paddingHorizontal: 20,
        paddingVertical: 8,
        borderRadius: 10
    },
});