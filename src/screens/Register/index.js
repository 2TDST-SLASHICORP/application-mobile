import React, { useState, useContext } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from "react-native";
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import UserContext from '../../context/Users/type';
import { styles } from "./styles";

export default function Register() {
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const userCtx = useContext(UserContext)

    const { navigate } = useNavigation()

    function validateEmail(email) {
        const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return res.test(String(email).toLowerCase());
    }

    function handleSubmit() {
        if (!validateEmail(email)) {
            return alert('Email não válido')
        }
        const data = {
            email: email.toLowerCase(),
            username,
            password
        }
        userCtx.createUser(data)
        navigate('Login')
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.view}>
                <View>
                    <TouchableOpacity onPress={() => { navigate('Login') }}>
                        <Ionicons name="arrow-back" size={25} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Inscrever-se</Text>
                    <View>
                        <View>
                            <Text>Email</Text>
                            <View style={styles.inputView}>
                                <AntDesign name="mail" size={20} color="gray" />
                                <TextInput style={styles.inputEmail} onChangeText={(email) => { setEmail(email) }} />
                            </View>
                        </View>
                        <View>
                            <Text>Username</Text>
                            <View style={styles.inputView}>
                                <AntDesign name="user" size={20} color="gray" />
                                <TextInput style={styles.inputEmail} onChangeText={(username) => { setUsername(username) }} />
                            </View>
                        </View>
                        <View >
                            <Text>Senha</Text>
                            <View style={styles.inputView}>
                                <Feather name="lock" size={20} color="gray" />
                                <TextInput style={styles.inputPassword} secureTextEntry={passwordVisible ? false : true} onChangeText={(password) => { setPassword(password) }} />
                                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                                    <Feather name={passwordVisible ? "eye-off" : "eye"} size={20} color="gray" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
                <View>


                    <View>
                        <RectButton style={styles.facebookButton}>
                            <AntDesign name="facebook-square" size={20} color="white" />
                            <Text style={styles.buttonFGText}>Entrar com o facebook</Text>
                        </RectButton>
                        <RectButton style={styles.googleButton}>
                            <AntDesign name="google" size={20} color="white" />
                            <Text style={styles.buttonFGText}>Entrar com o google</Text>
                        </RectButton>
                    </View>
                    <RectButton onPress={handleSubmit} style={styles.submitButton}>
                        <Text>Entrar</Text>
                        <Feather name="log-in" size={20} color="black" />
                    </RectButton>
                </View>

            </View>
        </ SafeAreaView >
    )
}