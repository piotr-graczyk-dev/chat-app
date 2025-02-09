# Senior React Native Recruitment Task: AI Chat Application  

## Overview  
The objective of this task is to develop a **React Native application** that includes authentication, ChatGPT integration with message streaming, file/image attachments within the chat interface, and user profile management. The application should be well-structured, maintainable, and demonstrate expertise in React Native development.  

## Requirements  

### 1. Authentication (Mocked)  
- Implement a simple login screen with **email and password authentication**.  
- Hardcoded credentials:  
  - **Email:** `test@example.com`  
  - **Password:** `password123`  
- Store login state securely.  
- Redirect users to the **chat page** after successful login.  

### 2. Chat Page with AI Integration  
- Develop a **chat interface** where users can send and receive messages.  
- Integrate **OpenAI’s ChatGPT API** (or mock responses if necessary).  
- Implement **message streaming**, ensuring partial responses are displayed as they arrive.  
- Store chat history in memory for the current session.  

#### File Upload & Sharing with ChatGPT  
- Allow users to **attach images or files** from their device within the chat interface.  
- Display a preview of the uploaded file before sending.  
- Ensure the **file is sent along with the user’s message** to ChatGPT.  
- Handle different file types appropriately and provide feedback to the user if an unsupported format is selected.  

#### Optional: Speech-to-Text  
- Implement **speech-to-text functionality** to allow users to dictate messages instead of typing.  
- Convert spoken input into text before sending it to ChatGPT.  

### 3. Profile Page  
- Display **user information** including name, email, and profile picture.  
- Allow users to **edit their profile**, with changes stored locally.  

### 4. Navigation  
- Implement **React Navigation** to enable seamless switching between the **Chat** and **Profile** pages.  
- Ensure a **navigation bar** is included for accessibility.  

## Evaluation Criteria  
Submissions will be evaluated based on the following criteria:  

- **Code Quality:** Clean, maintainable, and modular code structure.  
- **User Experience:** Smooth navigation, intuitive UI, and responsive interactions.  
- **Functionality:** Correct implementation of authentication, chat, file upload, and sharing features.  
- **Performance:** Efficient API handling for ChatGPT integration and streaming.  
- **State Management:** Proper handling of application state to ensure smooth interactions.  
- **Optional Bonus:** Implementation of speech-to-text for enhanced usability.  
