# Summit Freighters App

## Getting Started
To create a new Firebase project, follow these steps:

# Prerequisites
Before we start, make sure you have:

1. A Google account (Gmail account works perfectly)
2. Node.js installed on your machine

# Create a Firebase Project
1. Go to the Firebase Console. https://console.firebase.google.com/
2. Sign in with your Google account. If you don't have one, create a free Google account.
3. Click the "Create a project" button. 
4. Enter a project name (this is the display name; Firebase will auto-generate a unique project ID). 
5. (Optional) Select your Analytics reporting location and accept the terms.
5. Click "Continue".
6. Wait for the project to be created (this takes a few moments).
7. Once created, you'll be redirected to your project's dashboard. 

# Setup your Firebase app
1. In your Firebase project dashboard, click on the web icon </>
2. Register your app by entering an app nickname - summit-freighters
3. Choose whether to set up Firebase Hosting (we'll skip this for now)
4. Click "Register app

Firebase will generate a configuration object that looks something like this:

const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "your-app-id"
};

# Download/Clone this project
1. Add a root folder called "environment"
2. Add 
      - .env
      - .env.dev
      - .env.production
3. Add this to each .env file
        VITE_APP_NAME=summit-freighters
        VITE_APP_TITLE=Summit Freighters
        VITE_APP_BASE_ROUTE="/"
        VITE_APP_API_BASE_URL=https://dummyjson.com
        VITE_APP_MEDIA_URL=https://abc.xyz
        VITE_APP_ACCESS_CONTROL_ALLOW_ORIGINS = "http://localhost:4173"
        VITE_APP_ACCESS_TOKEN_KEY = "_Auth.access-token"
        VITE_APP_REFRESH_TOKEN_KEY = "_Auth.refresh-token"
        VITE_APP_USER_ID = "USER_ID"
        VITE_APP_FIREBASE_API_KEY="FROM FIREBASE CONFIG"
        VITE_APP_FIREBASE_AUTH_DOMAIN="FROM FIREBASE CONFIG"
        VITE_APP_FIREBASE_PROJECT_ID="FROM FIREBASE CONFIG"
        VITE_APP_FIREBASE_STORAGE_BUCKET="FROM FIREBASE CONFIG"
        VITE_APP_FIREBASE_MESSAGING_SENDER_ID="FROM FIREBASE CONFIG"
        VITE_APP_FIREBASE_APP_ID="FROM FIREBASE CONFIG""
        VITE_APP_FIREBASE_MEASUREMENT_ID="FROM FIREBASE CONFIG"
4. run npm install
5. run nmp run dev
## Recommended IDE Setup


