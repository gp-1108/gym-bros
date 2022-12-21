const admin = require('firebase-admin');
const functions = require('firebase-functions');
const {connectFunctionsEmulator} = require('firebase/functions');
connectFunctionsEmulator(functions, 'localhost', 5001);

const {connectFirestoreEmulator} = require('firebase/firestore');
const db = admin.initializeApp().firestore();
connectFirestoreEmulator(db, 'localhost', 8080);

module.exports = {
  admin,
  functions,
  db,
};
