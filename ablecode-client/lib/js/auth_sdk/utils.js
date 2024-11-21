function saveUser(user) {
    // Store the user in localStorage
    if (typeof(user) === "object") {
        localStorage.setItem("user", JSON.stringify(user));
        return
    }

    localStorage.setItem("user", user);
}

function getUser() {
    // Retrieve the user from localStorage
    const user = localStorage.getItem("user");

    try {
        const parsedUser = JSON.parse(user);

        if (typeof(parsedUser) === 'object' && parsedUser !== null) {
            return parsedUser
        }

        return user
    } catch (error) {
        console.log('Error getting stored data:', error);

    }
}

function clearUser() {
    // Remove the user from localStorage
    localStorage.removeItem("user");
}

export { saveUser, getUser, clearUser }
