import React from 'react'
import { fireEvent, render } from '@testing-library/react-native'
import { ThemeProvider } from 'react-native-elements'
import Deals from '../src/components/deals'
import theme from '../src/styles/themes'

describe('Deals', () => {
  it('renders the "No offers available" text', () => {
    const { getByText } = render(<ThemeProvider theme={theme}><Deals/></ThemeProvider>)
    const noOffersText = getByText("Currently No offer's are avaliable please get back it later")
    expect(noOffersText).toBeDefined()
  })

  it('renders the image', () => {
    const { getByTestId } = render(<ThemeProvider theme={theme}><Deals/></ThemeProvider>)
    const image = getByTestId('deals-image')
    expect(image).toBeDefined()
  })
})
