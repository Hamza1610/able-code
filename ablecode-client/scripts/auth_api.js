import env from '../../loader'

console.log(env.firebaseConfig.apiKey);

class Client {
    constructor() {
        // URLs are hardcoded into the class. Update them here if needed.
        this.urls = {
            emailAndPasswordSignUpUrl: `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${env.API_KEY}`,
            emailAndPasswordSignInUrl: `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${env.API_KEY}`,
            
            microsoftUrl: "https://example.com/auth/microsoft",
            googleUrl: "https://example.com/auth/google",
            apiKey: env.firebaseConfig.apiKey
        };

        this.authStatus = false;
    }

    /**
     * Helper method to handle fetch requests.
     * @param {string} url - The URL for the request.
     * @param {Object} options - Fetch options like method, headers, and body.
     * @returns {Promise<Object>} - Parsed JSON response.
     */
    async fetchRequest(url, options) {
        try {
            const response = await fetch(url, options);
            if (!response.ok) {
                const errorDetails = await response.json();
                throw new Error(`HTTP Error ${response.status}: ${errorDetails.message || response.statusText}`);
            }
            return await response.json();
        } catch (error) {
            console.error("Fetch error:", error.message);
            throw error;
        }
    }

    /**
     * Sign up using email and password.
     * @param {string} email - User's email.
     * @param {string} password - User's password.
     * @returns {Promise<Object>} - Response data.
     */
    async signUpWithEmailPassword(email, password) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, returnSecureToken:true }),
        };

        const response = await this.fetchRequest(this.urls.emailAndPasswordSignUpUrl, options);
        this.authStatus = true; // Assume successful signup implies authentication
        return response;
    }

    /**
     * Sign in using email and password.
     * @param {string} email - User's email.
     * @param {string} password - User's password.
     * @returns {Promise<Object>} - Response data.
     */
    async signInWithEmailPassword(email, password) {
        const options = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password, returnSecureToken:true }),
        };

        const response = await this.fetchRequest(this.urls.emailAndPasswordSignInUrl, options);
        this.authStatus = true; // Assume successful sign-in implies authentication
        return response;
    }

    /**
     * Sign up using Google authentication.
     * @returns {Promise<Object>} - Response data.
     */
    async signUpWithGoogle() {
        const response = await this.fetchRequest(this.urls.googleUrl, { method: "GET" });
        this.authStatus = true; // Assume successful signup implies authentication
        return response;
    }

    /**
     * Sign up using Microsoft authentication.
     * @returns {Promise<Object>} - Response data.
     */
    async signUpWithMicrosoft() {
        const response = await this.fetchRequest(this.urls.microsoftUrl, { method: "GET" });
        this.authStatus = true; // Assume successful signup implies authentication
        return response;
    }

    /**
     * Sign out the user.
     */
    signOut() {
        this.authStatus = false;
        console.log("User signed out successfully.");
    }

    /**
     * Check authentication status.
     * @returns {boolean} - Whether the user is authenticated.
     */
    isAuth() {
        return this.authStatus;
    }
}


// Export for browser (ES Module environment)
export default Client;
