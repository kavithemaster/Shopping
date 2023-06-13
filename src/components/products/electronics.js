import React, { useContext, useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity, ScrollView } from "react-native";
import { ThemeConsumer, Header, Button, SearchBar } from "react-native-elements";
import Icon from 'react-native-vector-icons/MaterialIcons'
import Data from "../../assets/data/swiper.json"
import AppContext from "../../shared/context";

const Electronics = ({ navigation }) => {

    // Getting values from  json
    const electronics = Data.electronics

    // Using state and context  
    const { cart, setCart, setProduct } = useContext(AppContext)
    const [select, setSelect] = useState()
    const [visible, setVisible] = useState(false)
    const [search, setSearch] = useState("")
    const [result, setResult] = useState([...electronics])

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
                    <View style={{ backgroundColor: "white" }}>
                        <Header
                            centerComponent={{
                                text: "Electronics",
                                style: theme.electronicStyles.header
                            }}
                            placement="center"
                            rightComponent={{ icon: "search", size: 32, color: "white", onPress: () => setVisible(!visible), }}
                            leftComponent={{ icon: "chevron-left", size: 32, color: "white", onPress: () => navigation.goBack() }}
                            testID="headerjest"
                        />

                        {
                            visible ? <View>
                                <SearchBar lightTheme
                                    placeholder="Search Here"
                                    placeholderTextColor="black"
                                    round
                                    value={search}
                                    onChangeText={(text) => updateSearch(text)}
                                    testID="searchjest"
                                />
                            </View> : null
                        }
                        <ScrollView>
                            <View style={{ marginTop: 30 }}>
                                <FlatList
                                    data={result}
                                    scrollEnabled={false}
                                    keyExtractor={item => item.id}
                                    testID="flatlistjest"
                                    renderItem={({ item }) => {
                                        if (item.fav == null) {
                                            item['fav'] = false
                                        }
                                        if (item.add == null) {
                                            item['add'] = false
                                        }

                                        return (
                                            //Main View                                          
                                            <View style={theme.electronicStyles.mainContain}>

                                                <View style={theme.electronicStyles.imageConatiner}>
                                                    <TouchableOpacity 
                                                    testID="pdtjest"
                                                    onPress={() => {
                                                        let temp = item
                                                        if (!temp.count) {
                                                            temp['count'] = 1
                                                        }
                                                        setProduct(temp),
                                                            navigation.navigate("Product")
                                                    }}                                                    
                                                    >
                                                        <Image
                                                            source={{ uri: item.uri[0] }}
                                                            style={theme.electronicStyles.image}
                                                            testID="imgjest"
                                                        />
                                                    </TouchableOpacity>
                                                </View>

                                                <View style={theme.electronicStyles.contain}>
                                                    <View>
                                                        <Text style={theme.electronicStyles.text} onPress={() => { setProduct(item), navigation.navigate("Product") }} testID="textjest">{item.name}</Text>
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
                                                            onPress={() => {
                                                                addtocart(item)
                                                                let temp = item
                                                                temp.add = true
                                                                electronics[temp.id - 1] = temp
                                                            }}
                                                            title={item.add ? "Added to Cart" : "Add to Cart"} 
                                                            testID="btnjest"
                                                            />
                                                    </View>

                                                </View>
                                            </View>
                                        )
                                    }}
                                />
                                <View style={theme.electronicStyles.gap}>
                                </View>
                            </View>
                        </ScrollView>
                    </View>
            }
        </ThemeConsumer>
    )
}

export default Electronics