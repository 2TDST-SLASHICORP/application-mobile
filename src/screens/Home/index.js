import React, { useState, useContext, useEffect } from "react";
import { SafeAreaView, View, Text, TouchableOpacity, FlatList, Image, Modal } from "react-native";
import { AntDesign, Ionicons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
import { TextInput } from 'react-native-paper'

import UserContext from '../../context/Users/type';
import { styles } from "./styles";

import AsyncStorage from "@react-native-async-storage/async-storage";

import { RFPercentage } from "react-native-responsive-fontsize";

import { storeProducts, fetchProducts } from '../../api'

function Home() {
    const [records, setRecords] = useState([])
    const [record, setRecord] = useState('')
    const [modalVisible, setModalVisible] = useState(false)
    const [imageLink, setImageLink] = useState('')
    const [name, setName] = useState('')

    const { navigate } = useNavigation()

    useEffect(() => {
        fetchProducts(setRecords)
    }, [])


    function handleAddItem() {
        storeProducts([...records, { id: Math.random(), image: imageLink, name: name, quantity: 0 }])
        setModalVisible(false);
        setImageLink('')
        setName('')
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
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
            >
                <View style={{ flex: 1, alignItems: "center", justifyContent: "center", backgroundColor: 'rgba(52, 52, 52, 0.8)' }}>
                    <View style={{ backgroundColor: 'white', padding: 16, borderRadius: 8, width: RFPercentage(45) }}>
                        <Text>Crie um item</Text>
                        <TextInput style={{ height: 40, marginVertical: 12 }} placeholder="Link da imagem" onChangeText={(text) => setImageLink(text)} />
                        <TextInput style={{ height: 40, marginBottom: 12 }} placeholder="Nome" onChangeText={(text) => setName(text)} />
                        <TouchableOpacity onPress={handleAddItem} style={{ alignItems: "center", paddingVertical: 16, backgroundColor: '#23fcbe', width: '100%' }}><Text>Enviar</Text></TouchableOpacity>
                    </View>

                </View>
            </Modal>
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
                            <TouchableOpacity onPress={() => setModalVisible(true)}>
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