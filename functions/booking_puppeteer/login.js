/* eslint-disable quotes */
/* eslint-disable max-len */
module.exports = async function loginFunction(page, usn, psw) {
  const loginBtn = (await page.$x("//a[@id='login_link']"))[0];
  await loginBtn.click();
  await page.waitForNavigation({waituntil: 'networkidle0'});
  const emailForm = (await page.$x("//input[@id='username'][1]"))[0];
  const passwordForm = (await page.$x("//input[@id='password'][1]"))[0];
  await emailForm.type(usn);
  await passwordForm.type(psw);
  const submitButton = (await page.$x("//input[@id='kc-login'][1]"))[0];
  submitButton.click();

  let loggedIn = true;
  try {
    await page.waitForSelector('div.alert-error', {timeout: 1500});
    loggedIn = false;
  } catch (err) {
    loggedIn = true;
  }
  if (!loggedIn) {
    throw new Error("Something went wrong with the login.");
  }
  await new Promise((resolve) => setTimeout(resolve, 3000));
};
