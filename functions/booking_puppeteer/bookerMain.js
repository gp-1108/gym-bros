const puppeteer = require('puppeteer');
const loginFunction = require('./login.js');
const bookFunction = require('./booking.js');
const selectDate = require('./selectDate.js');


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

  // select date
  await selectDate(page, date);

  // book a slot
  await bookFunction(page, time);
  await browser.close();
};

// TODO
// 1. Add a check to see if the slot is already booked
// 2. Add execptions for date not available and slot not available
// 3. Remove comment from actual booking click
