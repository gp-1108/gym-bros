const {functions, db} = require('./firebase.js');
// const {collection, addDoc} = require('firebase-admin/firestore');

exports.consoleLog = functions.auth.user().onCreate((user) => {
  const uid = user.uid;
  const collectionRef = db.collection('timetables');
  collectionRef.add({
    user: uid,
    table: ['X', 'X', 'X', 'X', 'X', 'X', 'X'],
  }).then(
      (docRef) => functions.logger.info('Document written with ID: ', docRef.id)
  ).catch((err) => functions.logger.error('Error adding document: ', err));
  return;
});
