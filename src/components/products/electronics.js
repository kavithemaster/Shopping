import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, ScrollView } from "react-native";
import { ThemeConsumer, Header, Button, SearchBar } from "react-native-elements";
import Icon from 'react-native-vector-icons/MaterialIcons'
import Data from "../../assets/data/swiper.json"
import AppContext from "../../shared/context";

const Electronics = ({ navigation }) => {

    const electronics = Data.electronics

    const { cart, setCart, setProduct } = useContext(AppContext)
    const [select, setSelect] = useState()
    const [visible, setVisible] = useState(false)
    const [search, setSearch] = useState("")
    const [result, setResult] = useState([...electronics])

    const addtocart = item => {
        item['count'] = 1
        setSelect(item)
    }

    const updateSearch = (text) => {
        if (text.length) {
            setSearch(text)
            let match = []
            electronics.map((item) => {
                if (item.name.toLowerCase().includes(text.toLowerCase())) {
                    match.push(item)
                }
            })
            setResult([...match])
        }
        else {
            setSearch(text)
            setResult(...electronics)
        }
    }

    useEffect(() => {
        if (select) {
            if (cart.length) {
                let flag = false
                cart.map((item) => {
                    if (item.id == select.id) {
                        flag = true
                    }
                })
                if (flag) {
                    let temp = []
                    cart.map((item) => {
                        if (item.id == select.id) {
                            let prod = item
                            prod.count = select.count
                            temp.push(prod)
                        }
                        else {
                            temp.push(item)
                        }
                    })
                    setCart(temp)
                }
                else {
                    setCart(pre => [...pre, select])
                }
            }
            else {
                setCart(pre => [...pre, select])
            }
        }
    }, [select])

    return (
        <ThemeConsumer>
            {
                ({ theme }) =>
                    <View style={{ backgroundColor: "white" }}>
                        <Header
                            centerComponent={{
                                text: "Electronics",
                                style: theme.electronicStyles.header
                            }}
                            placement="center"
                            rightComponent={{ icon: "search", onPress: () => setVisible(!visible) }}

                            leftComponent={{ icon: "chevron-left", size: 32, onPress: () => navigation.goBack() }}
                        />

                        {
                            visible ? <View>
                                <SearchBar lightTheme
                                    placeholder="Search Here"
                                    placeholderTextColor="black"
                                    round
                                    value={search}
                                    onChangeText={(text) => updateSearch(text)}
                                />
                            </View> : null
                        }
                        <ScrollView>
                            <View style={{ marginTop: 30 }}>
                                <FlatList
                                    data={result}
                                    scrollEnabled={false}
                                    keyExtractor={item => item.id}
                                    renderItem={({ item }) => {
                                        if (item.fav == null) {
                                            item['fav'] = false
                                        }

                                        return (
                                            //Main View
                                            <View style={{ flex: 1, flexDirection: "row", marginVertical: 5, elevation: 20, marginHorizontal: 10, borderRadius: 20, backgroundColor: "white", paddingHorizontal: 10, paddingVertical: 10 }}>

                                                <View style={theme.electronicStyles.imageConatiner}>
                                                    <TouchableOpacity onPress={() => { setProduct(item), navigation.navigate("Product") }}>
                                                        <Image
                                                            source={{ uri: item.req }}
                                                            style={theme.electronicStyles.image}
                                                        />
                                                    </TouchableOpacity>
                                                </View>

                                                <View style={{ flexDirection: "column", justifyContent: "space-between", flex: 0.6, paddingLeft: 10, paddingVertical: 6 }}>
                                                    <View>
                                                        <Text style={{ fontSize: 20, color: "black" }} onPress={() => { setProduct(item), navigation.navigate("Product") }}>{item.name}</Text>
                                                    </View>

                                                    <View style={{ flexDirection: "row", justifyContent: "space-between", width: '60%' }}>
                                                        <View >
                                                            <Text style={{ fontSize: 20, color: "black" }}>Rs.{item.amount}</Text>
                                                        </View>

                                                        <View style={{ flexDirection: "row" }}>
                                                            <Text style={{ fontSize: 20, paddingLeft: 16, color: "black" }}>4.1</Text>
                                                            <Icon name="star-half" size={30} style={{ color: "black" }} />
                                                        </View>

                                                    </View>
                                                    <View >
                                                        <Button
                                                            titleStyle={{ fontSize: 20, color: "white" }}
                                                            onPress={() => addtocart(item)}
                                                            title={"Add to Cart"} />
                                                    </View>

                                                </View>
                                            </View>
                                        )
                                    }}
                                />
                                <View style={{ marginTop: 100 }}>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
            }
        </ThemeConsumer>
    )
}

export default Electronics