const {functions, db} = require('./firebase.js');
const booker = require('./bookerMain.js');

// eslint-disable-next-line max-len
exports.initUser = functions.region('europe-west1').auth.user().onCreate((user) => {
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


async function formatData() {
  const credentials = (await db.collection('credentials').get())
      .docs.map((doc) => doc.data());
  const timetables = (await db.collection('timetables').get())
      .docs.map((doc) => doc.data());
  const map = {};
  // console.log(credentials, timetables);
  for (const credential of credentials) {
    if (!credential.credentials[0] || !credential.credentials[1]) {
      continue;
    }
    map[credential.user] = {};
    map[credential.user]['creds'] = credential.credentials;
  }
  for (const timetable of timetables) {
    if (map[timetable.user]) {
      map[timetable.user]['table'] = timetable.table;
    }
  }
  return map;
}

exports.cyclicBookingPubSub = functions
    .runWith({memory: '512MB', timeoutSeconds: 540})
    .region('europe-west1')
    .pubsub.schedule('15 12 * * *')
    .timeZone('Europe/Rome')
    .onRun(async (context) => {
      try {
        const map = await formatData();
        const daysMap = {
          'Monday': 0,
          'Tuesday': 1,
          'Wednesday': 2,
          'Thursday': 3,
          'Friday': 4,
          'Saturday': 5,
          'Sunday': 6,
        };
        const dayAfterTomorrow = new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000); // 2 days from now
        const stringDate = dayAfterTomorrow.toISOString().split('T')[0]; // YYYY-MM-DD
        // Monday, Tuesday, etc.
        const dayIndex = daysMap[dayAfterTomorrow.toLocaleDateString('en-US', {weekday: 'long'})];
        for (const key in map) {
          const {creds, table} = map[key];
          const [username, password] = creds;
          if (table[dayIndex] != 'X') {
            console.log('Booking for', username, 'on', stringDate, 'at', table[dayIndex]);
            try {
              await booker(username, password, stringDate, table[dayIndex]);
            } catch (err) {
              functions.logger.warn('Error in booking for user ', username, ' with message: ', err);
            }
          }
        }
      } catch (err) {
        functions.logger.warn('Error retrieving all tables and credentials', err);
      }
      return null;
    });

/*
  * This function is used to test the cyclic booking function
  * Comment out for testing
exports.cyclicBookingTest = functions
    .region('europe-west1')
    .runWith({memory: '512MB', timeoutSeconds: 540})
    .https.onRequest(async (req, res) => {
      // await booker(username, password, '2022-12-23', '13:30');
      functions.logger.info('Cyclic booking test started');
      try {
        const map = await formatData();
        const daysMap = {
          'Monday': 0,
          'Tuesday': 1,
          'Wednesday': 2,
          'Thursday': 3,
          'Friday': 4,
          'Saturday': 5,
          'Sunday': 6,
        };
        const dayAfterTomorrow = new Date(new Date().getTime() + 2 * 24 * 60 * 60 * 1000);
        const stringDate = dayAfterTomorrow.toISOString().split('T')[0];
        const dayIndex = daysMap[dayAfterTomorrow.toLocaleDateString('en-US', {weekday: 'long'})];
        for (const key in map) {
          const {creds, table} = map[key];
          const [username, password] = creds;
          if (table[dayIndex] != 'X') {
            functions.logger.info('Booking for', username, 'on', stringDate, 'at', table[dayIndex]);
            try {
              await booker(username, password, stringDate, table[dayIndex]);
            } catch (err) {
              functions.logger.warn('Error in booking for user ', username, ' with message: ', err);
            }
          }
        }
      } catch (err) {
        functions.logger.warn('Error retrieving all tables and credentials', err);
      }
      res.json({status: 'ok'});
    });
*/
