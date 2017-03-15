$(document).ready(function() {

  var queryURL =  "https://pokeapi.co/api/v2/pokemon/";
  var pokemonName = false;
  //prevents user from running too much at once 
  var disableBool;
  var initLoadImages = [1,9,150,'magikarp'];
  var pokemonPalette = {};

   var cssVariableObject = {   
        "Paragraph Text": "--paragraph-text-color",
        "Header Text": "--header-text-color",
        "Body BG Color": "--body-bg-color",
        "Div BG Color": "--div-bg-color",
        "Border Color": "--border-color",
        "Box Shadow Color": "--div-box-shadow-color"
    }

// --------------------------------------------------------
// INITIAL QUERY
// --------------------------------------------------------

  // gives the user initial styles to look at *** update for loading popular
  for (var j = 0 ; j < initLoadImages.length; j++) {
    disableBool = true;
    pokemonToFind = initLoadImages[j];
    imageSearch(pokemonToFind);
  }


// --------------------------------------------------------
// PANEL SLIDE DOWN AND STYLE GENERATION
// --------------------------------------------------------

  // based on a pokemon palete, user can select one to try altering a page
  $("body").on("click",".pokemonBox", function() {
    var curPokemonPaletter = $(this).attr("pokemonName");
    generatePaletteDOM(pokemonPalette[curPokemonPaletter]);
    generateStyleDOM(cssVariableObject);
    $("#lowerBody").slideDown("slow");


  });

// --------------------------------------------------------
// SEARCH HANDLER
// --------------------------------------------------------
  //primary search button to look for pokemon name/number
  //creating new array for all previous searched pokemon names and numbers
  var alreadySearched = [];

  //on clicking the button
  $("#search-button").on("click",function() {
      searchHandler();
  });

  // on hitting enter
  $(document).keypress(function(e) {
    if(e.which == 13) {
        searchHandler();
    }
});

    function searchHandler () {
       if (!disableBool) {
          disableBool = true;
          var pokemonToFind = $("#search-param").val().trim().toLowerCase();
          var indexPokemon = alreadySearched.indexOf(pokemonToFind);

          console.log(indexPokemon, alreadySearched);

          if (pokemonToFind != "" && indexPokemon == -1) {
            imageSearch(pokemonToFind);
          }
        }
    }

// --------------------------------------------------------
// HOVER EFFECTS WITH JQUERY
// --------------------------------------------------------

 $("body").on("mouseenter", ".pokemonBox", function() {
    // starts hover effect
    $(".pokemonInfo",this).css("opacity", "0.15");
    $('.hoverLook', this).css("opacity", "1");
    $('.hoverSave', this).css("opacity", "1");

});

$("body").on("mouseleave", ".pokemonBox", function() {
    // removes hover
    $(".pokemonInfo",this).css("opacity", "1");
    $('.hoverLook', this).css("opacity", "0");
    $('.hoverSave', this).css("opacity", "0");
});

$("#create-file").on("click", function(){
  getSelectedStyleVariables();
  $("#download-link").slideDown("slow");
});

// --------------------------------------------------------
// AJAX FOR POKEMON API 
// --------------------------------------------------------
  function imageSearch(val) {
      $.ajax({
            url: (queryURL + val),
            method: "GET"
          }).done(function(response) { 
              //returns name and picture from API
             pokemonName = response.name;
             pokemonPicture = response.sprites.front_default;
             
             //creating searched images and prevent duplicates (as it errors)
             alreadySearched.push(pokemonName);
             alreadySearched.push(response.id);


            try {
              createPokemon(pokemonName,pokemonPicture);
            }
            catch(err) {
              console.log('error');
            }
          });
    }


// --------------------------------------------------------
// COLOR PALETTE PANAL CREATION
// --------------------------------------------------------

  function createPokemon(name,picture) {
    try {
        // this array will hold all the colors in complete rgb format
        var colorPal = [];
        
        
        // --------------------------------------------------------
        // CREATION OF ALL DIVS CLASSES
        // --------------------------------------------------------
          //might be able to clean up this code and use less
        //creates outer div of the panel

        var pokemonHolder = $("<div>");
        pokemonHolder.attr("class","panel panel-primary pokemonBox");
        //creates inner div of the panel
        var pokemonSpot = $("<div>");
        pokemonSpot.attr("class","panel-body");
        
        
        //creates header of panel for pokemon name
        var panelHeader = $("<div>");
        panelHeader.attr("class","panel-heading");
        panelHeader.text(name);

        var rowPlace = $("<div>");
        rowPlace.attr("class","row pokemonInfo");
        // pokemonBlockBody.attr("class","pokemonInfo")

        var leftCol = $("<div>");
        var rightCol = $("<div>");
        var midCol = $("<div>");
        //creates the hidden context menu for when user hovers over
        var hoverLookBox = $("<div>");
        hoverLookBox.attr("class","hoverLook");
        var hoverLookText = $("<div>");
        hoverLookText.attr("class","text");
        var hoverLookGlyph = $("<span>");
        
        hoverLookGlyph.attr("class","glyphicon glyphicon-search");
        hoverLookGlyph.attr("aria-hidden","true");
        hoverLookText.append(hoverLookGlyph);
        hoverLookBox.append(hoverLookText);

        var hoverSaveBox = $("<div>");
        hoverSaveBox.attr("class","hoverSave");
        var hoverSaveText = $("<div>");
        hoverSaveText.attr("class","text");


        var hoverSaveGlyph = $("<span>");
        hoverSaveGlyph.attr("class","glyphicon glyphicon-floppy-save");
        hoverSaveGlyph.attr("aria-hidden","true");
        hoverSaveText.append(hoverSaveGlyph);
        hoverSaveBox.append(hoverSaveText);

        // creates the columns for organization
        leftCol.attr("class", "col-sm-4");
        rightCol.attr("class","col-sm-4");
        leftColRow = $("<div>");
        leftColRow.attr("class", "row");
        midColRow = $("<div>");
        midColRow.attr("class", "row");
        //creates img that is used for display
        var pokemonImage = $("<img>");
        pokemonImage.attr("src", picture);
        // pokemonImage.attr('width',"150px");
        // pokemonImage.attr('height','150px');
        pokemonImage.attr("class","displayImage");
        pokemonImage.attr('crossOrigin','Anonymous');
        pokemonImage.crossOrigin = "Anonymous";
        

        // --------------------------------------------------------
        // COLOR THIEF
        // --------------------------------------------------------
        //creates img that is used in color theif for palette creation (200px seems sweet spot)
        img2 = document.createElement('img');
        img2.setAttribute('src', picture);
        img2.setAttribute('width', '200px');
        img2.setAttribute('height', '200px');
        img2.crossOrigin = "Anonymous";


        // jquery load causes more issues on load functionality
        //load function waits for img to compelete before running color thief
        //color thief returns a dominent color as well as a palette of colors
        img2.addEventListener('load', function() {
          var colorThief = new ColorThief();
          var domColor = colorThief.getColor(img2);
          var palette = colorThief.getPalette(img2);
          //p tags hold the color display boxes
          var domColorBox = $("<p>");
          var domPBox = $("<p>");
          //color thief returns array of the RGB colors this allows for them to be used in CSS
          var rbgCode = "rgb(" + domColor[0] + "," + domColor[1] + "," + domColor[2]+")" ;
          //pushes palette to array
          colorPal.push(rbgCode);
          domColorBox.attr("class", "colorBox");
          domColorBox.css("background-color", rbgCode  );
          domPBox.text = rbgCode;
            // pbox would be the text, however this clutters the display
          // midColRow.append(domPBox);
          leftColRow.append(domColorBox);

          //palette returns an array of all the colors used, this performs same actions as dom color
          //but on the entire array returned
          for (var i = 0; i < palette.length; i ++) {
            var colorBox = $("<p>");
            var pBox = $("<p>");
            rbgCode = "rgb(" + palette[i][0] + "," + palette[i][1] + "," + palette[i][2]+")";
            // pBox.text( rbgCode);
            midColRow.append(pBox);
            colorPal.push(rbgCode);

        //             midColRow.append(pBox);
            colorBox.attr("class", "colorBox");
            colorBox.css("background-color",rbgCode);
            leftColRow.append(colorBox);
          }

        
        });

         // --------------------------------------------------------
        // APPEND TO DOCUMENT
        // --------------------------------------------------------
        //appends all of the elements together to display 
        pokemonPalette[name] = colorPal;
        // console.log(pokemonPalette);
        rightCol.append(pokemonImage);
        leftCol.append(leftColRow);
        rowPlace.append(leftCol);
        rowPlace.append(rightCol);
        pokemonSpot.append(rowPlace);

        pokemonHolder.attr("pokemonName",name);
        pokemonSpot.append(hoverLookBox);
        pokemonSpot.append(hoverSaveBox);

        pokemonHolder.append(panelHeader);
        pokemonHolder.append(pokemonSpot);
        $("#imagePlace").append(pokemonHolder);
        disableBool = false;

    }

    catch (error) {
      console.log("Error message");
    }

    }



});