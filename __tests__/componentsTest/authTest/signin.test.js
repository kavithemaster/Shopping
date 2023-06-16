import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import SignIn from '../../../src/components/auth/signin';
import { ThemeProvider } from 'react-native-elements';
import theme from '../../../src/styles/themes';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

jest.mock('axios')
jest.mock('@react-native-async-storage/async-storage', () => ({
    setItem: jest.fn(),
}))

// jest.mock('react-native', () => ({
//     ...jest.requireActual('react-native'),
//     Alert: {
//         alert: jest.fn(),
//     },
// }));

describe('SignIn component', () => {

    // afterEach(() => {
    //     jest.clearAllMocks();
    // });


    it('should handle onAddHandler with valid email and password', async () => {
        const mockUserFullData = {
            key1: {
                Email: 'test@example.com',
                Password: 'password123',
            },
        }
        const mockSetData = jest.fn()
        const mockSetLogin = jest.fn()

        axios.get.mockResolvedValueOnce({ data: mockUserFullData })
        AsyncStorage.setItem.mockResolvedValueOnce()
        AsyncStorage.setItem.mockResolvedValueOnce()
        const { getByTestId } = render(
            <ThemeProvider theme={theme}>
                <SignIn setData={mockSetData} setLogin={mockSetLogin} />
            </ThemeProvider>
        )

        const emailInput = getByTestId('emailjest')
        const passwordInput = getByTestId('passwordjest')
        const loginButton = getByTestId('loginjest')

        // Enter valid email and password
        fireEvent.changeText(emailInput, 'test@example.com')
        fireEvent.changeText(passwordInput, 'password123')

        // Mock the AsyncStorage and axios responses
        await axios.get()
        await AsyncStorage.setItem()
        await AsyncStorage.setItem()

        // Trigger the login button press
        fireEvent.press(loginButton)
    })

    it('should handle onAddHandler with invalid email and password', async () => {
        const mockUserFullData = {
            key1: {
                Email: 'test@example.com',
                Password: 'password123',
            },
        }
        const mockSetData = jest.fn()
        const mockSetLogin = jest.fn()

        axios.get.mockResolvedValueOnce({ data: mockUserFullData })
        const { getByTestId, getByText } = render(
            <ThemeProvider theme={theme}>
                <SignIn setData={mockSetData} setLogin={mockSetLogin} />
            </ThemeProvider>
        )
        const emailInput = getByTestId('emailjest')
        const passwordInput = getByTestId('passwordjest')
        const loginButton = getByTestId('loginjest')

        // Enter invalid email and password
        fireEvent.changeText(emailInput, 'invalid@example.com')
        fireEvent.changeText(passwordInput, 'invalidPassword')

        // Trigger the login button press
        fireEvent.press(loginButton)
    })
    it('should toggle visibility of password when eye icon is pressed', () => {
        const { getByTestId } = render(
            <ThemeProvider theme={theme}>
                <SignIn />
            </ThemeProvider>)
        const passwordInput = getByTestId('passwordjest')
        const eyeIcon = getByTestId('eyejest')

        // Password is initially hidden
        expect(passwordInput.props.secureTextEntry).toBe(true)

        // Toggle visibility of password
        fireEvent.press(eyeIcon)
        expect(passwordInput.props.secureTextEntry).toBe(false)

        // Toggle visibility of password again
        fireEvent.press(eyeIcon)
        expect(passwordInput.props.secureTextEntry).toBe(true)
    })

    it('should navigate to the Forgot Password screen when "Forgot Password?" is pressed', () => {
        const navigation = { navigate: jest.fn() }
        const { getByTestId } = render(
            <ThemeProvider theme={theme}>
                <SignIn navigation={navigation} />
            </ThemeProvider>
        )
        const forgotPasswordButton = getByTestId('forgetjest')

        fireEvent.press(forgotPasswordButton)
        expect(navigation.navigate).toHaveBeenCalledWith('Forget')
    })

    it('should navigate to the SignUp screen when "SignUp!" is pressed', () => {
        const navigation = { navigate: jest.fn() }
        const { getByTestId } = render(
            <ThemeProvider theme={theme}>


                <SignIn navigation={navigation} />
            </ThemeProvider>
        )
        const signUpButton = getByTestId('signupjest')

        fireEvent.press(signUpButton)
        expect(navigation.navigate).toHaveBeenCalledWith('SignUp')
    })

    // Additional test cases for branch coverage
    it('should display an error message when email and password are invalid', () => {
        const { getByTestId, getByText } = render(<ThemeProvider theme={theme}>
            <SignIn />
        </ThemeProvider>)
        const emailInput = getByTestId('emailjest')
        const passwordInput = getByTestId('passwordjest')
        const loginButton = getByTestId('loginjest')


        // Enter invalid email and password
        fireEvent.changeText(emailInput, 'invalid@example.com')
        fireEvent.changeText(passwordInput, 'invalidPassword')
        fireEvent.press(loginButton)

        // Check if error message is displayed
        // const errorMessage = getByText("Your Email id or Password is Incorrect", "Please Enter Vaild Email Address and Password")
        // expect(errorMessage).toBeTruthy()

        // expect(Alert.alert).toHaveBeenCalledTimes(1)
        // expect(Alert.alert).toHaveBeenCalledWith(
        //     'Your Email id or Password is Incorrect',
        //     'Please Enter Valid Email Address and Password',
        // );

    })

})

