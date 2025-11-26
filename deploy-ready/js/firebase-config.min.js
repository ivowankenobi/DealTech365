// Firebase Configuration
// This file serves as the single source of truth for Firebase connection

const firebaseConfig = {
    apiKey: "AIzaSyB8i8SgsSzDlvc5xIOiyOco3JGUKLD6L6E",
    authDomain: "dealtech365.firebaseapp.com",
    projectId: "dealtech365",
    storageBucket: "dealtech365.firebasestorage.app",
    messagingSenderId: "222253855838",
    appId: "1:222253855838:web:e6ecf1a41577605adbb0cf",
    measurementId: "G-HEZ2Z57ZZ6"
};

// Initialize Firebase
let app;
let auth;
let db;
let analytics;

function initFirebase() {
    if (!firebase.apps.length) {
        try {
            app = firebase.initializeApp(firebaseConfig);
            console.log('✅ Firebase initialized successfully');

            // Initialize services
            auth = firebase.auth();
            db = firebase.firestore();

            if (firebase.analytics) {
                analytics = firebase.analytics();
                console.log('✅ Firebase Analytics enabled');
            }

            // Enable offline persistence for Firestore
            db.enablePersistence()
                .catch((err) => {
                    if (err.code == 'failed-precondition') {
                        console.warn('Firestore persistence failed: Multiple tabs open');
                    } else if (err.code == 'unimplemented') {
                        console.warn('Firestore persistence not supported by browser');
                    }
                });

        } catch (error) {
            console.error('❌ Firebase initialization error:', error);
        }
    } else {
        app = firebase.app();
        auth = firebase.auth();
        db = firebase.firestore();
        analytics = firebase.analytics();
    }

    return { app, auth, db, analytics };
}

// Export for use in other modules if using ES6 modules, 
// but for now we attach to window for compatibility with existing scripts
window.firebaseConfig = firebaseConfig;
window.initFirebase = initFirebase;
