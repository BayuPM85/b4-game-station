const admin = require('firebase-admin');
const fs = require('fs');

// Initialize Firebase Admin SDK
const serviceAccount = require('./service-account.json');
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

async function importData() {
  const fileContent = fs.readFileSync('./import-data.json', 'utf8');
  const data = JSON.parse(fileContent);
  const collections = data.collections;

  for (const [colName, docs] of Object.entries(collections)) {
    const docEntries = Object.entries(docs);
    if (docEntries.length === 0) {
      console.log(`Skipping empty collection: "${colName}"`);
      continue;
    }

    console.log(`Importing ${docEntries.length} documents into "${colName}"...`);

    // Firestore allows up to 500 operations per batch write
    const BATCH_LIMIT = 500;
    for (let i = 0; i < docEntries.length; i += BATCH_LIMIT) {
      const chunk = docEntries.slice(i, i + BATCH_LIMIT);
      const batch = db.batch();

      for (const [docId, docData] of chunk) {
        const docRef = db.collection(colName).doc(docId);
        batch.set(docRef, docData);
      }

      await batch.commit();
    }
    console.log(`Successfully imported "${colName}".`);
  }

  console.log('All data has been successfully imported to Firestore! 🎉');
}

importData().catch(error => {
  console.error('Error during import:', error);
  process.exitCode = 1;
});
