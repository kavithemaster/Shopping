const home = ()=>{
  it('render the home page', async()=>{
    await waitFor(element(by.id('homeTest'))).toBeVisible()
    await element(by.id('productsTest')).atIndex(0).tap()
  })
}

module.exports.home=home    