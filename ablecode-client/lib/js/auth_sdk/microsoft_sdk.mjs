import { saveUser } from './utils.js';
import { auth, OAuthProvider, signInWithPopup } from './firebase.-config.mjs'

const provider = new OAuthProvider('microsoft.com');

// Both signUpWithMicrosoft and signInWithMicrosoft works the same way

function signUpWithMicrosoft() {

    signInWithPopup(auth, provider)
    .then((result) => {
        // User is signed in.
        const more_result = result.additionalUserInfo.profile
        saveUser(more_result)

        // Get the OAuth access token and ID Token
        const credential = OAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        const idToken = credential.idToken;

    })
    .catch((error) => {
        console.log("ERROR: ", error);
    });
}

function signInWithMicrosoft() {
    
    signInWithPopup(auth, provider)
    .then((result) => {
        // User is signed in.
        // IdP data available in result.additionalUserInfo.profile.
        const more_result = result.additionalUserInfo.profile

        // Get the OAuth access token and ID Token
        const credential = OAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        const idToken = credential.idToken;

        saveUser(more_result)

    })
    .catch((error) => {
        console.log("ERROR: ", error);
    });
}

export  { signInWithMicrosoft, signUpWithMicrosoft }