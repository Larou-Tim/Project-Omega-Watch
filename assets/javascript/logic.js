$(document).ready(function() {

  var queryURL =  "https://pokeapi.co/api/v2/pokemon/";
  var pokemonName = false;
  //prevents user from running too much at once 
  var disableBool;
  var initLoadImages = [1,9,150,'magikarp'];
  var pokemonPalette = {};

  // gives the user initial styles to look at
  for (var j = 0 ; j < initLoadImages.length; j++) {
    disableBool = true;
    pokemonToFind = initLoadImages[j];
    imageSearch(pokemonToFind);
  }

  // based on a pokemon palete, user can select one to try altering a page
  $("body").on("click",".pokemonBox", function() {
    var curPokemonPaletter = $(this).attr("pokemonName");
    generatePaletteDOM(pokemonPalette[curPokemonPaletter]);
    $("#lowerBody").slideDown("slow");


  });

  //primary search button to look for pokemone name/number
  $("#search-button").on("click",function() {
    if (!disableBool) {
      disableBool = true;
      var pokemonToFind = $("#search-param").val().trim().toLowerCase();
      if (pokemonToFind != "") {
        imageSearch(pokemonToFind);
      }
    }
  });

 $("body").on("mouseenter", ".pokemonBox", function() {
    // starts hover effect
    $(".panel-body",this).css("opacity", "0.3");



});

$("body").on("mouseleave", ".pokemonBox", function() {
    // removes hover
    $('.middle', this).css("opacity", "0");
    $(".panel-body",this).css("opacity", "1");
});

  //ajax serach request that reaches to pokeAPI 
  function imageSearch(val) {
      $.ajax({
            url: (queryURL + val),
            method: "GET"
          }).done(function(response) { 
              //returns name and picture from API
             pokemonName = response.name;
             pokemonPicture = response.sprites.front_default;
            try {
              createPokemon(pokemonName,pokemonPicture);
            }
            catch(err) {
              console.log('error');
            }
          });
    }


    //primary function to create panal based on pokemon searched for
  function createPokemon(name,picture) {
    try {
        // this array will hold all the colors in complete rgb format
        var colorPal = [];
        //creates outer div of hte panel
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
        rowPlace.attr("class","row");

        var leftCol = $("<div>");
        var rightCol = $("<div>");
        var midCol = $("<div>");
        //creates the hidden context menu for when user hovers over
        var hoverBox = $("<div>");
        hoverBox.attr("class","middle");
        var hoverText = $("<div>");
        hoverText.attr("class","text");
        var hoverGlyph = $("<span>");
        hoverGlyph.attr("class","glyphicon glyphicon-search");
        hoverGlyph.attr("aria-hidden","true");
        hoverText.append(hoverGlyph);
        hoverBox.append(hoverText);
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
        pokemonImage.attr('width',"150px");
        pokemonImage.attr('height','150px');
        pokemonImage.attr('crossOrigin','Anonymous');
        pokemonImage.crossOrigin = "Anonymous";
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
        //appends all of the elements together to display 
        pokemonPalette[name] = colorPal;
        rightCol.append(pokemonImage);
        leftCol.append(leftColRow);
        rowPlace.append(leftCol);
        rowPlace.append(rightCol);
        pokemonSpot.append(rowPlace);
        pokemonHolder.attr("pokemonName",name);
        pokemonHolder.append(hoverBox);
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