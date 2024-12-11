// initialize recognition API
const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
recognition.lang = 'en-US';
recognition.interimResults = false;


// Function to check internet connectivity
function checkInternetConnection() {
    return navigator.onLine;
}

// Function to speak messages
export function speakMessage(message) {
    const utterance = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(utterance);
}

// Initialize the voice assistant
export function listenToVoice() {
    return new Promise((resolve, reject) => {
        try {
            if (!checkInternetConnection()) {
                resolve("Please connect to your internet");
                return;
            }
            
            recognition.onstart = () => {
                console.log('Voice Assistant starting');
            };

            recognition.onresult = (event) => {
                const chat = event.results[0][0].transcript;
                resolve(chat); // Resolve the Promise with the transcript
            };

            recognition.onerror = (event) => {
                console.log(event.error);
                reject(event.error); // Reject the Promise with the error
            };

            recognition.start();
        } catch (error) {
            console.log(error);
            reject('Error occurred');
        }
    });
}


export async function generateTextWithGemini(prompt) {
    const apiKey = 'AIzaSyCCnXG-F3UAXARuMlcfHdd3fCoTq-UjV6g'; // Replace with your actual API key
    const url = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + apiKey;

    const requestBody = {
        contents: [
            {
                parts: [
                    { text: prompt }
                ]
            }
        ]
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        const responseText = data['candidates'][0]['content']['parts'][0]['text']
        return responseText;
    } catch (error) {
        console.error('Error generating text:', error);
        return '';
    }
}


export function stopSpeaking() {
    window.speechSynthesis.cancel()
    
}

export function renderFormattedText(text) {
    // Replace Markdown syntax with equivalent HTML tags
    return text
        .replace(/(?:\r\n|\r|\n)/g, '<br>') // Line breaks
        .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>') // Bold text: **text**
        .replace(/__(.*?)__/g, '<i>$1</i>') // Italics: __text__
        .replace(/^# (.*?)$/gm, '<h1>$1</h1>') // Heading 1: # Heading
        .replace(/^## (.*?)$/gm, '<h2>$1</h2>') // Heading 2: ## Heading
        .replace(/^### (.*?)$/gm, '<h3>$1</h3>'); // Heading 3: ### Heading
}


export function convertMarkdownToHTML(markdown) {
    // Convert headings
    markdown = markdown.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    markdown = markdown.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    markdown = markdown.replace(/^# (.+)$/gm, '<h1>$1</h1>');

    // Convert bold and italic text
    markdown = markdown.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>'); // Bold and italic
    markdown = markdown.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>'); // Bold
    markdown = markdown.replace(/\*(.+?)\*/g, '<em>$1</em>'); // Italic

    // Convert blockquotes
    markdown = markdown.replace(/^> (.+)$/gm, '<blockquote>$1</blockquote>');

    // Convert unordered lists
    markdown = markdown.replace(/^\s*[-*+] (.+)$/gm, '<ul><li>$1</li><br></ul>');
    markdown = markdown.replace(/<\/ul>\s*<ul>/g, ''); // Merge adjacent <ul> tags

    // Convert ordered lists
    markdown = markdown.replace(/^\s*\d+\. (.+)$/gm, '<ol><li>$1</li></ol>');
    markdown = markdown.replace(/<\/ol>\s*<ol>/g, ''); // Merge adjacent <ol> tags

    // Convert links
    markdown = markdown.replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank">$1</a>');

    // Convert inline code
    markdown = markdown.replace(/`(.+?)`/g, '<code>$1</code>');

    // Convert code blocks
    markdown = markdown.replace(/```([\s\S]*?)```/g, '<pre><code>$1</code></pre>');

    // Convert horizontal lines
    markdown = markdown.replace(/^---$/gm, '<hr>');

    return markdown;
}