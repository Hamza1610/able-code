import { initializeApp } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-app.js'
  
// If you enabled Analytics in your project, add the Firebase SDK for Google Analytics
import { getAnalytics } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-analytics.js'

// Add Firebase products that you want to use
import { getAuth, signInWithPopup, GoogleAuthProvider, OAuthProvider, signInWithEmailAndPassword,createUserWithEmailAndPassword, signOut } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-auth.js'
import { getFirestore } from 'https://www.gstatic.com/firebasejs/11.0.2/firebase-firestore.js'

    // TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
  apiKey: "AIzaSyAVdU3uZpgQuMFNiGJfyKmjVF2qCt11cM0",
  authDomain: "ablecode-6621d.firebaseapp.com",
  projectId: "ablecode-6621d",
  storageBucket: "ablecode-6621d.firebasestorage.app",
  messagingSenderId: "533623161388",
  appId: "1:533623161388:web:40a0f81109cbe3a9ee0789",
  measurementId: "G-Y93QCMZGWH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
const auth = getAuth(app);

export  { auth, signInWithPopup, GoogleAuthProvider, OAuthProvider,createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut }
