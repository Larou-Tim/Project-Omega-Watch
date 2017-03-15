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
  // ACCOUNT SIGN IN
  // --------------------------------------------------------
  function loginFire(){ 
    var email = $("#email").val();
    var password = $("#password").val();
    $("#message").html("Logged in as "+email);
    hide();
    firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      $("#message").html(errorMessage);
      unhide();
    });
  }

  // --------------------------------------------------------
  // CREATE ACCOUNT
  // --------------------------------------------------------
  function registerFire(){
    if(firebase.auth().currentUser){
      firebase.auth().signout();
    } else {
      var email = $("#email").val();
      var password = $("#password").val();
	    $("#message").html("You are registered!");
	    unhide();
    }
    firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
      // Handle Errors here.
      var errorCode = error.code;
      var errorMessage = error.message;
      $("#message").html(errorMessage);
      unhide();
    });
  }

  // --------------------------------------------------------
  // ACCOUNT SIGN OUT
  // --------------------------------------------------------
  function logoutFire(){  
    firebase.auth().signOut().then(function() {
      $("#message").html("You are signed out!");
      signedOut();
    }, function(error) {
      $("#message").html(error);
      unhide();
    });
  }

  // --------------------------------------------------------
  // ADDITIONAL: Password reset
  // --------------------------------------------------------
  

  // --------------------------------------------------------
  // EVENT LISTENERS: Listens to auth button state changes
  // --------------------------------------------------------
  //if the login button is clicked, run the login in function
  $("#login").on("click", function(){
    loginFire();
  });
  //if the register button is clicked, run the register function
  $("#register").on("click", function(){
    registerFire();
  });
  //if the logout button is clicked, run the logout function
  $("#logout").on("click", function(){
    logoutFire();
  });

  // --------------------------------------------------------
  // FUNCTIONS
  // --------------------------------------------------------
  function unhide(){
  	$("#message").css("visibility", "visible");
  }//makes message form visible to display error message
  function hide(){//hide login buttons
    $("#register").css("visibility", "hidden");
    $("#login").css("visibility", "hidden");
    $("#email").css("visibility", "hidden");
    $("#password").css("visibility", "hidden");
    $("#message").css("visibility", "visible");
  }
  function signedOut(){
    unhide();
    $("#register").css("visibility", "visible");
    $("#login").css("visibility", "visible");
    $("#email").css("visibility", "visible");
    $("#password").css("visibility", "visible");
  }
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  // --------------------------------------------------------
  // DATABASE: Trending, Popularity, Profile
  // --------------------------------------------------------
//++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  //INITIALIZE
  var database = firebase.database();
  //recently most looked at
  var trending = {};
  var trendName = "";
  var trendAmount = 0;
  //most saved to profile
  var popularity = [];

  // --------------------------------------------------------
  // hoverLook search button clicked
  // --------------------------------------------------------
  $("body").on("click", ".hoverLook", function(){
    //get the name of pokemon from parent box
    trendName = $(this).parent().attr("pokemonName");
    //get the amount already looked @ from database if exists
    //add 1 to trend amount
    //get the current top 4 looked at & compare trend amount
    //if it is greater than the 4th spot, then replace #4
    //if it already exists check the spot above it to see if swap
    //then update firebase database
    database.ref().push({
    });
  });

  // --------------------------------------------------------
  // hoverSave search button clicked
  // --------------------------------------------------------
  //same concept as hoverLook but permanent & on save

  //THEN add functions for storing the colors to the user id

});