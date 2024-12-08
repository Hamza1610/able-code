// Function to check internet connectivity
function checkInternetConnection() {
    return navigator.onLine;
}

// Function to speak messages
function speakMessage(message) {
    const utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
}

// Function to read the page content
function readPageContent() {
    const pageContent = document.querySelector('main').innerText;
    speakMessage(pageContent);
}

// Function to handle voice commands
function handleCommand(command) {

    command = command.toLowerCase();
    if (command.includes("go to about us")) {
        speakMessage("Navigating to the About Us page.");
        window.location.href = "about.html";
    } else if (command.includes("go to contact")) {
        speakMessage("Navigating to the Contact page.");
        window.location.href = "contact.html";
    } else if (command.includes("go to home")) {
        speakMessage("Navigating to the Home page.");
        window.location.href = "index.html";
    } else if (command.includes("read this page")) {
        speakMessage("Reading the page content.");
        readPageContent();
    } else {
        speakMessage("Sorry, I did not understand the command.");
    }
}

// Initialize the voice assistant
function initializeVoiceAssistantEE() {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    if (!checkInternetConnection()) {
        speakMessage("You are not connected to the internet!");
        return;
    }


    // userNmae will be saves on browser to recollect
    const USER_NAME = 'Hamza'

    recognition.onstart = () => {
        speakMessage(`Hello ${USER_NAME}, What can I do for you. I'm your navigator assistant`);
    };

    recognition.onresult = (event) => {
        const command = event.results[0][0].transcript;
        handleCommand(command);
    };

    recognition.onerror = (event) => {
        speakMessage("An error occurred: " + event.error);
    };

    recognition.onend = () => {
        speakMessage("Voice assistant stopped. Click the button to restart.");
    };



    recognition.start();
}
