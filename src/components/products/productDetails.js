import React, { useContext, useState } from "react";
import { View, Text, FlatList, ImageBackground, TouchableOpacity, ScrollView } from "react-native";
import { ThemeConsumer, Header, Image, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons"
import AppContext from "../../shared/context";
import UpdateProfile from "../user/updateProfile";

const Product = ({ navigation }) => {

    const { product, setProduct, favourites, setFavourites } = useContext(AppContext)

    const updateFav = (item) => {
        // setProduct((prev) => {
        //     let temp = { ...prev }
        //     temp.fav = !temp.fav
        //     return temp
        // })
        let temp = []
        if (favourites.length) {
            if (favourites.includes(item)) {
                favourites.map((product) => {
                    if (product.id != item.id) {
                        temp.push(product)
                    }
                })
                setFavourites([...temp])
            }
            else {
                setFavourites(pre => [...pre, item])
            }
        }
        else {
            setFavourites(pre => [...pre, item])
        }

    }

    console.log(favourites);
    return (
        <ThemeConsumer>
            {
                ({ theme }) =>
                    <View style={{ backgroundColor: "white", flex: 1 }}>
                        <Header
                            leftComponent={{ icon: "chevron-left", size: 32, onPress: () => navigation.goBack() }}
                        />
                        <ScrollView>
                            <View style={{ marginTop: 10 }}>

                                <Icon
                                    name={product.fav ? "favorite" : "favorite-border"}
                                    size={30}
                                    onPress={() => {
                                        let temp = product
                                        temp.fav = !temp.fav
                                        setProduct(temp)
                                        updateFav(temp)
                                    }}
                                    style={{ color: "black", alignSelf: "flex-end", marginHorizontal: 8 }}
                                />

                                <View style={{ elevation: 40, borderRadius: 10, top: 10 }}>
                                    <Image source={{ uri: product.req }} style={{ width: "96%", height: 280, left: 9 }} />
                                </View>


                                <View style={{ flexDirection: "row", justifyContent: "space-evenly", top: 45 }}>
                                    <View >
                                        <TouchableOpacity style={{ width: 70, borderWidth: 2 }}>
                                            <Text style={{ fontSize: 20, textAlign: "center", color: "black" }}>White</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View >
                                        <TouchableOpacity style={{ width: 70, borderWidth: 2 }}>
                                            <Text style={{ fontSize: 20, textAlign: "center", color: "black" }}>Black</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View >
                                        <TouchableOpacity style={{ width: 70, borderWidth: 2 }}>
                                            <Text style={{ fontSize: 20, textAlign: "center", color: "black" }}>Gray</Text>
                                        </TouchableOpacity>
                                    </View>


                                </View>

                                <View style={{ marginTop: 60 }}>
                                    <Text style={{ fontSize: 20, color: "black", padding: 10 }} >
                                        {product.name}
                                    </Text>
                                </View>


                                <View >
                                    <Text style={{ fontSize: 18, color: "black", padding: 14, justifyContent: "center" }}>
                                        {product.content}
                                    </Text>
                                </View>

                                <View style={{ fontSize: 20, color: "black", padding: 14, justifyContent: "center" }}>
                                    <Text style={{ fontSize: 20, color: "black" }}>
                                        Rs.{product.amount}
                                    </Text>
                                </View>

                                <View >
                                    <Button
                                        title={"Buy it"}
                                        titleStyle={{ fontSize: 20, color: "white" }}
                                        buttonStyle={{ marginHorizontal: 130 }}
                                    />
                                </View>

                                <View style={{ marginBottom: 20 }}>

                                </View>

                            </View>
                        </ScrollView>



                    </View>
            }
        </ThemeConsumer>
    )
}

export default Product