import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, ScrollView } from "react-native";
import { ThemeConsumer, Header, Button, SearchBar } from "react-native-elements";
import Icon from 'react-native-vector-icons/MaterialIcons'
import Data from "../../assets/data/swiper.json"
import AppContext from "../../shared/context";

const Grocery = ({ navigation }) => {

    const grocery = Data.grocery

    const { cart, setCart, setProduct } = useContext(AppContext)
    const [select, setSelect] = useState()
    const [visible, setVisible] = useState(false)
    const [search, setSearch] = useState("")
    const [result, setResult] = useState([...grocery])

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
            grocery.map((item) => {
                if (item.name.toLowerCase().includes(text.toLowerCase())) {
                    match.push(item)
                }
            })
            setResult([...match])
        }
        else {
            setSearch(text)
            setResult(...grocery)
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
                    <View style={theme.groceryStyles.mainContainer}>
                        <Header
                            centerComponent={{
                                text: "Grocery",
                                style: theme.groceryStyles.header
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
                            <View style={theme.groceryStyles.container}>
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
                                            <View style={theme.groceryStyles.mainContain}>

                                                <View style={theme.groceryStyles.imageConatiner}>
                                                    <TouchableOpacity onPress={() => {
                                                        let temp = item
                                                        if (!temp.count) {
                                                            temp['count'] = 1
                                                        }
                                                        if(item.add == null){
                                                            item['add'] = false
                                                        }
                                                        setProduct(item),
                                                            navigation.navigate("Product")
                                                    }}>
                                                        <Image
                                                            source={{ uri: item.req }}
                                                            style={theme.groceryStyles.image}
                                                        />
                                                    </TouchableOpacity>
                                                </View>

                                                <View style={theme.groceryStyles.contain}>
                                                    <View>
                                                        <Text style={theme.groceryStyles.text} onPress={() => { setProduct(item), navigation.navigate("Product") }}>{item.name}</Text>
                                                    </View>

                                                    <View style={theme.groceryStyles.amountContain}>
                                                        <View >
                                                            <Text style={theme.groceryStyles.text}>Rs.{item.amount}</Text>
                                                        </View>

                                                        <View style={theme.groceryStyles.ratingContain}>
                                                            <Text style={theme.groceryStyles.ratingText}>4.1</Text>
                                                            <Icon name="star-half" size={30} style={theme.groceryStyles.ratingStar} />
                                                        </View>

                                                    </View>
                                                    <View >
                                                        <Button
                                                            titleStyle={theme.groceryStyles.title}
                                                            onPress={() => {addtocart(item)  
                                                                let temp = item
                                                                temp.add = true
                                                                grocery[temp.id - 1] = temp
                                                            }}
                                                            title={item.add ? "Added to Cart" : "Add to Cart"} />
                                                    </View>

                                                </View>
                                            </View>
                                        )
                                    }}
                                />
                                <View style={theme.groceryStyles.gap}>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
            }
        </ThemeConsumer>
    )
}



export default Grocery