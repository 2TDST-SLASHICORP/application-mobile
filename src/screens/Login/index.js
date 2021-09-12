import React, { useState, useContext } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from "react-native";
import { AntDesign, Feather } from '@expo/vector-icons';
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styles";
import UserContext from "../../context/Users/type";

import AsyncStorage from "@react-native-async-storage/async-storage";

export function Login() {
    const [passwordVisible, setPasswordVisible] = useState(false)
    const userCtx = useContext(UserContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const { navigate } = useNavigation()

    function validateEmail(email) {
        const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return res.test(String(email).toLowerCase());
    }

    async function handleSubmit() {
        if (!validateEmail(email)) {
            return alert('Email não válido')
        }

        const userExists = userCtx.users.find(item => item.email === email.toLowerCase() || item.username === email && item.password === password)

        if (!userExists) {
            return alert('Credenciais incorretas!')
        }

        await AsyncStorage.setItem('loggedEmailUser', email.toLowerCase(), null)
        navigate('Home')
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.view}>
                <Text style={styles.title}>Entrar</Text>
                <View>
                    <View>
                        <View>
                            <Text>Username ou email</Text>
                            <View style={styles.inputView}>
                                <AntDesign name="user" size={20} color="gray" />
                                <TextInput style={styles.inputEmail} onChangeText={email => setEmail(email)} />
                            </View>
                        </View>
                        <View >
                            <Text>Senha</Text>
                            <View style={styles.inputView}>
                                <Feather name="lock" size={20} color="gray" />
                                <TextInput style={styles.inputPassword} secureTextEntry={passwordVisible ? false : true} onChangeText={password => setPassword(password)} />
                                <TouchableOpacity onPress={() => setPasswordVisible(!passwordVisible)}>
                                    <Feather name={passwordVisible ? "eye-off" : "eye"} size={20} color="gray" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>


                    <RectButton style={styles.submitButton} onPress={handleSubmit}>
                        <Text>Entrar</Text>
                        <Feather name="log-in" size={20} color="black" />
                    </RectButton>

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
                </View>
                <View style={styles.divider} />
                <View style={styles.footerView}>
                    <View style={styles.footerCreateAccountView}>
                        <Text>Ainda não tem uma conta? </Text>
                        <TouchableOpacity onPress={() => { navigate('Register') }}>
                            <Text style={styles.linkToRegister}>Inscreva-se</Text>
                        </TouchableOpacity>
                    </View>
                    <TouchableOpacity onPress={() => { navigate('ForgotPasswordFirstStep') }}>
                        <Text style={styles.linkToForgotPassword}>Esqueceu sua senha?</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ SafeAreaView>
    )
}