import React, { useEffect, useState } from "react";
import { useSignInMutation, useSignOutMutation } from '../features/usersSlice'
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeModule } from "react-native";
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
} from "react-native";

export default function SignIn() {

    let [signIn] = useSignInMutation()

    let [signOut, result] = useSignOutMutation()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [user, setUser] = useState()

    const handleSignIn = async (form) => {
        const accesData =
        {
            mail: email,
            password: password,
            from: "form"
        };
        const userData = await signIn(accesData);

        let infoUserToken = async () => {
            try {
                await AsyncStorage.setItem('token', JSON.stringify(userData?.data.token))
            } catch (e) {
            }
            console.log('Done.')
        }
        await infoUserToken()

        let infoUser = async () => {
            try {
                await AsyncStorage.setItem('loggedUser', JSON.stringify(userData?.data.response))
            } catch (e) {
            }
            console.log('Done.')
        }
        await infoUser();
        await getUser();
        RNRestart.Restart();

    }
    const getUser = async () => {
        try {
            const savedUser = await AsyncStorage.getItem('loggedUser');
            let currentUser = JSON.parse(savedUser);
            setUser(currentUser)
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(() => {
        getUser()
    }, [])


    async function signOutButton() {
        
        let userData = {
            mail: user.user.mail,
        }
        await signOut(userData);
        await AsyncStorage.removeItem('loggedUser');
        await AsyncStorage.removeItem('token');
        setUser()
        NativeModules.DevSettings.reload();

    }
    if (result) {
        console.log(result)    
    }
    console.log(user)
    const logo = { uri: "https://i.ibb.co/1nNLRzt/logo.png" }

    return (
        <View style={styles.container}>
            {user ?
                (
                    <View style={styles.containerSignOut}>
                        <View style={styles.txtSignOut}>
                            <Text style={styles.texto} >Welcome at Mytineraries! </Text>
                        </View>
                        <View style={styles.imgContainer}>
                            <Image style={styles.image} resizeMode="cover" source={logo}></Image>
                        </View>
                        <View style={styles.txtSignOut}>
                            <Text style={styles.texto} >Do you want to leave your session? Please log out. </Text>
                        </View>
                        <TouchableOpacity style={styles.loginBtn} onPress={signOutButton} >
                            <Text style={styles.loginText}>Sign Out</Text>
                        </TouchableOpacity>
                    </View>
                )
                :
                <>
                    <View style={styles.imgContainer}>
                            <Image style={styles.image} resizeMode="cover" source={logo}></Image>
                        </View>
                        <View style={styles.txtSignOut}>
                            <Text style={styles.textSignIn} >Mytineraries</Text>
                        </View>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Email"
                            placeholderTextColor="#003f5c"
                            onChangeText={(email) => setEmail(email)}
                        />
                    </View>
                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Password"
                            placeholderTextColor="#003f5c"
                            secureTextEntry={true}
                            onChangeText={(password) => setPassword(password)}
                        />
                    </View>
                    <TouchableOpacity style={styles.loginBtn} onPress={handleSignIn}>
                        <Text style={styles.loginText}>Sign In</Text>
                    </TouchableOpacity>
                </>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "#F5EDFF",
        alignItems: "center",
        justifyContent: "center",
        height: "100%",
    },

    inputView: {
        backgroundColor: "#C8B6E2",
        borderRadius: 30,
        width: "90%",
        height: 40,
        marginBottom: 20,

        alignItems: "center",
    },

    TextInput: {

        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },

    forgot_button: {
        height: 30,
        marginBottom: 30,
    },

    loginBtn: {
        width: "50%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#495C83",
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: .4,
        shadowRadius: 3,
    },
    loginText: {
        color: "white",
        fontWeight: "bold",
    },
    imgContainer: {
        width: 160,
        height: 120,
    },
    image: {
        width: 160,
        height: 130,
    },
    txtSignOut: {
        width: 250,
        justifyContent: "center",
        alignItems: "center",
        padding: 25,
    },
    texto: {
        color: "white",
        fontWeight: "bold",
    },
    textSignIn: {
        fontWeight: "bold",
        padding: 2,
        margin: 2,
        fontSize:16
    },
    containerSignOut: {
        backgroundColor: '#C8B6E2',
        flex: 1,
        justifyContent: "center",
        height: "90%",
        width: "90%",
        alignItems: "center",
        margin: 15,
        borderRadius: 10,
    },
})