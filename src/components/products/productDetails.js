import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { ThemeConsumer, Header, Image, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons"
import AppContext from "../../shared/context";

let colors = [
    {
        label: "White",
        bgcolor: "white",
        color: "black",
        active: true,
        
    },
    {
        label: "Gray",
        bgcolor: "white",
        color: "black",
        active: false
    },
    {
        label: "Black",
        bgcolor: "white",
        color: "black",
        active: false
    }
]

const Product = ({ navigation }) => {

    // Getting and storing values by using useContext and using useState
    const { product, setProduct, favourites, setFavourites, cart, setCart } = useContext(AppContext)
    const [index, setIndex] = useState(0)

    // Changing name for Add to Added (to cart)
    const [exist, setExist] = useState(false)
    // Changing color for imgae and chaning



    // Using map for setExit state
    useEffect(() => {
        cart.map((item) => {
            if (item == product) {
                setExist(true)
            }
        })
    }, [])


    // updating favourites by using useContext
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

    // Adding cart function
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


    // Main Function code execution
    return (
        <ThemeConsumer>
            {
                ({ theme }) =>
                    <View style={theme.productDetails.mainContainer}
                    testID="productDetailsTest"
                    >
                        <Header
                            leftComponent={{ icon: "chevron-left",testID:'backTest', size: 32, color: "white", onPress: () => navigation.goBack() }}
                        />
                        <ScrollView>
                            <View style={theme.productDetails.container} testID="productDetailsTest1">

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
                                    testID="favIconTest"
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
                                                        <TouchableOpacity key={ind} style={[theme.productDetails.opacity, { backgroundColor: item.bgcolor, borderColor: !item.active ? "black" : "blue" }]} onPress={() => {
                                                            setIndex(ind)
                                                            let temp = []
                                                            colors.map((item, i) => {
                                                                if (i == ind) {
                                                                    item.active = !item.active
                                                                    temp.push(item)
                                                                }
                                                                else {
                                                                    if (item.active) {
                                                                        item.active = !item.active
                                                                        temp.push(item)
                                                                    }
                                                                    else {
                                                                        temp.push(item)
                                                                    }
                                                                }
                                                            })
                                                            colors = [...temp]
                                                        }}
                                                        testID="colorTest"
                                                        >
                                                            <Text style={[theme.productDetails.text, { color: item.color }]} >{item.label}</Text>
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
                                        title={exist ? "Added to cart" : "Add to Cart"}
                                        titleStyle={theme.productDetails.title}
                                        buttonStyle={theme.productDetails.button}
                                        onPress={() => { addToCart() }}
                                        testID="addToTest"
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