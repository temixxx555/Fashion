import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyDKcm3JkaYtmVf5IP1IUzIubYfcEbAa-K0",
  authDomain: "fashion-brand-99c91.firebaseapp.com",
  projectId: "fashion-brand-99c91",
  storageBucket: "fashion-brand-99c91.appspot.com",
  messagingSenderId: "212374421067",
  appId: "1:212374421067:web:b220eaa2338df85c0797ce",
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { app, database };
