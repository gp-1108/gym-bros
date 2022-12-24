const puppeteer = require('puppeteer');
const loginFunction = require('./login.js');
const bookFunction = require('./booking.js');


module.exports = async function booker(usn, psw, date, time) {
  const browser = await puppeteer.launch(
      {headless: true, args: ['--no-sandbox']},
  );
  const page = await browser.newPage();
  // load main page
  await page.goto('https://gyms.vertical-life.info/intellighenzia-project-asd/checkins');
  await page.waitForNavigation({waitUntil: 'networkidle0'});
  // login
  await loginFunction(page, usn, psw);

  // go to booking page
  await page.goto(`https://gyms.vertical-life.info/it/intellighenzia-project-asd/checkins#/service/default/74/${date}`);
  await new Promise((resolve) => setTimeout(resolve, 2000));

  // book a slot
  await bookFunction(page, time);
  await browser.close();
};

// TODO
// 1. Add a check to see if the slot is already booked
// 2. Add execptions for date not available and slot not available
// 3. Remove comment from actual booking click
