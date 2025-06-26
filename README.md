# Omegle-like Web App – Backend 🌐

This project is the backend implementation for an Omegle-like web application, developed using **Node.js**, **MongoDB**, and **WebSockets**. It handles user authentication, session management, user matchmaking, and real-time video call signaling.

---

## Features 🚀

1. **User Authentication**:
   - Secure login and signup using **bcrypt** for password hashing.
   - **JWT** for session management and user authentication.

2. **Real-time Communication**:
   - **WebSockets** or **Socket.IO** for real-time connections.
   - Signaling for WebRTC peer-to-peer video call connections.

3. **Database Integration**:
   - **MongoDB** for storing user details and session data.
   - Schemas for users, active sessions, and connection history.

4. **User Matchmaking**:
   - Match users based on availability and selected country.
   - Ensure seamless user connections with edge-case handling for disconnections.

5. **Secure APIs**:
   - RESTful APIs for user authentication, profile management, and status updates.
   - Endpoints to update user availability and fetch user data.

6. **Robust Error Handling**:
   - Graceful handling of disconnections, authentication failures, and other errors.
   - Proper logging and detailed error messages.

7. **Security Measures**:
   - Input sanitization to prevent XSS and NoSQL injection attacks.
   - Secure WebSocket connections and API endpoints.
   - Implementation of rate limiting and other security best practices.

---

## Project Setup ⚙️

1. **Initialize the Project**:
   - Run `npm init` to create a new Node.js project.
   - Install dependencies: 
     ```bash
     npm install express mongoose jsonwebtoken bcrypt ws
     ```

2. **Setup Environment**:
   - Create a `.env` file for configuration (e.g., database URI, JWT secret).

3. **Run the Server**:
   - Start the backend server:
     ```bash
     node server.js
     ```

---

## APIs and WebSocket Events 📡

### APIs:
- **POST /signup**: User signup with hashed password.
- **POST /login**: User login with JWT-based authentication.
- **GET /profile**: Fetch user profile information.
- **PATCH /status**: Update user availability status.

### WebSocket Events:
- **`connection`**: Establish a new WebSocket connection.
- **`match-user`**: Find and connect users for video calls.
- **`disconnect`**: Handle user disconnection gracefully.

---

## Testing 🧪

- **Unit Testing**: Use Mocha/Chai or Jest for testing REST APIs and logic.
- **WebSocket Testing**: Test real-time interactions and event handling.

---

## Tools & Technologies 🛠️

- **Backend**: Node.js, Express.js
- **Database**: MongoDB, Mongoose
- **Authentication**: JWT, bcrypt
- **Real-time Communication**: WebSockets, Socket.IO
- **Testing**: Mocha/Chai or Jest

---

## Deliverables 📋

1. Complete Node.js backend source code.
2. API documentation and WebSocket event descriptions.
3. List of dependencies and tools used.

---

This backend demonstrates my ability to build secure, scalable, and real-time applications while following industry best practices. Feel free to contribute or reach out with questions! 🎉
