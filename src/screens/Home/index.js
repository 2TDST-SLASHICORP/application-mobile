import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView, View, Text, TextInput, TouchableOpacity, FlatList, Image } from "react-native";
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

import UserContext from '../../context/Users/type';
import { styles } from "./styles";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { RFPercentage } from "react-native-responsive-fontsize";

import { storeProducts, fetchProducts } from '../../api'

function Home() {
    const [records, setRecords] = useState([])
    const [record, setRecord] = useState('')

    const { navigate } = useNavigation()

    useEffect(() => {
        fetchProducts(setRecords)
    }, [])


    function handleAddItem() {
        storeProducts([...records, { id: Math.random(), image: "https://cdn.discordapp.com/attachments/758080680860057643/901893478827561020/Grupo_883x.png", name: "frutas", quantity: 632 }])
    }

    function handleSubmit() {
        storeProducts(records.map(item => {
            const quantity = item?.addSum ? item.addSum + item.quantity : item.quantity;
            return {
                ...item,
                quantity,
                addSum: 0
            }
        }))
    }

    function handlePlus(id) {
        setRecords(records.map(item => (item.id === id ? { ...item, addSum: item?.addSum ? item.addSum + 1 : 1 } : item)))
    }

    function handleMinus(id) {
        setRecords(records.map(item => (item.id === id ? { ...item, addSum: item?.addSum ? item.addSum - 1 : -1 } : item)))
    }

    const renderItem = ({ item }) => {
        return (
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: 'space-between' }}>
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                    <Image source={{ uri: item.image }} style={{
                        width:
                            60,
                        height: 60,
                        borderRadius: 8,
                        marginRight: 24
                    }} />
                    <View>
                        <Text style={{ fontSize: 16, fontWeight: '300' }}>{item.name}</Text>
                        <Text style={{ fontSize: 12, fontWeight: '200', color: '#c4c4c4' }}>Unidades</Text>
                        <Text style={{ fontSize: 24, color: 'red', fontWeight: '200' }}>{item.quantity}</Text>
                    </View>
                </View>
                <View style={{ flexDirection: 'row', alignItems: "center" }}>
                    <TouchableOpacity onPress={() => handleMinus(item.id)} style={{ padding: 4, borderRadius: 8, backgroundColor: '#00f7ff' }}><AntDesign name={"minus"} size={24} color='#00a5d9' /></TouchableOpacity>
                    <Text style={{ fontSize: 18, fontWeight: '700', padding: 20 }}>{item?.addSum ? item.addSum : 0}</Text>
                    <TouchableOpacity onPress={() => handlePlus(item.id)} style={{ padding: 4, borderRadius: 8, backgroundColor: '#00f7ff' }}><AntDesign name={"plus"} size={24} color='#00a5d9' /></TouchableOpacity>
                </View>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.view}>
                <View>
                    <TouchableOpacity onPress={() => { navigate('Login') }}>
                        <Ionicons name="arrow-back" size={25} />
                    </TouchableOpacity>
                    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                        <View style={{
                            padding: 8, borderRadius: 24, backgroundColor: '#23fcbe', width: '40%'
                        }}>
                            <Text style={{
                            }}>Slashi Corp</Text>
                        </View>
                        <View style={{ padding: 8, borderWidth: 1, borderRadius: 30 }}>
                            <Ionicons name="person-outline" size={24} />
                        </View>
                    </View>
                    <View style={{ padding: 8 }}>
                        <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: 'space-between' }}>
                            <Text style={styles.title}>Estoque</Text>
                            <TouchableOpacity onPress={handleAddItem}>
                                <AntDesign name="plus" size={24} color='#23fcbe' />
                            </TouchableOpacity>
                        </View>
                        <FlatList
                            style={{ maxHeight: RFPercentage(50) }}
                            data={records}
                            keyExtractor={(item) => String(item.id)}
                            renderItem={renderItem}
                            ItemSeparatorComponent={() => <View style={{ margin: 5 }} />}
                        />
                    </View>
                </View>
                <View>
                    <TouchableOpacity onPress={handleSubmit} style={{ alignItems: "center", paddingVertical: 16, backgroundColor: '#23fcbe', position: "absolute", bottom: 10, width: '100%', left: 0, right: 0, }}><Text>Enviar</Text></TouchableOpacity>
                </View>
            </View >
        </ SafeAreaView >
    )
}

export default Home