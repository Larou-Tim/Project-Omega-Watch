// project-omega-watch
// Firebase user login authentication
// @version 1
// @author KcK
// 7 March 2017

// --------------------------------------------------------
// INITIALIZE FIREBASE
// --------------------------------------------------------
// Add @ page.html
// <script src="https://www.gstatic.com/firebasejs/3.7.0/firebase.js"></script>
<script>
  var config = {
    apiKey: "AIzaSyAxMD6UBJ-ndugLrYPQJRI-iDJECM885Fc",
    authDomain: "project-omega-watch.firebaseapp.com",
    databaseURL: "https://project-omega-watch.firebaseio.com",
    storageBucket: "project-omega-watch.appspot.com",
    messagingSenderId: "476747424670"
  };
  firebase.initializeApp(config);

// --------------------------------------------------------
// CREATE ACCOUNT
// --------------------------------------------------------
firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});

// --------------------------------------------------------
// ACCOUNT SIGN IN
// --------------------------------------------------------
firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  // ...
});

// --------------------------------------------------------
// ACCOUNT SIGN OUT
// --------------------------------------------------------
firebase.auth().signOut().then(function() {
  // Sign-out successful.
}, function(error) {
  // An error happened.
});

</script>