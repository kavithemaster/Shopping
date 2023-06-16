import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Electronics from '../../../src/components/products/electronics';
import { ThemeProvider } from 'react-native-elements';
import theme from '../../../src/styles/themes';
import AppContext from '../../../src/shared/context';

jest.mock("@react-navigation/native", () => ({
    useNavigation: () => ({
        navigate: jest.fn(),
        goBack: jest.fn(),
    }),
}))


const mockContextValue = {
    cart: [
        { id: 1, name: 'Laptop', amount: 60500, uri: ['https://cdn.thewirecutter.com/wp-content/media/2022/10/laptopstopicpage-2048px-2102-2x1-1.jpg'] },
        { id: 2, name: 'Speaker', amount: 15000, uri: ["https://thumbs.dreamstime.com/b/white-speakers-1755235.jpg"] },
    ],
    setCart: jest.fn(),
    setProduct: jest.fn(),
}

describe('Electronics Component', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })


    it("toggles visibility of search bar", () => {
        const { getByTestId } = render(
            <AppContext.Provider value={mockContextValue}>
                <ThemeProvider theme={theme}>
                    <Electronics />
                </ThemeProvider>
            </AppContext.Provider>
        )

        const rightIcon = getByTestId('rightIconJest')
        fireEvent.press(rightIcon)

        const searchBar = getByTestId('searchjest')
        expect(searchBar).toBeTruthy()
    })

    it("updates search text success case", () => {
        const { getByTestId, queryByPlaceholderText } = render(
            <AppContext.Provider value={mockContextValue}>
                <ThemeProvider theme={theme}>
                    <Electronics />
                </ThemeProvider>
            </AppContext.Provider>
        )

        const toggleButton = getByTestId('rightIconJest')
        const searchInput = queryByPlaceholderText("Search Here")

        expect(searchInput).toBeNull()

        fireEvent.press(toggleButton)
        const searchText = getByTestId('searchjest')

        expect(queryByPlaceholderText("Search Here")).toBeTruthy()

        fireEvent.changeText(searchText, 'Laptop')


    })


    it("updates search text failer case", () => {
        const { getByTestId, queryByPlaceholderText } = render(
            <AppContext.Provider value={mockContextValue}>
                <ThemeProvider theme={theme}>
                    <Electronics />
                </ThemeProvider>
            </AppContext.Provider>
        )

        const toggleButton = getByTestId('rightIconJest')
        const searchInput = queryByPlaceholderText("Search Here")

        expect(searchInput).toBeNull()

        fireEvent.press(toggleButton)
        const searchText = getByTestId('searchjest')

        expect(queryByPlaceholderText("Search Here")).toBeTruthy()

        fireEvent.changeText(searchText, '')

    })


    it("navigates to the product details screen", () => {
        const ind = [0, 1]
        const { getByTestId } = render(
            <AppContext.Provider value={mockContextValue}>
                <ThemeProvider theme={theme}>
                    <Electronics />
                </ThemeProvider>
            </AppContext.Provider>
        )

        ind.map((i) => {
            const productText = getByTestId('textjest' + i.toString())
            fireEvent.press(productText)

            expect(mockContextValue.setProduct).toHaveBeenCalled()
        })
    })

    it("adds item to cart", () => {
        const ind = [0, 1]
        const { getByTestId } = render(
            <AppContext.Provider value={mockContextValue}>
                <ThemeProvider theme={theme}>
                    <Electronics />
                </ThemeProvider>
            </AppContext.Provider>
        )

        ind.map((i) => {
            const addButton = getByTestId('buttons' + i.toString())
            fireEvent.press(addButton)

            expect(mockContextValue.setCart).toHaveBeenCalled()
        })
    })
    it("useEffect function for add to cart ", () => {
        const ind = [0]
        const setSelect = jest.fn()
        const { getByTestId } = render(
            <AppContext.Provider value={mockContextValue}>
                <ThemeProvider theme={theme}>
                    <Electronics />
                </ThemeProvider>
            </AppContext.Provider>
        )


        ind.map((i) => {
            const addButton = getByTestId('buttons' + i.toString())
            fireEvent.press(addButton)
        })


        // ind.map((i) => {
        //     const success = getByTestId('buttons' + i.toString())
        //     fireEvent.press(success)
        //     expect(mockContextValue.setCart).toHaveBeenCalledWith(mockContextValue.cart[i])
        // })

        const success = getByTestId('buttons0')
            fireEvent.press(success)
            expect(mockContextValue.setCart).toHaveBeenCalledWith({})


        setSelect(null)

        const failure = getByTestId('buttons0')
            fireEvent.press(failure)
            expect(mockContextValue.setCart).toHaveBeenCalledWith({"amount": 60500, "id": 2, "name": "Laptop", "uri": ["https://cdn.thewirecutter.com/wp-content/media/2022/10/laptopstopicpage-2048px-2102-2x1-1.jpg"]})


        // ind.map((i) => {
        //     const failer = getByTestId('buttons' + i.toString())
        //     fireEvent.press(failer)
        //     expect(mockContextValue.setCart).toHaveBeenCalledWith(mockContextValue.cart[i])
        // })


    })

    it("navigates back", () => {
        const { getByTestId } = render(
            <AppContext.Provider value={mockContextValue}>
                <ThemeProvider theme={theme}>
                    <Electronics />
                </ThemeProvider>
            </AppContext.Provider>
        )

        const leftIcon = getByTestId('leftIconJest')
        fireEvent.press(leftIcon)

        expect(mockContextValue.setCart).not.toHaveBeenCalled()
        expect(mockContextValue.setProduct).not.toHaveBeenCalled()
    })
    it("navigates of clicking images", () => {
        const ind = [0, 1]
        const { getByTestId } = render(
            <AppContext.Provider value={mockContextValue}>
                <ThemeProvider theme={theme}>
                    <Electronics />
                </ThemeProvider>
            </AppContext.Provider>
        )

        ind.map((i) => {
            const addButton = getByTestId('pdtjest' + i.toString())
            fireEvent.press(addButton)
            expect(mockContextValue.setCart).not.toHaveBeenCalled()
        })
    })

})















































