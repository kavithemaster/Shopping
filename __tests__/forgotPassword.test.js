import React from 'react'
import { render, fireEvent } from '@testing-library/react-native'
import ForgetPassword from '../src/components/auth/forgetPassword'

describe('ForgetPassword', () => {
  it('renders correctly', () => {
    const { getByText, getByTestId } = render(<ForgetPassword />)
    const textElement = getByText('Kathir')
    const inputElement = getByTestId('name')
    const buttonElement1 = getByTestId('btn')
    const buttonElement2 = getByTestId('btn1')

    expect(textElement).toBeDefined()
    expect(inputElement).toBeDefined()
    expect(buttonElement1).toBeDefined()
    expect(buttonElement2).toBeDefined()
  })

  it('updates text input value', () => {
    const { getByTestId } = render(<ForgetPassword />)
    const inputElement = getByTestId('name')
    fireEvent.changeText(inputElement, 'New Text')
    expect(inputElement.props.value).toBe('New Text')
  })

  it('navigation to google screen when button pressed', () => {
    const navigationMock = { navigate: jest.fn() }
    const { getByTestId } = render(<ForgetPassword navigation={navigationMock} />)
    const buttonElement = getByTestId('btn')
    fireEvent.press(buttonElement)
    expect(navigationMock.navigate).toHaveBeenCalledWith('google')
  })

  it('navigation to facebook screen when button pressed', () => {
    const navigationMock = { navigate: jest.fn() }
    const { getByTestId } = render(<ForgetPassword navigation={navigationMock} />)
    const buttonElement = getByTestId('btn1')
    fireEvent.press(buttonElement)
    expect(navigationMock.navigate).toHaveBeenCalledWith('facebook')
  })
})
