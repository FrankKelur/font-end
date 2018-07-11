const {Builder, By, Key, until} = require('selenium-webdriver');

(async function example () {
  let driver = await new Builder().forBrowser('chrome').build()
  try {
    await driver.get('http://www.google.com/ncr')
    await driver.findElement(By.name('q')).sendKeys('lixiaopeng', Key.RETURN)
    await driver.wait(until.titleIs('lixiaopeng - Google Search'), 1000)
    console.log('no catch')
  } catch (ex) {
    console.log('ex', ex)
  } finally {
    // await driver.quit()
  }
})()