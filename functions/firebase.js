const admin = require('firebase-admin');
const serviceAccount = require('./serviceAccountKey.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const functions = require('firebase-functions');
const {connectFunctionsEmulator} = require('firebase/functions');
connectFunctionsEmulator(functions, 'localhost', 5001);

const {getFirestore} = require('firebase-admin/firestore');
const db = getFirestore();

module.exports = {
  admin,
  functions,
  db,
};
