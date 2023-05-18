import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { ThemeConsumer, Header, Image, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons"
import AppContext from "../../shared/context";

const Product = ({ navigation }) => {

    const { product, setProduct, favourites, setFavourites, cart, setCart } = useContext(AppContext)

    const colors = ["white", "grey", "black"]

    const [index, setIndex] = useState(0)

    const updateFav = (item) => {
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

    const addToCart = () => {
        if (cart.length) {
            let flag = false
            cart.map((item) => {
                if (item.name == product.name) {
                    flag = true
                }
            })
            if (flag) {
                let temp = []
                cart.map((item) => {
                    if (item.id == product.id) {
                        let prod = item
                        prod.count = product.count
                        temp.push(prod)
                    }
                    else {
                        temp.push(item)
                    }
                })
                setCart(temp)
            }
            else {
                setCart(pre => [...pre, product])
            }
        }
        else {
            setCart(pre => [...pre, product])
        }
    }



    return (
        <ThemeConsumer>
            {
                ({ theme }) =>
                    <View style={theme.productDetails.mainContainer}>
                        <Header
                            leftComponent={{ icon: "chevron-left", size: 32, onPress: () => navigation.goBack() }}

                        />
                        <ScrollView>
                            <View style={theme.productDetails.container}>

                                <Icon
                                    name={product.fav ? "favorite" : "favorite-border"}
                                    size={30}
                                    onPress={() => {
                                        let temp = product
                                        temp.fav = !temp.fav
                                        setProduct(temp)
                                        updateFav(temp)
                                    }}
                                    style={theme.productDetails.icon}
                                />

                                <View style={theme.productDetails.imgaeContain}>
                                    <Image source={{ uri: product.uri[index] }} style={theme.productDetails.image} />
                                </View>


                                {
                                    (product.disabled) ? null :
                                        <View style={theme.productDetails.topContent}>
                                         
                                                {
                                                    colors.map((item, ind) => {
                                                        return (
                                                            <TouchableOpacity style={theme.productDetails.opacity} onPress={() => setIndex(ind)}>
                                                                <Text style={theme.productDetails.text}>{item}</Text>
                                                            </TouchableOpacity>
                                                        )
                                                    })
                                                }
                                      
                                        </View>
                                }


                                <View style={theme.productDetails.nameContain}>
                                    <Text style={theme.productDetails.nameText} >
                                        {product.name}
                                    </Text>
                                </View>


                                <View >
                                    <Text style={theme.productDetails.contentText}>
                                        {product.content}
                                    </Text>
                                </View>

                                <View style={theme.productDetails.amountContain}>
                                    <Text style={theme.productDetails.nameText}>
                                        Rs.{product.amount}
                                    </Text>
                                </View>

                                <View >
                                    <Button
                                        title={"Add to Cart"}
                                        titleStyle={theme.productDetails.title}
                                        buttonStyle={theme.productDetails.button}
                                        onPress={() => addToCart()}
                                    />
                                </View>

                                <View style={theme.productDetails.gap}>

                                </View>

                            </View>
                        </ScrollView>



                    </View>
            }
        </ThemeConsumer>
    )
}

export default Product