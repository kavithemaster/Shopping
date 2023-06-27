const splash =()=>{
    it('splash screen', async () => {
        await expect(element(by.id('splashTest'))).toBeVisible()
      })
}

module.exports.splash=splash