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

  //if they are revisiting the page, make sure they are logged out
  logoutFire();
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
      signedOut();
    });
  }

  // --------------------------------------------------------
  // CREATE ACCOUNT
  // --------------------------------------------------------
  function registerFire(){
    if(firebase.auth().currentUser){
      firebase.auth().signOut();
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
  var trending = [];
  var popularity = [];
  var profile = [];

  //IF DATABASE GETS FUCKED UP -> THIS RESETS IT
  // trending = [
  //   {name:"blank", looks:0}
  // ];
  // popularity = [
  //   {name:"blank", saves:0}
  // ];
  // profile = [
  //   {name:"blank", savedPokemon:["temp"]}
  // ];
  // database.ref().set({
  //       trending: trending,
  //       popularity: popularity,
  //       profile: profile
  // });
  database.ref().once("value", function(snapshot){
      trending = snapshot.val().trending;
      popularity = snapshot.val().popularity;
      profile = snapshot.val().profile;
  });
  var pokeName;
  var pokeLook;
  var pokeSave;

  // --------------------------------------------------------
  // hoverLook search button clicked
  // --------------------------------------------------------
  $("body").on("click", ".hoverLook", function(){
    //get the name of pokemon from parent box
    pokeName = $(this).parent().parent().attr("pokemonName");
    //check each pokemon name in the array to see if the looked at one is there
    var exists = 0;
    database.ref().once("value", function(snapshot){
      trending = snapshot.val().trending;
      for(i=0; i<trending.length; i++){
        if(trending[i].name == pokeName){ //add amount to that name
          trending[i].looks++;
          exists = 1;
        }
      }
      //if the pokemon hasnt been looked at yet then add it
      if(exists == 0){
        trending.push({name:pokeName, looks:1});
      }
      database.ref().set({
        trending: trending,
        popularity: popularity,
        profile: profile
      });
    });
  });

  // --------------------------------------------------------
  // hoverSave search button clicked
  // --------------------------------------------------------
  //same concept as hoverLook but permanent & on save
  $("body").on("click", ".hoverSave", function(){
    //CHECK IF THEY ARE LOGGED IN
    var user = firebase.auth().currentUser;
    // console.log("User: "+user);
      // $("#message").css("visibility", "hidden");
      //if yes continue
      if(user){
        //get the name of pokemon from parent box
        pokeName = $(this).parent().parent().attr("pokemonName");
        //check each pokemon name in the array to see if the looked at one is there
        database.ref().once("value", function(snapshot){
          popularity = snapshot.val().popularity;
          // console.log("popularity: "+popularity);
          profile = snapshot.val().profile;
          // console.log("profile: "+profile);
          var exists = 0;
          for(i=0; i<popularity.length; i++){
            if(popularity[i].name == pokeName){ //add amount to that name
              popularity[i].saves++;
              exists = 1;
            }
          }
          // console.log("exists: "+exists);
          //if the pokemon hasnt been looked at yet then add it
          if(exists == 0){
            popularity.push({name:pokeName, saves:1});
          }
          //add their profile and pokemon saves
          var userElement = $("#email").val();
          var userExists = false;
         	for(var i=0; i<profile.length; i++){
	            if(profile[i].name == userElement){
	            	userExists = true;
	              //check if pokemon save already exists
	              var exists = false;
		            for(var j=0; j<profile[i].savedPokemon.length; j++){
		                if(profile[i].savedPokemon[j] == pokeName){
		                  //then do nothing because its already been saved
		                  $("#message").html("Already saved.");
		                  unhide();
		                  exists = true;
		                }
		                else if((j+1)== profile[i].savedPokemon.length && exists == false){
		                  //if the pokemon save doesn't exist then add it
		                  profile[i].savedPokemon.push(pokeName);
		                  $("#message").html("Pokemon saved to profile.");
		                  unhide();
		                  break;
		                }
		            }
	            }
	            else if((i+1)==profile.length && userExists == false){
	              profile[i+1]={name:userElement,savedPokemon:[pokeName]};
	              $("#message").html("Pokemon saved to profile.");
	              unhide();
	              break;
	            }
          	}

          database.ref().set({
            trending: trending,
            popularity: popularity,
            profile: profile
          });
        });
      } 
      //if not give a notification to login for saves
      else {
        $("#message").css("visibility", "visible");
        $("#message").html("You need to login to save.");
      }
  });
  
  // --------------------------------------------------------
  // Detects database updates & sorts data
  // --------------------------------------------------------
  database.ref().on("value", function(snapshot){
    trending = snapshot.val().trending;
    popularity = snapshot.val().popularity;
    profile = snapshot.val().profile;

    //Bubble sort trending.looks 
    var swapped;
    do{
      swapped = false;
      for(var i=0; i<trending.length-1; i++){
        if(trending[i].looks > trending[i+1].looks){
          var temp = trending[i];
          trending[i] = trending[i+1];
          trending[i+1] = temp;
          swapped = true;
          database.ref().set({
            trending: trending,
            popularity: popularity,
            profile: profile
          });
        }
      }
    }while(swapped);

    //bubble sort popularity.saves 
    var swapped;
    do{
      swapped = false;
      for(var i=0; i<popularity.length-1; i++){
        if(popularity[i].saves > popularity[i+1].saves){
          var temp = popularity[i];
          popularity[i] = popularity[i+1];
          popularity[i+1] = temp;
          swapped = true;
          database.ref().set({
            trending: trending,
            popularity: popularity,
            profile: profile
          });
        }
      }
    }while(swapped);
  });

  // --------------------------------------------------------
  // Trending & Popularity buttons clicked -> ref database
  // --------------------------------------------------------
  $("#trending").on("click", function(){
        database.ref().once("value", function(snapshot){
          var trending = snapshot.val().trending;
          // console.log("Full trending: "+trending);
          var i = trending.length - 1;
          var j = 0;
          var top4 = [];
          for(i; j<4; j++){
          	// console.log("Top4: #"+j+" : "+trending[i].name);
          	top4[j] = trending[i].name;
            i--;
          }
          // console.log("top4 list: "+top4);
          $("#message").html("trending: "+top4);
		  unhide();
        }); 
  });

  $("#popular").on("click", function(){
        database.ref().once("value", function(snapshot){
          var popular = snapshot.val().popularity;
          // console.log("Full popular: "+popular);
          var i = popular.length - 1;
          var j = 0;
          var top4 = [];
          for(i; j<4; j++){
          	// console.log("Top4: #"+j+" : "+popular[i].name);
          	top4[j] = popular[i].name;
            i--;
          }
          // console.log("top4 list: "+top4);
          $("#message").html("popular: "+top4);
		  unhide();
        });
  });

  // --------------------------------------------------------
  // Profile buttons clicked -> ref database kck
  // --------------------------------------------------------
  //get a snapshot of their profile and display their saved pokemon
  $("#profile").on("click", function(){
    //CHECK IF THEY ARE LOGGED IN
    var user = firebase.auth().currentUser;
      //if yes continue
      if(user){
        database.ref().once("value", function(snapshot){
          profile = snapshot.val().profile;
          //check if user exists in the profile database
          var userElement = $("#email").val();
          var userExists = false;
          var saves = [];
          for(var i=0; i<profile.length; i++){
              if(profile[i].name == userElement){
                userExists = true;
                //if user exists, look through their saves
                saves = profile[i].savedPokemon;
                console.log(saves);  
                $("#message").html("Saves: "+saves);
                unhide();            
            }//if user doesn't exist then add them to profile
              else if((i+1)==profile.length && userExists == false){
                $("#message").html("You don't have saved pokemon yet.");
                unhide();
                break;
              }
            }
        });
      } 
      //if not give a notification to login for saves
      else {
        $("#message").css("visibility", "visible");
        $("#message").html("You need to login for profile.");
      }
  });

});//end document ready