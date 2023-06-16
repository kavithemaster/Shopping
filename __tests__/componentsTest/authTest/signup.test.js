import { render, fireEvent } from "@testing-library/react-native";
import SignUp from "../../../src/components/auth/signup";
import { ThemeProvider } from "react-native-elements";
import theme from "../../../src/styles/themes";
import AppContext from "../../../src/shared/context";


jest.mock('axios', () => ({ post: jest.fn(), create: jest.fn() }));

jest.mock('@react-navigation/native', () => {
    const actualNav = jest.requireActual("@react-navigation/native");
    return {
        ...actualNav,
        useNavigation: () => ({
            navigate: jest.fn(),
            goBack: jest.fn(),
        }),
        useIsFocused: () => {
            return true
        },
        isFocused: () => {
            return true
        }
    }
});
test("Signup component", () => {
    const page = render(
        <AppContext.Provider value={' '}>
        <ThemeProvider theme={theme}>
            <SignUp />
        </ThemeProvider>
        </AppContext.Provider> 
    )
    //success
    fireEvent.changeText(page.getByTestId("emailjest"),"kathir@gmail.com")
    fireEvent.changeText(page.getByTestId("usernamejest"),"hjsdgaj")
    fireEvent.changeText(page.getByTestId("phonenumjest"),"9080574409")
    fireEvent.changeText(page.getByTestId("passwordjest"),"hshdfkwjhdfwj")
    fireEvent.changeText(page.getByTestId("comPassjest"),"hshdfkwjhdfwj")
    fireEvent.press(page.getByTestId("eyejest"))
    fireEvent.press(page.getByTestId("eye1jest"))

    fireEvent.press(page.getByTestId("registerjest"))
    fireEvent.press(page.getByTestId("alreadyjest"))

})

test("Signup component error case", () => {
    const page = render(
        <AppContext.Provider value={' ' }>
        <ThemeProvider theme={theme}>
            <SignUp />
        </ThemeProvider>
         </AppContext.Provider>
    )
    //success
    fireEvent.changeText(page.getByTestId("emailjest"),"kat")
    fireEvent.changeText(page.getByTestId("usernamejest"),"hj")
    fireEvent.changeText(page.getByTestId("phonenumjest"),"94409")
    fireEvent.changeText(page.getByTestId("passwordjest"),"c")
    fireEvent.changeText(page.getByTestId("comPassjest"),"c")

    fireEvent.press(page.getByTestId("eyejest"))
    fireEvent.press(page.getByTestId("eye1jest"))

    
    fireEvent.press(page.getByTestId("registerjest"))
    fireEvent.press(page.getByTestId("alreadyjest"))

})