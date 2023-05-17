import { createContext } from "react";

const AppContext = createContext({
    cart:{},
    setCart:() =>{},
    product: {},
    setProduct: () => {},
    favourites:{},
    setFavourites:()=>{},
    data: {},
    setData: () => {},
    load: {},
    setLoad: () => {},
    login: {},
    setLogin: () => {}
})

export default AppContext