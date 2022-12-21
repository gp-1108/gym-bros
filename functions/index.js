const {functions, db} = require('./firebase.js');
const {doc, addDoc} = require('firebase/firestore');

exports.consoleLog = functions.auth.user().onCreate((user) => {
  functions.logger.info(user);
  const uid = user.uid;
  addDoc(doc(db, 'timetables', 'timetables'), {
    user: uid,
    table: ['X', 'X', 'X', 'X', 'X', 'X', 'X'],
  }).then(
      () => functions.logger.info('Document successfully written!')
  ).catch((err) => functions.logger.error(err));
  return;
});

// // Create and deploy your first functions
// // https://firebase.google.com/docs/functions/get-started
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info('Hello logs!', {structuredData: true});
//   response.send('Hello from Firebase!');
// });
