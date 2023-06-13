import React from 'react'
import { render, fireEvent, waitFor } from '@testing-library/react-native'
import axios from 'axios'
import MyCart from '../src/components/myCart'
import { ThemeProvider } from 'react-native-elements'
import theme from '../src/styles/themes'
import AppContext from '../src/shared/context'

jest.mock('axios')

describe('MyCart', () => {
    it("Mock Request (post)", async () => {
        const requestMock = { success: true }
        jest.spyOn(axios, "post").mockResolvedValueOnce({ data: requestMock })
        const newName = { name: "userKey" }
        const addResponse = await axios.get("https://eshopping-15bdb-default-rtdb.firebaseio.com//shopping.json", newName)
        const { getByTestId } = render(
            <ThemeProvider theme={theme}>
                <SignUp navigation={navigationMock} />
            </ThemeProvider>
        )
        fireEvent.press(getByTestId("registerjest"))
        await waitFor(() => expect(addResponse.data).toEqual(requestMock))
    })
})
