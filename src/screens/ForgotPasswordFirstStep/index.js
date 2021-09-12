import React, { useContext, useState } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from "react-native";
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { RectButton } from "react-native-gesture-handler";

import { useNavigation } from "@react-navigation/native";

import { styles } from "./styles";
import UserContext from '../../context/Users/type';
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Register() {
    const [email, setEmail] = useState()

    const { navigate } = useNavigation()

    const userCtx = useContext(UserContext)

    function validateEmail(email) {
        const res = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return res.test(String(email).toLowerCase());
    }

    async function handleSubmit() {
        if (!validateEmail(email)) {
            return alert('Email não válido')
        }

        const userAlreadyExists = userCtx.users.find(item => item.email === email)

        if (!userAlreadyExists) return alert('Usuário não existe')

        await AsyncStorage.setItem('emailForgotPassword', email, null)

        navigate('ForgotPasswordSecondStep')
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.view}>
                <View>
                    <TouchableOpacity onPress={() => { navigate('Login') }}>
                        <Ionicons name="arrow-back" size={25} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Redefinir Senha</Text>
                    <Text>Insira seu email para redefinir sua senha!</Text>
                    <View style={{ marginVertical: 20 }}>
                        <View>
                            <Text>Email</Text>
                            <View style={styles.inputView}>
                                <AntDesign name="mail" size={20} color="gray" />
                                <TextInput style={styles.inputEmail} onChangeText={(email) => { setEmail(email) }} />
                            </View>
                        </View>
                    </View>
                    <RectButton style={styles.submitButton} onPress={handleSubmit}>
                        <Text>Continue</Text>
                        <AntDesign name="arrowright" size={20} color="black" />
                    </RectButton>
                </View>
            </View>
        </ SafeAreaView >
    )
}