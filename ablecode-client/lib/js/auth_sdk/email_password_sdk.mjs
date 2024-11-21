import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut  } from './firebase.-config.mjs'

function signUpWithEmailPassword(email, password) {

    createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed up 
        const user = userCredential.user;
     })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("ERROR:", errorMessage);
     });
}


function signInWithEmailPassword(email, password) {

    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
        // Signed In
        const user = userCredential.user;
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log("ERROR:", errorMessage);
        
    });
}

function signOutAccount(params) {
    signOut(auth)
    .then(() => {
        // Sign-out successful.
        console.log("SignOut Successful");  
    }).catch((error) => {
        // An error happened.
        console.log("ERROR: ", error);        
    });
}

export  { signUpWithEmailPassword, signInWithEmailPassword, signOutAccount }