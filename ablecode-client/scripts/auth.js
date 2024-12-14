import {

    signUpWithEmailPassword,
    signInWithEmailPassword,
    signOutAccount,
    signUpWithGoogle,
    signInWithGoogle,
    signUpWithMicrosoft,
    signInWithMicrosoft 

} from "../lib/js/auth_sdk/index.js"


// Sing Up with Email and Password Button
const signUpEmailPasswordButton = document.getElementById('sign-up-email-password')
signUpEmailPasswordButton.addEventListener('click', (event) => {

    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    console.log(email, password);
    signUpWithEmailPassword(email, password);
    setTimeout(() => {
        const hostname = window.location.hostname;
        let href = window.location.href
        const basePath = 'able-code/ablecode-client/page';
        const targetPage = '/courses.html';
        href = `${window.location.origin}/${basePath}${targetPage}`;
        window.location.href = '/ablecode-client/pages/courses.html'; // Replace '/dashboard' with your desired page
        console.log(href);
        // window.location.href = href
    }, 3000)

})

// Sign In with Email and Password Button
const signInEmailPasswordButton = document.getElementById('sign-in-email-password')
signInEmailPasswordButton.addEventListener('click', () => {

    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    console.log(email, password);
    signInWithEmailPassword(email, password)
})

// Google Sign-Up Button
const googleSignUpButton = document.getElementById('sign-up-google');
googleSignUpButton.addEventListener('click', () => {

    signUpWithGoogle()
});

// Google Sign-In Button
const googleSignInButton = document.getElementById('sign-in-google');
googleSignInButton.addEventListener('click', () => {

    signInWithGoogle()
});

// Microsoft Sign-Up Button
const microsoftSignUpButton = document.getElementById('sign-up-microsoft');
microsoftSignUpButton.addEventListener('click', () => {

    signUpWithMicrosoft()
});

// Microsoft Sign-In Button
const microsoftSignInButton = document.getElementById('sign-in-microsoft');
microsoftSignInButton.addEventListener('click', () => {
    
    signInWithMicrosoft()
});

// Sign Out Button
const signOutButton = document.getElementById('sign-out-account');
signOutButton.addEventListener('click', () => {

    const modal = document.getElementById("sign-out-modal");
    const confirmSignOutButton = document.getElementById("confirm-sign-out");
    const cancelSignOutButton = document.getElementById("cancel-sign-out");

    // Render modal
    modal.classList.remove("hidden");

    // Confirm sign out
    confirmSignOutButton.addEventListener("click", () => {
        // Add your sign-out logic here
        signOutAccount();

        console.log("User signed out!");
        modal.classList.add("hidden");
    });

    // Cancel sign out
    cancelSignOutButton.addEventListener("click", () => {
        modal.classList.add("hidden");
    });
})