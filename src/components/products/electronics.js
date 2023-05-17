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

    let tem = []
    cart.map((item) => tem.push(item.name))

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
                    if (item.name == select.name) {
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
                                            <View style={theme.electronicStyles.mainContain}>

                                                <View style={theme.electronicStyles.imageConatiner}>
                                                    <TouchableOpacity onPress={() => { setProduct(item), navigation.navigate("Product") }}>
                                                        <Image
                                                            source={{ uri: item.req }}
                                                            style={theme.electronicStyles.image}
                                                        />
                                                    </TouchableOpacity>
                                                </View>

                                                <View style={theme.electronicStyles.contain}>
                                                    <View>
                                                        <Text style={theme.electronicStyles.text} onPress={() => { setProduct(item), navigation.navigate("Product") }}>{item.name}</Text>
                                                    </View>

                                                    <View style={theme.electronicStyles.amountContain}>
                                                        <View >
                                                            <Text style={theme.electronicStyles.text}>Rs.{item.amount}</Text>
                                                        </View>

                                                        <View style={theme.electronicStyles.ratingContain}>
                                                            <Text style={theme.electronicStyles.ratingText}>4.1</Text>
                                                            <Icon name="star-half" size={30} style={theme.electronicStyles.ratingStar} />
                                                        </View>

                                                    </View>
                                                    <View >
                                                        <Button
                                                            titleStyle={theme.electronicStyles.title}
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