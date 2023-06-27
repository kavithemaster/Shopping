// const { waitFor } = require("@testing-library/react-native")

const electronics = () => {
    it('render the electronics screen', async () => {
        await waitFor(element(by.id('electronicsTest'))).toBeVisible()
    })
    xit(' search bar icon clicked ', async () => {
        await waitFor(element(by.id('seachIconTest'))).toBeVisible()
        await element(by.id('rightIconJest')).tap()

        await element(by.id('searchjest')).tap()
        await element(by.id('searchjest')).typeText('Computer')

        await device.pressBack()

        await element(by.id('searchjest')).clearText()

        await element(by.id('leftIconJest')).tap()

    })
    it('add to button tigger and tiggering to the products details', async () => {
        // when seach bar is used uncommand this two lines

        // await element(by.id('productsTest')).atIndex(0).tap()
        // await waitFor(element(by.id('electronicsTest'))).toBeVisible()

        await waitFor(element(by.id('mainEleTest'))).toBeVisible()
        await element(by.id('buttons')).atIndex(1).tap()

        await element(by.id('imgjest' + '0')).tap()
    })

    it('going to products details page', async () => {

        await waitFor(element(by.id('productDetailsTest'))).toBeVisible()
        await element(by.id('favIconTest')).tap()

        await element(by.id('colorTest')).atIndex(1).tap()
        await element(by.id('colorTest')).atIndex(2).tap()

        await element(by.id('productDetailsTest')).swipe('up')

        await element(by.id('addToTest')).tap()

    })
    it(' going back to screen', async () => {

        await element(by.id('productDetailsTest')).swipe('down')

        await element(by.id('backTest')).tap()
    })

    it('going back to home screen', async () => {
        await waitFor(element(by.id('electronicsTest'))).toBeVisible()

        await element(by.id('leftIconJest')).tap()
    })

}

module.exports.electronics = electronics