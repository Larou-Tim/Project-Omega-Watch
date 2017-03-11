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
$(document).ready(function(){
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
  function loginFire(){ 
    var email = $("#email").val();
    var password = $("#password").val();
    console.log("email: "+email+" /password: "+password);
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + errorMessage);
    });
  }

  // --------------------------------------------------------
  // ACCOUNT SIGN IN
  // --------------------------------------------------------
  function registerFire(){
    if(firebase.auth().currentUser){
      firebase.auth().signout();
    } else {
      var email = $("#email").val();
      var password = $("#password").val();
      console.log("email: "+email+" /password: "+password);
    }
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      console.log(errorCode + errorMessage);
    });
  }

  // --------------------------------------------------------
  // ACCOUNT SIGN OUT
  // --------------------------------------------------------
  function logoutFire(){  
    firebase.auth().signOut().then(function() {
      console.log("signed out.");
    }, function(error) {
      console.error('Sign Out Error', error);
    });
  }
  // --------------------------------------------------------
  // ADDITIONAL: Email verification and password reset
  // --------------------------------------------------------

  //--------------------------------------------------------
  // ADDITIONAL: Listen for auth state changes on load
  // --------------------------------------------------------

  // --------------------------------------------------------
  // EVENT LISTENERS
  // --------------------------------------------------------
  console.log("Hey, this is linked right.");
  //if the login button is clicked, run the login in function
  $("#login").on("click", function(){
    console.log("login clicked");
    loginFire();
  });
  //if the register button is clicked, run the register function
  $("#register").on("click", function(){
    console.log("register clicked");
    registerFire();
  });
  //if the logout button is clicked, run the logout function
  $("#logout").on("click", function(){
    console.log("logout clicked");
    logoutFire();
  });
});