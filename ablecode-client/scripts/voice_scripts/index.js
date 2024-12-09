const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.continuous = true; // Keeps the recognition running
recognition.lang = "en-US";

let assistantState = {
    currentMode: "listening", // Initial mode
    isRunning: true,         // Tracks if the assistant should keep running
};

// Define actions for each mode
const handleCommand = (command) => {
    switch (true) {
        case command.includes("sleep"):
            console.log("Switching to Sleep Mode...");
            assistantState.currentMode = "sleeping";
            break;
        case command.includes("read"):
            console.log("Switching to Reading Mode...");
            assistantState.currentMode = "reading";
            // Example reading action
            readPageContent();
            break;
        case command.includes("navigate"):
            console.log("Switching to Navigation Mode...");
            assistantState.currentMode = "navigating";
            // Example navigation action
            navigateToPage(command);
            break;
        case command.includes("help"):
            console.log("Switching to Help Mode...");
            assistantState.currentMode = "help";
            provideHelp();
            break;
        case command.includes("shutdown"):
            console.log("Shutting down assistant...");
            assistantState.isRunning = false;
            recognition.stop(); // Stop listening
            break;
        default:
            console.log("Command not recognized. Listening for more commands...");
    }
};

// Read page content
const readPageContent = () => {
    const text = document.body.innerText; // Get all text on the page
    const speech = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(speech);
};

// Navigate to a specific page based on command
const navigateToPage = (command) => {
    if (command.includes("home")) {
        window.location.href = "/index.html";
    } else if (command.includes("about")) {
        window.location.href = "/about.html";
    } else {
        console.log("Navigation target not recognized.");
    }
};

// Provide help
const provideHelp = () => {
    const helpMessage = `
        Available Commands:
        - Say "read" to read the page content.
        - Say "navigate" followed by the page name to navigate.
        - Say "sleep" to enter sleep mode.
        - Say "shutdown" to stop the assistant.
    `;
    console.log(helpMessage);
    const speech = new SpeechSynthesisUtterance(helpMessage);
    window.speechSynthesis.speak(speech);
};

// Start listening for voice commands
recognition.onresult = (event) => {
    const command = event.results[event.results.length - 1][0].transcript.toLowerCase();
    console.log(`Command received: ${command}`);

    if (assistantState.isRunning) {
        handleCommand(command);
    }
};

// Error handling
recognition.onerror = (event) => {
    console.error("Speech recognition error:", event.error);
};

// Start the assistant
recognition.start();
console.log("Voice Assistant is running. Say 'shutdown' to stop.");
