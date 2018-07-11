const emitter = require('./emitter')
const utils = require('./utils')

const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({headless: false})
  const page = await browser.newPage()
  // await page.goto('https://example.com')
  await page.goto('https://web.whatsapp.com/')

  // Get the "viewport" of the page, as reported by the page.
  // const dimensions = await page.evaluate(() => {
  //   return {
  //     width: document.documentElement.clientWidth,
  //     height: document.documentElement.clientHeight,
  //     deviceScaleFactor: window.devicePixelRatio
  //   }
  // })
  // console.log('Dimensions:', dimensions)

  page.on('console', msg => {
    for (let i = 0; i < msg.args().length; ++i)
      console.log(`${i}: ${msg.args()[i]}`);
  });

  page.evaluate(() => console.log('hello', 5, {foo: 'bar'}));

  // await browser.close()
})()