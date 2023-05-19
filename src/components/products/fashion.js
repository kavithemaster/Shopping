import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, ScrollView } from "react-native";
import { ThemeConsumer, Header, Button, SearchBar } from "react-native-elements";
import Icon from 'react-native-vector-icons/MaterialIcons'
import Data from "../../assets/data/swiper.json"
import AppContext from "../../shared/context";

const Fashion = ({ navigation }) => {

    // Getting values from  json
    const fashion = Data.fashion

    // Using state and context 
    const { cart, setCart, setProduct } = useContext(AppContext)
    const [select, setSelect] = useState()
    const [visible, setVisible] = useState(false)
    const [search, setSearch] = useState("")
    const [result, setResult] = useState([...fashion])

    // Pushing cart by using map of item name
    let tem = []
    cart.map((item) => tem.push(item.name))

    // Adding to cart
    const addtocart = item => {
        item['count'] = 1
        setSelect(item)
    }

    // This funtion is for search
    const updateSearch = (text) => {
        if (text.length) {
            setSearch(text)
            let match = []
            fashion.map((item) => {
                if (item.name.toLowerCase().includes(text.toLowerCase())) {
                    match.push(item)
                }
            })
            setResult([...match])
        }
        else {
            setSearch(text)
            setResult(...fashion)
        }
    }

    // Getting values by using name and if else condition for add to cart
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

    // Main code of execution
    return (
        <ThemeConsumer>
            {
                ({ theme }) =>
                    <View style={theme.fashionStyles.mainContainer}>
                        <Header
                            centerComponent={{
                                text: "Fashion",
                                style: theme.fashionStyles.header
                            }}
                            placement="center"
                            rightComponent={{ icon: "search", size: 32, color: "white", onPress: () => setVisible(!visible) }}

                            leftComponent={{ icon: "chevron-left", size: 32, color: "white", onPress: () => navigation.goBack() }}
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
                            <View style={theme.fashionStyles.container}>
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
                                            <View style={theme.fashionStyles.mainContain}>

                                                <View style={theme.fashionStyles.imageConatiner}>
                                                    <TouchableOpacity onPress={() => {
                                                        let temp = item
                                                        if (!temp.count) {
                                                            temp['count'] = 1
                                                        }
                                                        if (item.add == null) {
                                                            item['add'] = false
                                                        }
                                                        setProduct(item),
                                                            navigation.navigate("Product"
                                                            )
                                                    }}>
                                                        <Image
                                                            source={{ uri: item.uri[0] }}
                                                            style={theme.fashionStyles.image}
                                                        />
                                                    </TouchableOpacity>
                                                </View>

                                                <View style={theme.fashionStyles.contain}>
                                                    <View>
                                                        <Text style={theme.fashionStyles.text} onPress={() => { setProduct(item), navigation.navigate("Product") }}>{item.name}</Text>
                                                    </View>

                                                    <View style={theme.fashionStyles.amountContain}>
                                                        <View >
                                                            <Text style={theme.fashionStyles.text}>Rs.{item.amount}</Text>
                                                        </View>

                                                        <View style={theme.fashionStyles.ratingContain}>
                                                            <Text style={theme.fashionStyles.ratingText}>4.1</Text>
                                                            <Icon name="star-half" size={30} style={theme.fashionStyles.ratingStar} />
                                                        </View>

                                                    </View>
                                                    <View >
                                                        <Button
                                                            titleStyle={theme.fashionStyles.title}
                                                            onPress={() => {
                                                                addtocart(item)
                                                                let temp = item
                                                                temp.add = true
                                                                fashion[temp.id - 1] = temp
                                                            }}
                                                            title={item.add ? "Added to Cart" : "Add to Cart"} />
                                                    </View>

                                                </View>
                                            </View>
                                        )
                                    }}
                                />
                                <View style={theme.fashionStyles.gap}>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
            }
        </ThemeConsumer>
    )
}

export default Fashion