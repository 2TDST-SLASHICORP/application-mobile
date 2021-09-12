import React, { useState, useContext } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from "react-native";
import { AntDesign, Feather, Ionicons } from '@expo/vector-icons';
import { RectButton } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";

import UserContext from '../../context/Users/type';
import { styles } from "./styles";

import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Register() {
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [password, setPassword] = useState('')
    const userCtx = useContext(UserContext)

    const { navigate } = useNavigation()

    async function handleSubmit() {
        const email = await AsyncStorage.getItem('emailForgotPassword')
        const data = {
            password: password.toLowerCase(),
            email
        }
        userCtx.forgotPasswordUser(data)
        navigate('Login')
        await AsyncStorage.removeItem('emailForgotPassword')
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.view}>
                <View>
                    <TouchableOpacity onPress={() => { navigate('Login') }}>
                        <Ionicons name="arrow-back" size={25} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Nova Senha</Text>
                    <Text>Insira sua nova senha!</Text>
                    <View style={{ marginVertical: 20 }}>
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
                        <Text>Continue</Text>
                        <AntDesign name="arrowright" size={20} color="black" />
                    </RectButton>
                </View>
            </View>
        </ SafeAreaView >
    )
}