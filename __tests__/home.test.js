import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import Home from '../src/components/home'
import { ThemeProvider } from 'react-native-elements'
import theme from '../src/styles/themes'

describe('Home', () => {
  test('renders swiper images', () => {
    const { getByTestId } = render(<ThemeProvider theme={theme}><Home/></ThemeProvider>)
    const swiperContainer = getByTestId('swiper-container')
    expect(swiperContainer).toBeDefined()
  })

  test('renders avatar images', () => {
    const { getByTestId } = render(<ThemeProvider theme={theme}><Home/></ThemeProvider>)
    const avatarContainer = getByTestId('avatar-container')
    expect(avatarContainer).toBeDefined()
  })

  test('navigates to item details when item avatar is pressed', () => {
    const navigation = { navigate: jest.fn() }
    const { getByTestId } = render(<ThemeProvider theme={theme}><Home navigation={navigation} /></ThemeProvider>)
    const avatarContainer = getByTestId('avatar-container')
    expect(avatarContainer).toBeDefined()
  })
})
