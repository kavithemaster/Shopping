import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, ScrollView } from "react-native";
import { ThemeConsumer, Header, Button, SearchBar } from "react-native-elements";
import Icon from 'react-native-vector-icons/MaterialIcons'
import Data from "../../assets/data/swiper.json"
import AppContext from "../../shared/context";

const Mobiles = ({ navigation }) => {

    const mobiles = Data.mobiles

    const { cart, setCart, setProduct } = useContext(AppContext)
    const [select, setSelect] = useState()
    const [visible, setVisible] = useState(false)
    const [search, setSearch] = useState("")
    const [result, setResult] = useState([...mobiles])

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
                    <View style={theme.mobileStyles.mainContainer}>
                        <Header
                            centerComponent={{
                                text: "Mobiles",
                                style: theme.mobileStyles.header
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
                            <View style={theme.mobileStyles.container}>
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
                                            <View style={theme.mobileStyles.mainContain}>

                                                <View style={theme.mobileStyles.imageConatiner}>
                                                    <TouchableOpacity onPress={() => { setProduct(item), navigation.navigate("Product") }}>
                                                        <Image
                                                            source={{ uri: item.req }}
                                                            style={theme.mobileStyles.image}
                                                        />
                                                    </TouchableOpacity>
                                                </View>

                                                <View style={theme.mobileStyles.contain}>
                                                    <View>
                                                        <Text style={theme.mobileStyles.text} onPress={() => { setProduct(item), navigation.navigate("Product") }}>{item.name}</Text>
                                                    </View>

                                                    <View style={theme.mobileStyles.amountContain}>
                                                        <View >
                                                            <Text style={theme.mobileStyles.text}>Rs.{item.amount}</Text>
                                                        </View>

                                                        <View style={theme.mobileStyles.ratingContain}>
                                                            <Text style={theme.mobileStyles.ratingText}>4.1</Text>
                                                            <Icon name="star-half" size={30} style={theme.mobileStyles.ratingStar} />
                                                        </View>

                                                    </View>
                                                    <View >
                                                        <Button
                                                            titleStyle={theme.mobileStyles.title}
                                                            onPress={() => addtocart(item)}
                                                            title={"Add to Cart"} />
                                                    </View>

                                                </View>
                                            </View>
                                        )
                                    }}
                                />
                                <View style={theme.mobileStyles.gap}>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
            }
        </ThemeConsumer>
    )
}



export default Mobiles