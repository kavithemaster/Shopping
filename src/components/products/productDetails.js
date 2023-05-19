import React, { useContext, useEffect, useState } from "react";
import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import { ThemeConsumer, Header, Image, Button } from "react-native-elements";
import Icon from "react-native-vector-icons/MaterialIcons"
import AppContext from "../../shared/context";

const Product = ({ navigation }) => {
    
    // Getting and storing values by using useContext and using useState
    const { product, setProduct, favourites, setFavourites, cart, setCart } = useContext(AppContext)
    const [index, setIndex] = useState(0)

    // Changing name for Add to Added (to cart)
    const [exist, setExist] = useState(false)

    // Changing color for imgae and chaning
    const colors = [
        // "white", "grey", "black"
        {
            label: "white",
            bgcolor: "white",
            color: "black",
            active: false
        },
        {
            label: "grey",
            bgcolor: "grey",
            color: "white",
            active: false
        },
        {
            label: "black",
            bgcolor: "black",
            color: "white",
            active: false
        }
    ]


    // Using map for setExit state
    useEffect(() => {
        cart.map((item) => {
            if(item == product) {
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
                    <View style={theme.productDetails.mainContainer}>
                        <Header
                            leftComponent={{ icon: "chevron-left", size: 32, color:"white", onPress: () => navigation.goBack() }}

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
                                                            <TouchableOpacity key={ind} style={[theme.productDetails.opacity, {backgroundColor: item.bgcolor, borderColor: item.active ? "blue" : "white"}]} onPress={() => {
                                                                setIndex(ind)
                                                                let temp = []
                                                                colors.map((item, i) => {
                                                                    if(i == ind){
                                                                        item.active = !item.active
                                                                        temp.push(item)
                                                                    }
                                                                    else {
                                                                        
                                                                        item.active = !item.active
                                                                        temp.push(item)
                                                                    }
                                                                })
                                                                // colors = temp
                                                                console.log(temp)
                                                            }}>
                                                                <Text style={[theme.productDetails.text, {color: item.color}]}>{item.label}</Text>
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
                                        onPress={() => {addToCart()}}
                                        
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