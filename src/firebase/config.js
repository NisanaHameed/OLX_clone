import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';
import {getStorage} from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDx4orX-T2kE2DMI4_Ae3u4rbXCkSPak4Q",
    authDomain: "olx-clone-7c120.firebaseapp.com",
    projectId: "olx-clone-7c120",
    storageBucket: "olx-clone-7c120.appspot.com",
    messagingSenderId: "1020313458402",
    appId: "1:1020313458402:web:c502aa124afa1ef76870bb",
    measurementId: "G-P40V66FP79"
  };

const firebaseapp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseapp);
const firestore = getFirestore(firebaseapp);
const storage = getStorage(firebaseapp);
export { auth,firestore,storage };