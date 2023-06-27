// const { waitFor } = require("@testing-library/react-native");
const splash = require('../e2e/splash')
const signIn = require('../e2e/Auth/signIn')
const signUp = require('../e2e/Auth/signUp')
const home = require('../e2e/home')
const electronics= require('../e2e/products/electronics')
describe('shopping', () => {

  it('loading the page', async () => {
    await device.launchApp();
  })

  describe ('going to splash screen',()=> splash.splash())
  describe ('going to signin screen',()=> signIn.signIn())
  describe ('going to signup screen',()=> signUp.signUp())
  describe ('going to home screen',()=> home.home())
  describe ('going to electronices screen',()=> electronics.electronics())
  
});

