const signUp = ()=>{
    xit('should go to signup page for new user details', async () => {
        // await element(by.id('signupjest')).tap()
    
        await waitFor(element(by.id('signUpTest'))).toBeVisible()
    
        await element(by.id('emailjest')).tap()
        await element(by.id('emailjest')).typeText('def123@gamil.com')
    
        await device.pressBack()
    
        await element(by.id('usernamejest')).tap()
        await element(by.id('usernamejest')).typeText('hello')
    
        await device.pressBack()
    
        await element(by.id('phonenumjest')).tap()
        await element(by.id('phonenumjest')).typeText('9806253451')
    
        await device.pressBack()
    
        await element(by.id('passwordjest')).tap()
        await element(by.id('passwordjest')).typeText('1234567890')
    
        await device.pressBack()
        await element(by.id('eyejest')).tap()
        await device.pressBack()
    
        await element(by.id('comPassjest')).tap()
        await element(by.id('comPassjest')).typeText('1234567890')
        
        await device.pressBack()
        await element(by.id('eye1jest')).tap()
        await device.pressBack()
    
        await element(by.text('REGISTER')).tap()
        await element(by.id('alreadyjest')).tap()
      })

      
      xit('new email and password login after register the details', async () => {
   
        await element(by.id('emailjest')).clearText()
        await element(by.id('passwordjest')).clearText()
        await element(by.id('emailjest')).tap()
        await element(by.id('emailjest')).typeText('def123@gamil.com');
        await element(by.id('passwordjest')).tap()
        await element(by.id('passwordjest')).typeText('1234567890');
        
        await device.pressBack()
    
        await element(by.id('eyejest')).tap()
    
        await device.pressBack()
    
        await element(by.text('LOGIN')).tap()
      })
}

module.exports.signUp=signUp