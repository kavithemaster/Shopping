import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import Home from '../../src/components/home';
import { ThemeProvider } from 'react-native-elements';
import theme from '../../src/styles/themes';

jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
    goBack: jest.fn(),
  }),
}))


describe('Home', () => {
  test('renders the component correctly', () => {
    const { getByTestId } = render(
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>
    )
    const swiperContainer = getByTestId('swiper-container')
    const avatarContainer = getByTestId('avatar-container')
    const newOne = getByTestId('newone')

    expect(swiperContainer).toBeTruthy()
    expect(avatarContainer).toBeTruthy()
    expect(newOne).toBeTruthy()
  })

  test('navigates to the correct screen when item is pressed', () => {
    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Home />
      </ThemeProvider>)

    const item = {
      id: 1,
      req: "https://www.polytechnichub.com/wp-content/uploads/2017/04/Electronic.jpg",
      name: "Electronics"
    }

    const itemText = getByText(item.name)
    fireEvent.press(itemText)
  })

  test('renders the top selling avatars correctly', () => {
    const { getByTestId } = render(<ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>)
    const avatarContainer = getByTestId('avatar-container')

    expect(avatarContainer).toBeTruthy()

  })

  test('renders the swiper images correctly', () => {
    const { getAllByTestId } = render(<ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>)
    const swiperImages = getAllByTestId('swiperImgJest')

    expect(swiperImages.length).toBeGreaterThan(0)
  })

  test('renders the FlatList items correctly', () => {
    const { getByTestId, getByText } = render(<ThemeProvider theme={theme}>
      <Home />
    </ThemeProvider>)
    const flatList = getByTestId('newone')

    expect(flatList).toBeTruthy()

    const flatListItems = flatList.props.data;
    flatListItems.forEach((item) => {
      const itemName = getByText(item.name);
      fireEvent.press(itemName);

    })
  })
})
























// import React from 'react'
// import { render, fireEvent } from '@testing-library/react-native'
// import Home from '../../src/components/home'
// import { ThemeProvider } from 'react-native-elements'
// import theme from '../../src/styles/themes'

// jest.mock("@react-navigation/native", () => ({
//   useNavigation: () => ({
//     navigate: jest.fn(),
//     goBack: jest.fn(),
//   }),
// }))

// const swiperData = [
//   {
//     id: 1,
//     req: "https://www.polytechnichub.com/wp-content/uploads/2017/04/Electronic.jpg",
//     name: "Electronics"
//   },
//   {
//     id: 2,
//     req: "https://thumbs.dreamstime.com/z/fashion-pretty-cool-youngwith-shopping-bags-wearing-black-hat-white-pants-over-colorful-orange-background-79063329.jpg",
//     name: "Fashion"
//   },
// ]

// describe('Home', () => {
//   test('renders swiper images', () => {
//     const { getByTestId } = render(<ThemeProvider theme={theme}><ThemeProvider><Home/></ThemeProvider></ThemeProvider>)
//     const swiperContainer = getByTestId('swiper-container')
//     expect(swiperContainer).toBeDefined()
//   })

//   test('renders avatar images', () => {
//     const { getByTestId } = render(<ThemeProvider theme={theme}><ThemeProvider><Home/></ThemeProvider></ThemeProvider>)
//     const avatarContainer = getByTestId('avatar-container')
//     expect(avatarContainer).toBeDefined()
//   })

//   test('renders the component with correct data', ()=>{
//     const { getByText,getByTestId } = render(<ThemeProvider theme={theme}><Home  /></ThemeProvider>)
//   })

//   // test('navigates to item details when item avatar is pressed', () => {
//   //   const { getByTestId } = render(<ThemeProvider theme={theme}><Home/></ThemeProvider>)
//   //   const avatarContainer = getByTestId('newone')
//   //   expect(avatarContainer.children.props).toHaveBeenCalledWith()
//   // })


// })
