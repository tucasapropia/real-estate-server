const functions = require("firebase-functions");

// Create and deploy your first functions
// https://firebase.google.com/docs/functions/get-started

exports.helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", { structuredData: true });
  response.send("Hello from Firebase!");
});

// The Firebase Admin SDK to access Firestore.
const admin = require("firebase-admin");
const { firestore } = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore()

exports.addMessage = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into Firestore using the Firebase Admin SDK.

  const writeResult = await admin
    .firestore()
    .collection("messages")
    .add({ original: original });
  // Send back a message that we've successfully written the message
  res.json({ result: `Message with ID: ${writeResult.id} added.` });
});

exports.addHouse = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.body;
  // Push the new message into Firestore using the Firebase Admin SDK.

  const Result = await admin
    .firestore()
    .collection("house")
    .add({ original: original });
  // Send back a message that we've successfully written the message
  res.json({ result: `Message with ID: ${Result.id} added.` });
});

exports.addPiso = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.query.text;
  // Push the new message into Firestore using the Firebase Admin SDK.

  const Result = await admin
    .firestore()
    .collection("piso")
    .add({ original: original });
  // Send back a message that we've successfully written the message
  res.json({ result: `Message with ID: ${Result.id} added.` });
});

exports.addTerreno = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const original = req.body;

  // Push the new message into Firestore using the Firebase Admin SDK.


   const result = await db.collection("inmueble").add(
    { 
        name: original.name,
        categories: ['venta']
     }
    )

  // Send back a message that we've successfully written the message
  res.json(result);
});

exports.addCasa = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.
  const categorias = req.body;
  console.log(req.body);

  // Push the new message into Firestore using the Firebase Admin SDK.

  const Prueba = await admin.firestore().collection("Casa").get({
    categorias,
  });
  // Send back a message that we've successfully written the message
  res.json({ Prueba: `${Prueba} added.` });
});

exports.getTerreno = functions.https.onRequest(async (req, res) => {
  // Grab the text parameter.


  const snapshot =  admin.firestore().collection("inmueble")
   
  let collection = await snapshot.where('categories','array-contains-any',["alquiler"]).get()

  // Push the new message into Firestore using the Firebase Admin SDK.
  const value = collection.docs.map((doc) => doc.data());

  // Send back a message that we've successfully written the message
  res.json(value);
});
