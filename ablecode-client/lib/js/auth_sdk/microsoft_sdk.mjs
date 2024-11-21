import { auth, OAuthProvider } from './firebase.-config.mjs'

const provider = new OAuthProvider('microsoft.com');

// Both signUpWithMicrosoft and signInWithMicrosoft works the same way

function signUpWithMicrosoft() {

    signInWithPopup(auth, provider)
    .then((result) => {
        // User is signed in.
        // IdP data available in result.additionalUserInfo.profile.

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

        // Get the OAuth access token and ID Token
        const credential = OAuthProvider.credentialFromResult(result);
        const accessToken = credential.accessToken;
        const idToken = credential.idToken;
    })
    .catch((error) => {
        console.log("ERROR: ", error);
    });
}

export  { signInWithMicrosoft, signUpWithMicrosoft }