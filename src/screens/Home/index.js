import React, { useState, useContext } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity } from "react-native";
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

import UserContext from '../../context/Users/type';
import { styles } from "./styles";

import AsyncStorage from "@react-native-async-storage/async-storage";

function Home() {
    const [passwordVisible, setPasswordVisible] = useState(false)
    const [password, setPassword] = useState('')
    const userCtx = useContext(UserContext)

    const { navigate } = useNavigation()

    async function handleSubmit() {
        const email = await AsyncStorage.getItem('loggedEmailUser')
        const data = {
            email: email.toLowerCase()
        }
        userCtx.deleteUser(data)
        navigate('Login')
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.view}>
                <View>
                    <TouchableOpacity onPress={() => { navigate('Login') }}>
                        <Ionicons name="arrow-back" size={25} />
                    </TouchableOpacity>
                    <Text style={styles.title}>Bem vindo</Text>
                    <Text>Olá, em breve teremos novidades no app!</Text>
                    <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
                        <Text>Delete sua conta</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ SafeAreaView >
    )
}

export default Home