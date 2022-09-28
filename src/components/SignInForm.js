import React, { useState } from "react";
import { useSignInMutation } from '../features/usersSlice'
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    TouchableOpacity,
} from "react-native";

export default function SignIn() {

    let [signIn, result] = useSignInMutation()

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async (form) => {
        const accesData =
        {
            mail: email,
            password: password,
            from: "form"
        };
        await signIn(accesData);
    }
    
    if (result.isSuccess) {

        let infoUserToken = async () => {
            try {
                await AsyncStorage.setItem('token', JSON.stringify(result?.data.token))
            } catch (e) {
            }
            
            console.log('Done.')
        }
        infoUserToken()
        
        let infoUser = async () => {
            try {
                await AsyncStorage.setItem('loggedUser', JSON.stringify(result.data.response))
            } catch (e) {
            }

            console.log('Done.')
        }
        infoUser()
    }
    else if (result.isError) {
        console.log(result)
    }

    return (
        <View style={styles.container}>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Email."
                    placeholderTextColor="#003f5c"
                    onChangeText={(email) => setEmail(email)}
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Password."
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>

            <TouchableOpacity style={styles.loginBtn} onPress={handleSignIn}>
                <Text style={styles.loginText}>LOGIN</Text>
            </TouchableOpacity>

            
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
        backgroundColor: "#C89CFF",
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
        width: "80%",
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginTop: 40,
        backgroundColor: "#FF1493",
    },
})