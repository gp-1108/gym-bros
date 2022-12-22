const {functions, db} = require('./firebase.js');
const booker = require('./bookerMain.js');

exports.initUser = functions.auth.user().onCreate((user) => {
  async function initUser(uid) {
    const timetableRef = db.collection('timetables');
    try {
      await timetableRef.add({
        user: uid,
        table: ['X', 'X', 'X', 'X', 'X', 'X', 'X'],
      });
      functions.logger.info('User added to database', uid);
    } catch (error) {
      functions.logger.error('Error adding user to database', error);
    }
    const credentialRef = db.collection('credentials');
    try {
      await credentialRef.add({
        user: uid,
        credentials: ['', ''],
      });
      functions.logger.info('Credential added to database', uid);
    } catch (error) {
      functions.logger.error('Credential adding user to database', error);
    }
  }

  return initUser(user.uid);
});

// eslint-disable-next-line max-len
exports.cyclicBooking = functions.runWith({memory: '1GB', timeoutSeconds: 540}).https.onRequest(async (req, res) => {
  try {
    const credentials = await db.collection('credentials').get();
    for (let cred of credentials.docs) {
      cred = cred.data().credentials;
      await booker(cred[0], cred[1], '2022-12-23', '13:30');
    }
  } catch (err) {
    functions.logger.warn('Error getting timetables', err);
  }
  res.json({status: 'ok'});
});
