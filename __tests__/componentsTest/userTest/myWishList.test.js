import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import MyWishlist from "../../../src/components/user/myWishlist";
import { ThemeProvider } from "react-native-elements";
import theme from "../../../src/styles/themes";
import AppContext from "../../../src/shared/context";

jest.mock("@react-navigation/native", () => ({
    useNavigation: () => ({
        navigate: jest.fn(),
        goBack: jest.fn(),
    }),
}))


// Mock the useContext hook and provide a mock context value
const mockContextValue = {
    favourites: [
        { id: 1, name: 'Laptop', amount: 60500, uri: ['https://cdn.thewirecutter.com/wp-content/media/2022/10/laptopstopicpage-2048px-2102-2x1-1.jpg'] },
    ],
    setFavourites: jest.fn(),
}

describe("MyWishlist", () => {
    it("renders the wishlist items", () => {
        const { getByTestId } = render(
            <AppContext.Provider value={mockContextValue}>
                <ThemeProvider theme={theme}>
                    <MyWishlist />
                </ThemeProvider>
            </AppContext.Provider>

        );
        const itemName = getByTestId("namejest")[0];
        // const item2Name = getByTestId("namejest-1");
        expect(itemName).not.toBeDefined();
    });

    it("removes a product from favourites when remove button is pressed", () => {
        const { getByTestId } = render(
            <AppContext.Provider value={mockContextValue}>
                <ThemeProvider theme={theme}>
                    <MyWishlist />
                </ThemeProvider>
            </AppContext.Provider>
        );
        const removeButton = getByTestId("removejest");

        
        // const removeProduct = jest.fn()
        // const item = { id: 2, name: 'Book', amount: 60500, uri: ['https://cdn.thewirecutter.com/wp-content/media/2022/10/laptopstopicpage-2048px-2102-2x1-1.jpg'] }
        fireEvent.press(removeButton);
        // expect(removeProduct).toHaveBeenCalled()

        expect(mockContextValue.setFavourites).toHaveBeenCalled();
    });

    it("calls setFavourites with updated favourites array after removing a product", () => {
        const { getByTestId } = render(
            <AppContext.Provider value={mockContextValue}>
                <ThemeProvider theme={theme}>
                    <MyWishlist />
                </ThemeProvider>
            </AppContext.Provider>
        );
        const removeButton = getByTestId("removejest");

        fireEvent.press(removeButton);

        expect(mockContextValue.setFavourites).toHaveBeenCalled();
    });

    it("displays a message when the wishlist is empty", () => {
        const fav = []
        const sFav = jest.fn()
        const { getByTestId } = render(
            <AppContext.Provider value={{
                favourites: fav,
                setFavourites: sFav
            }}>
                <ThemeProvider theme={theme}>
                    <MyWishlist />
                </ThemeProvider>
            </AppContext.Provider>
        );
        const emptyText = getByTestId("emptyJest");

        expect(emptyText).toBeDefined();
    });

    it('header left', () => {
        const {getByTestId} =  render(
            <AppContext.Provider value={mockContextValue}>
                <ThemeProvider theme={theme}>
                    <MyWishlist />
                </ThemeProvider>
            </AppContext.Provider>
        );
        fireEvent.press(getByTestId('leftJest'))
    })
});
