import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth,GoogleAuthProvider,signInWithPopup } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
  
  const firebaseConfig = {
    apiKey: "AIzaSyARGf6WXm230iYZjkWTC1bZCwLpTbUrDzU",
    authDomain: "login-page-9154d.firebaseapp.com",
    projectId: "login-page-9154d",
    storageBucket: "login-page-9154d.firebasestorage.app",
    messagingSenderId: "167416906935",
    appId: "1:167416906935:web:8f37217e6402bd2e02f932"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  auth.languageCode = 'en';
  const provider = new GoogleAuthProvider();
  // Google Login (for Login form)
  const loginButton = document.getElementById('login-button');
  if (loginButton) {
    loginButton.addEventListener('click', function() {
      signInWithPopup(auth, provider)
        .then((result) => {
          const user = result.user;
          let name = '';
          if (user.displayName) {
            name = user.displayName.split(' ')[0];
          } else if (user.email) {
            name = user.email.split('@')[0];
          }
          window.location.href = `welcome.html?name=${encodeURIComponent(name)}`;
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.customData?.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
          console.error('Error during sign-in:', errorCode, errorMessage);
        });
    });
  }

  // Google Sign Up (for Sign Up form)
  const signupGoogleButton = document.getElementById('signup-google-button');
  if (signupGoogleButton) {
    signupGoogleButton.addEventListener('click', function() {
      signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          const token = credential.accessToken;
          const user = result.user;
          console.log('User signed up with Google:', user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const email = error.customData?.email;
          const credential = GoogleAuthProvider.credentialFromError(error);
          console.error('Error during Google sign-up:', errorCode, errorMessage);
        });
    });
  }

  // Email/Password Sign Up
  import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";
  const signupForm = document.getElementById('signup-form');
  if (signupForm) {
    signupForm.addEventListener('submit', function(e) {
      e.preventDefault();
      const email = document.getElementById('signup-email').value;
      const password = document.getElementById('signup-password').value;
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          let name = '';
          if (user.displayName) {
            name = user.displayName.split(' ')[0];
          } else if (user.email) {
            name = user.email.split('@')[0];
          }
          window.location.href = `welcome.html?name=${encodeURIComponent(name)}`;
        })
        .catch((error) => {
          alert('Sign up error: ' + error.message);
        });
    });
  }
  
