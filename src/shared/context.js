import { createContext } from "react";

const AppContext = createContext({
    cart:{},
    setCart:() =>{},
    product: {},
    setProduct: () => {},
    favourites:{},
    setFavourites:()=>{},
})

export default AppContext