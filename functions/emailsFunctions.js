/* eslint-disable max-len */
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

async function sendEmail(userEmail, stringDate, time, errorText) {
  const msg = {
    to: userEmail,
    from: 'my.gym.booking@gmail.com',
    templateId: 'd-89d31983445d48579222fbd4b1dc90ed',
    dynamicTemplateData: {
      userEmail: userEmail,
      stringDate: stringDate,
      timeSlot: time,
      textError: errorText,
      bookingUrl: `https://gyms.vertical-life.info/it/intellighenzia-project-asd/checkins#/service/default/74/${stringDate}`,
    },
  };
  try {
    await sgMail.send(msg);
  } catch (err) {
    console.log(err);
  }
  console.log('Email sent');
}

module.exports = {
  sendEmail,
};
