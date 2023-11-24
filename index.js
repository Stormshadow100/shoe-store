//Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDYJfqqpVfIuX4m4DKnb0IbfRg_DYz6390",
  authDomain: "shoe-store-10170.firebaseapp.com",
  databaseURL: "https://shoe-store-10170-default-rtdb.firebaseio.com",
  projectId: "shoe-store-10170",
  storageBucket: "shoe-store-10170.appspot.com",
  messagingSenderId: "893603725320",
  appId: "1:893603725320:web:fa4ef450520a69e876d1bd"
};

      // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  const auth = firebase.auth();
  const database = firebase.database();

  // Register a user
  function register() {
    const email = document.getElementById('regEmail').value;
    const password = document.getElementById('regPassword').value;
    const username = document.getElementById('regUsername').value;

    // Validate input fields
    if (!validatePassword(password)) {
      alert('Password is too short');
      return;
    }

    if (!validateField(username)) {
      alert('Please check your username');
      return;
    }

    // Proceed with user registration using Firebase Auth
    auth.createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        // Add the user to the Firebase Realtime Database
        const databaseRef = database.ref('users/' + user.uid);
        const userData = {
          Email: email,
          Username: username,
          last_login: Date.now()
        };
        return databaseRef.set(userData);
      })
      .then(() => {
        alert('User created and data added to database!');
        // Redirect to the homepage after successful registration
        window.location.href = "index.html";
      })
      .catch((error) => {
        alert('Failed to register user: ' + error.message);
      });
  }

  // Login a user
  function login() {
    const email = document.getElementById('loginEmail').value;
    const password = document.getElementById('loginPassword').value;

    // Proceed with user login using Firebase Auth
    auth.signInWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Redirect to the homepage after successful login
        window.location.href = "index.html";
      })
      .catch((error) => {
        alert('Failed to login: ' + error.message);
      });
  }

  // Validation functions
  function validatePassword(password) {
    return password.length >= 6;
  }

  function validateField(field) {
    return field && field.length > 0;
  }