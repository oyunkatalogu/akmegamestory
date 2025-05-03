import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-auth.js";
import { getStorage } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-storage.js";

const firebaseConfig = {
  apiKey: "AIzaSyBb1dqb3SqYpkEtB3Wnt8LSVc41TSGETe4",
  authDomain: "akmegamestore-66522.firebaseapp.com",
  databaseURL: "https://akmegamestore-66522-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "akmegamestore-66522",
  storageBucket: "akmegamestore-66522.appspot.com",
  messagingSenderId: "893039272243",
  appId: "1:893039272243:web:c186b12310194590280203"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
const auth = getAuth(app);
const storage = getStorage(app);

export { db, auth, storage };