import { clearUser, saveUser } from './utils.js';
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut  } from './firebase.-config.mjs'

function signUpWithEmailPassword(email, password) {

    console.log("Email and ppassword: ", email, password);
    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
        saveUser(user)
     })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("ERROR:", errorMessage);
     });
}


function signInWithEmailPassword(email, password) {

    console.log("Email and ppassword: ", email, password);
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed In
        const user = userCredential.user;
        saveUser(user)
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("ERROR:", errorMessage);
        
    });
}

function signOutAccount() {
    signOut(auth)
    .then(() => {
        // Sign-out successful.
        clearUser()
    }).catch((error) => {
        // An error happened.
        console.log("ERROR: ", error);        
    });
}


export  { signUpWithEmailPassword, signInWithEmailPassword, signOutAccount }
