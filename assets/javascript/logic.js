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
          createPokemon();
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

    leftCol.attr("class", "col-sm-1");
    midCol.attr("class", "col-sm-2");
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

    img2 = document.createElement('img');
    img2.setAttribute('src', pokemonPicture);

    img2.setAttribute('width', '200px');
    img2.setAttribute('height', '200px');
    img2.crossOrigin = "Anonymous";

    img2.addEventListener('load', function() {
    
        var vibrant = new Vibrant(img2);
        var swatches = vibrant.swatches()
        for (var swatch in swatches) {
            if (swatches.hasOwnProperty(swatch) && swatches[swatch]) {
                console.log(swatch, swatches[swatch].getHex())
                var colorBox = $("<p>");
                var pBox = $("<p>");
                colorBox.attr("class", "colorBox")
                var hexCode = swatches[swatch].getHex();
                colorBox.css("background-color", hexCode)
                pBox.text( hexCode);
                midColRow.append(pBox);
                leftColRow.append(colorBox);

                // if (swatch == "Vibrant") {
                //  pokemonSpot.css("background-color",hexCode);
                // }
                //  if (swatch == "LightVibrant") {
                //  midColRow.css("color",hexCode);
                // }
            }
        }
    });

    rightCol.append(pokemonImage);
    leftCol.append(leftColRow);
    midCol.append(midColRow);
    rowPlace.append(leftCol);
    rowPlace.append(midCol);
    rowPlace.append(rightCol);
    pokemonSpot.append(rowPlace);
    pokemonHolder.append(panelHeader);
    pokemonHolder.append(pokemonSpot);
    $("#imagePlace").append(pokemonHolder);

}
});