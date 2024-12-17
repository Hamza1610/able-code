import { generateTextWithGemini, renderFormattedText, convertMarkdownToHTML } from "./util.mjs";
import { listenToVoice, speakMessage, stopSpeaking } from "./voice-assistance.js";

const commandLog = document.getElementById('command-log');
const assistantStatus = document.querySelector('.assistant-status');
let assistantRunning = true;

// Utility function to log messages
const logCommand = (user, message) => {
    const div = document.createElement('div');
    div.classList.add('chat-message', user === 'Assistant' ? 'assistant-message' : 'user-message');
    div.innerHTML = message;
    commandLog.appendChild(div);
    commandLog.scrollTop = commandLog.scrollHeight; // Auto-scroll
};

// Update assistant status
const updateStatus = (status) => {
    assistantStatus.textContent = `Status: ${status}`;
};

// Start listening
document.getElementById('start-voice-btn').addEventListener("click", async () => {
    // probable error message
    const networkErrorMessage = "Please connect to your internet";
    const hardwareError = "no-speech";
    try {
        const userInput = await listenToVoice();
        if (userInput == networkErrorMessage) {
            console.log(userInput);
            speakMessage(userInput);
            logCommand('Assistant', userInput);
            return
        }

        logCommand('User', userInput);
        const assistantResponse = await generateTextWithGemini(userInput); // this where to use Gemini
        const formatedText = convertMarkdownToHTML(assistantResponse);
        console.log(formatedText);
        
        speakMessage(formatedText);
        logCommand('Assistant', formatedText);
    } catch (error) {
        logCommand('Assistant', 'An error occurred while listening.');
        console.error(error);

        if (error === hardwareError) {
            speakMessage('Please check your mic, there is a problem. I cannot listen to you.');
            return
        }
    }
});

// Stop listening
document.getElementById('stop-voice-btn').addEventListener("click", () => {
    assistantRunning = false;
    stopSpeaking();
    updateStatus('Paused');
    logCommand('Assistant', 'Assistant paused.');
    speechSynthesis.cancel()
});

// Clear log
document.getElementById('clear-voice-btn').addEventListener("click", () => {
    commandLog.innerHTML = '';
    updateStatus('Listening...');
    speechSynthesis.cancel()
});

// Shutdown assistant
const shutdownAssistant = () => {
    if (assistantRunning) {
        assistantRunning = false;
        updateStatus('Offline');
        logCommand('Assistant', 'Assistant shutting down...');
    }
};

// Modal logic
const toggleModal = (isVisible) => {
    const modal = document.getElementById('voice-modal');
    modal.classList.toggle('hide-modal', !isVisible);
};

document.getElementById('close-modal').addEventListener('click', () => toggleModal(false));
document.getElementById('open-btn').addEventListener('click', () => toggleModal(true));
