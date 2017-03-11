$(document).ready(function() {

var queryURL =  "https://pokeapi.co/api/v2/pokemon/";
// var pokemon = [];
// var pokemonPic = [];
// var numbersToPull = [9];
var pokemonToFind;
var pokemonName;
var pokemonPicture;



$("#search-button").on("click",function() {

// function searchButton() {
  pokemonToFind = $("#search-param").val().trim().toLowerCase();
  if (pokemonToFind != "") {
    // console.log(pokemonToFind);
  
    $.ajax({
          url: (queryURL + pokemonToFind),
          method: "GET"
        }).done(function(response) { 
           pokemonName = response.name;
           pokemonPicture = response.sprites.front_default;
          // console.log(pokemonPicture);
          try {
            createPokemon();
          }
          catch(err) {
            console.log('error');
          }
        });
  }
});


function createPokemon() {

      var pokemonHolder = $("<div>");
      pokemonHolder.attr("class","panel panel-info pokemonBox");

      var pokemonSpot = $("<div>");
      pokemonSpot.attr("class","panel-body");

      var panelHeader = $("<div>");
      panelHeader.attr("class","panel-heading");
      panelHeader.text(pokemonName);

      var rowPlace = $("<div>");
      rowPlace.attr("class","row");

      var leftCol = $("<div>");
      var rightCol = $("<div>");
      var midCol = $("<div>");

      leftCol.attr("class", "col-sm-4");
      // midCol.attr("class", "col-sm-2");
      rightCol.attr("class","col-sm-4");
      leftColRow = $("<div>");
      leftColRow.attr("class", "row");
      midColRow = $("<div>");
      midColRow.attr("class", "row");

      var pokemonImage = $("<img>");
      pokemonImage.attr("src", pokemonPicture);
      pokemonImage.attr('width',"150px");
      pokemonImage.attr('height','150px');
      pokemonImage.attr('crossOrigin','Anonymous');
      pokemonImage.crossOrigin = "Anonymous";

      img2 = document.createElement('img');
      img2.setAttribute('src', pokemonPicture);

      img2.setAttribute('width', '200px');
      img2.setAttribute('height', '200px');
      img2.crossOrigin = "Anonymous";

      img2.onload = function() {
      // img2.addEventListener('load', function() {
        var colorThief = new ColorThief();
        var domColor = colorThief.getColor(img2);
        var palette = colorThief.getPalette(img2);
        var domColorBox = $("<p>");
        var domPBox = $("<p>");
        var rbgCode = "rgb(" + domColor[0] + "," + domColor[1] + "," + domColor[2]+")" ;

        domColorBox.attr("class", "colorBox");
        domColorBox.css("background-color", rbgCode  );
        domPBox.text = rbgCode;
        // midColRow.append(domPBox);
        leftColRow.append(domColorBox);

        for (var i = 0; i < palette.length; i ++) {
          var colorBox = $("<p>");
          var pBox = $("<p>");
          rbgCode = "rgb(" + palette[i][0] + "," + palette[i][1] + "," + palette[i][2]+")";
          // pBox.text( rbgCode);
          midColRow.append(pBox);

      //             midColRow.append(pBox);
          colorBox.attr("class", "colorBox");
          colorBox.css("background-color",rbgCode);
          leftColRow.append(colorBox);
        }

        console.log(colorThief.getColor(img2));
        console.log(colorThief.getPalette(img2));

      
      };



      

      rightCol.append(pokemonImage);
      leftCol.append(leftColRow);
      // midCol.append(midColRow);
      rowPlace.append(leftCol);
      // rowPlace.append(midCol);
      rowPlace.append(rightCol);
      pokemonSpot.append(rowPlace);
      pokemonHolder.append(panelHeader);
      pokemonHolder.append(pokemonSpot);
      $("#imagePlace").append(pokemonHolder);
    }


});