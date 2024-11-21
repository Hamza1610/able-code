// import all auth modules

import { signUpWithEmailPassword, signInWithEmailPassword,  signOutAccount} from './email_password_sdk.mjs'
import { signInWithGoogle, signUpWithGoogle } from './google_sdk.mjs'
import { signInWithMicrosoft, signUpWithMicrosoft } from './microsoft_sdk.mjs'

export {
    signUpWithEmailPassword,
    signInWithEmailPassword,
    signOutAccount,
    signInWithGoogle,
    signUpWithGoogle,
    signInWithMicrosoft,
    signUpWithMicrosoft
} 