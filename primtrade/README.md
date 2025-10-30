# Tech stack
frontend - react(vite)
Styling - TailwindCSS
Backend - Node.js, Express.js
Database - MongoDB
Authentication - JWT+ bcrypt

# Scripts
npm install -  Installs backend/ frontend dependencies 
npm run dev -  Runs backend with nodemon     
npm start - Runs backend with Node.js     
npm run dev - Starts React app on http://localhost:5173
npm run build - Builds production bundle

# Authentication Flow
*Signup*
- User fills name, userName, emailId, - password
- Frontend → POST /auth/signup
- Backend hashes password using bcrypt
- New user stored in MongoDB
* Response: User created successfully

*Login*
- Frontend → POST /auth/login with credentials
- Backend:
    * Verifies email and password
    * Generates JWT token (user.getJWT())
    * Stores token in browser cookies

* Response: Login successful with token

*Auth Check*

- Frontend requests /me with credentials: include

- Middleware userAuth:
* Extracts JWT from cookies
* Verifies token → finds user in DB
* If valid → returns user profile

- Used to persist login sessions

*Logout*

- Frontend → POST /auth/logout

- Backend clears the token cookie

# Components
***App.jsx***
Checks authentication by calling /me
Shows:
Dashboard if logged in
Login / Signup otherwise

***Dashboard.jsx***
Fetches user profile and displays it
Contains <Note /> component to manage user’s notes

***Note.jsx***
Handles fetchNotes, addNote, updateNote, deleteNote using backend routes