// import React ,{ useEffect } from 'react'
// import { render, fireEvent } from '@testing-library/react-native'
// import Electronics from '../../src/components/products/electronics'
// import { ThemeProvider } from 'react-native-elements'
// import theme from '../../src/styles/themes'
// import Data from '../../src/assets/data/swiper.json'
// import AppContext from '../../src/shared/context'



// // Mock the necessary dependencies
// const mockContext = {
//     cart: [],
//     setCart: jest.fn(),
//     setProduct: jest.fn(),
// }

// jest.mock('react', () => ({
//     ...jest.requireActual('react'),
//     useEffect: jest.fn(),
// }))

// jest.mock('axios', () => ({ post: jest.fn(), create: jest.fn() }))

// jest.mock('@react-navigation/native', () => {
//     const actualNav = jest.requireActual("@react-navigation/native")
//     return {
//         ...actualNav,
//         useNavigation: () => ({
//             navigate: jest.fn(),
//             goBack: jest.fn(),
//         }),
//         useIsFocused: () => {
//             return true
//         },
//         isFocused: () => {
//             return true
//         }
//     }
// })
// // Set up dummy data
// const mockElectronics = Data.electronics

// describe('Electronics component', () => {
//     it('renders without error', () => {
//         render(
//             <AppContext.Provider value={mockContext}>
//                 <ThemeProvider theme={theme}>
//                     <ThemeProvider theme={theme}><Electronics /></ThemeProvider>
//                 </ThemeProvider>
//             </AppContext.Provider>
//         )
//         // Add assertions to verify that the component renders as expected
//     })

//     it('displays electronic items', () => {
//         // Mock the data for electronics
//         Data.electronics = [
//             { id: 1, name: 'Laptop', amount: 1000, uri: ['laptop.jpg'] },
//             { id: 2, name: 'Phone', amount: 500, uri: ['phone.jpg'] },
//         ]

//         const { getByText } = render(
//             <AppContext.Provider value={mockContext}>
//                 <ThemeProvider theme={theme}>
//                     <ThemeProvider theme={theme}><Electronics /></ThemeProvider>
//                 </ThemeProvider>
//             </AppContext.Provider>
//         )

//         // Add assertions to verify that the electronic items are displayed correctly
//         expect(getByText('Laptop')).toBeDefined()
//         expect(getByText('Phone')).toBeDefined()

//         // Restore the original data
//         Data.electronics = mockElectronics
//     })

//     it('adds an item to the cart when "Add to Cart" button is clicked', () => {
//         // Mock the data for an electronic item
//         const electronicItem = {
//             id: 1,
//             name: 'Laptop',
//             amount: 1000,
//             uri: ['laptop.jpg'],
//         }

//         const { getByTestId } = render(
//             <AppContext.Provider value={mockContext}>
//                 <ThemeProvider theme={theme}>
//                     <ThemeProvider theme={theme}><Electronics /></ThemeProvider>
//                 </ThemeProvider>
//             </AppContext.Provider>
//         )

//         // Find the "Add to Cart" button and click it
//         const addToCartButton = getByTestId('buttons')
//         fireEvent.click(addToCartButton)

//         // Add assertions to verify that the item is added to the cart
//         expect(AppContext.setCart).toHaveBeenCalledWith([electronicItem])
//     })

//     // it('should update cart state correctly', () => {
//     //     // Mock the necessary variables and functions used in the code snippet
//     //     const select = {
//     //         id: 1,
//     //         name: 'Product 1',
//     //         count: 10,
//     //     }
//     //     const cart = [
//     //         { id: 1, name: 'Product 1', count: 5 },
//     //         { id: 2, name: 'Product 2', count: 3 },
//     //     ]
//     //     const setCart = jest.fn()

//     //     // Render the component that uses the hook
//     //     const ComponentWithEffect = () => {
//     //         useEffect(() => {
//     //             // Place the code snippet inside the useEffect callback
//     //             // Make sure to replace setCart with the mocked function
//     //             if (select) {
//     //                 if (cart.length) {
//     //                     let flag = false
//     //                     cart.map((item) => {
//     //                         if (item.name === select.name) {
//     //                             flag = true
//     //                         }
//     //                     })
//     //                     if (flag) {
//     //                         let temp = []
//     //                         cart.map((item) => {
//     //                             if (item.id === select.id) {
//     //                                 let prod = item
//     //                                 prod.count = select.count
//     //                                 temp.push(prod)
//     //                             } else {
//     //                                 temp.push(item)
//     //                             }
//     //                         })
//     //                         setCart(temp)
//     //                     } else {
//     //                         setCart((pre) => [...pre, select])
//     //                     }
//     //                 } else {
//     //                     setCart((pre) => [...pre, select])
//     //                 }
//     //             }
//     //         }, [select])

//     //         return null // You can return your component here if applicable
//     //     }

//     //     // Render the component and trigger the useEffect callback
//     //     act(() => {
//     //         render(<ComponentWithEffect />)
//     //     })

//     //     // Assert that the setCart function was called with the expected values
//     //     expect(setCart).toHaveBeenCalledTimes(1)
//     //     expect(setCart).toHaveBeenCalledWith([
//     //         { id: 1, name: 'Product 1', count: 10 },
//     //         { id: 2, name: 'Product 2', count: 3 },
//     //     ])
//     // })

//     // Add more test cases to cover other functionality and user interactions

// })

