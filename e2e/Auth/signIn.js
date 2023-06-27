const signIn = () => {
    xit('should go to login page for inavild email and password', async () => {
        await waitFor(element(by.id('signInTest'))).toBeVisible().withTimeout(50000);
        await element(by.id('emailjest')).tap()
        await element(by.id('emailjest')).typeText('abc123@gmail.com');
        await element(by.id('passwordjest')).tap()
        await element(by.id('passwordjest')).typeText('098765431');

        await device.pressBack()

        await element(by.text('LOGIN')).tap()

    })

    xit('wrong email and password in sign page for alert dialoge and going to register page', async () => {
        await element(by.text('OK')).tap()
        await element(by.id('signupjest')).tap()
    })

    xit('wrong email and password in sign page for alert dialoge re-entering', async () => {
        await element(by.text('OK')).tap()
        await element(by.id('emailjest')).clearText()
        await element(by.id('passwordjest')).clearText()
    })

    it('should go to login page correct email and password', async () => {
        
        // command this line number 29 for testing wrong email and password
        await waitFor(element(by.id('signInTest'))).toBeVisible().withTimeout(50000);


        await element(by.id('emailjest')).tap()
        await element(by.id('emailjest')).typeText('abc123@gmail.com');
        await element(by.id('passwordjest')).tap()
        await element(by.id('passwordjest')).typeText('0987654321');

        await device.pressBack()

        await element(by.text('LOGIN')).tap()
    })

}

module.exports.signIn = signIn