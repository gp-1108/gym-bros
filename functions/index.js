const {functions, db} = require('./firebase.js');
// const {collection, addDoc} = require('firebase-admin/firestore');

exports.consoleLog = functions.auth.user().onCreate((user) => {
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
