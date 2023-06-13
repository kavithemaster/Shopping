import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import SignIn from '../src/components/auth/signin'
import { ThemeProvider } from 'react-native-elements'
import theme from '../src/styles/themes'
import AppContext from '../src/shared/context'

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

describe('SignIn component', () => {
    test('should render and handle login success', async() => {
        const { getByTestId } = render(
            <ThemeProvider theme={theme}>
                {/* <AppContext.Provider value={{setLoad: ()=>{}}}> */}
                <SignIn />
                {/* </AppContext.Provider> */}
            </ThemeProvider>)

        const emailInput = getByTestId('emailjest')
        // const emailInput1 = getByTestId('emailjest')
        const passwordInput = getByTestId('passwordjest')
        const loginButton = getByTestId('loginjest')
        const eyeIcon = getByTestId('eyejest')

        fireEvent.changeText(emailInput, 'text@gmail.com')
        // fireEvent.changeText(emailInput1, 'hu')
        fireEvent.changeText(passwordInput, 'password')
        fireEvent.press(loginButton)
        fireEvent.press(eyeIcon)
    })
    test('should render and handle login failer', () => {
        const { getByTestId } = render(
            <ThemeProvider theme={theme}>
                {/* <AppContext.Provider value={' '}> */}
                <SignIn />
                {/* </AppContext.Provider> */}
            </ThemeProvider>)

        const emailInput = getByTestId('emailjest')
        fireEvent.changeText(emailInput, 'm')

    })
})



























// import React from "react"
// import SignIn from "../src/components/auth/signin"
// import { fireEvent, render } from "@testing-library/react-native"
// import { ThemeProvider } from "react-native-elements"
// import theme from "../src/styles/themes"
// import AppContext from "../src/shared/context"
// import AsyncStorage from "@react-native-async-storage/async-storage"

// describe('signin', () => {
//     it('updates text input', () => {
//         const { getByTestId } = render(<ThemeProvider theme={theme}><SignIn /></ThemeProvider>)
//         const inputElement = getByTestId('emailjest')
//         fireEvent.changeText(inputElement, 'Email')
//         expect(inputElement.props.value).toBe('Email')
//     })
//     it(' updates text input one ', () => {
//         const { getByTestId } = render(<ThemeProvider theme={theme}><SignIn /></ThemeProvider>)
//         const inputElement1 = getByTestId('passwordjest')
//         fireEvent.changeText(inputElement1, 'Password')
//         expect(inputElement1.props.value).toBe('Password')
//     })
//     it('navigation', () => {
//         const {getByTestId} = render(
//             <ThemeProvider theme={theme}>
//                 <AppContext.Provider value={' '}>
//                     <SignIn />
//                 </AppContext.Provider>
//             </ThemeProvider>)
//         fireEvent.press(getByTestId('forgetjest'))
//         fireEvent.press(getByTestId('loginjest'))
//         fireEvent.press(getByTestId('signupjest'))
//         fireEvent.press(getByTestId('eyejest'))
//         // AsyncStorage.getItem = jest.fn().mockResolvedValue()
//         // const setUserData = jest.fn()
//         // const setUserFullKey = jest.fn()
//         // expect(setUserData).toHaveBeenCalledWith(null)
//         // expect(setUserFullKey).toHaveBeenCalledWith(false)
//         // expect(AsyncStorage.setItem).toHaveBeenCalledWith('userKey')
//     })
// })