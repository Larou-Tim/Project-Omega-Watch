$(document).ready(function() {

var queryURL =  "https://pokeapi.co/api/v2/pokemon/";
// var pokemon = [];
// var pokemonPic = [];
// var numbersToPull = [9];
// var pokemonToFind;
var pokemonName = false;
var disableBool;
// var pokemonPicture;
initLoadImages = [1,9,150,'magikarp'];

var pokemonPalette = {};


// imageSearch(12);
// setTimeout(function(){
//  disableBool = true;
for (var j = 0 ; j < initLoadImages.length; j++) {
  disableBool = true;
  pokemonToFind = initLoadImages[j];
  imageSearch(pokemonToFind);

}
// }, 2000);

$("body").on("click",".pokemonBox", function() {
  console.log(this);
  console.log($(this).attr("pokemonName"));
  var curPokemonPaletter = $(this).attr("pokemonName");
  console.log(pokemonPalette[curPokemonPaletter]);
  generatePaletteDOM(pokemonPalette[curPokemonPaletter]);

})

$("#search-button").on("click",function() {

  if (!disableBool) {
    disableBool = true;
// function searchButton() {
  var pokemonToFind = $("#search-param").val().trim().toLowerCase();
  if (pokemonToFind != "") {
    imageSearch(pokemonToFind);
  }
  }

});

function imageSearch(val) {
 
    // console.log(pokemonToFind);
  
    $.ajax({
          url: (queryURL + val),
          method: "GET"
        }).done(function(response) { 
           pokemonName = response.name;
           pokemonPicture = response.sprites.front_default;
           console.log(pokemonPicture);
          // console.log(pokemonPicture);
          try {
            createPokemon(pokemonName,pokemonPicture);
          }
          catch(err) {
            console.log('error');
          }
        });
  }



function createPokemon(name,picture) {
  try {

      var colorPal = [];
      var pokemonHolder = $("<div>");
      pokemonHolder.attr("class","panel panel-primary pokemonBox");

      var pokemonSpot = $("<div>");
      pokemonSpot.attr("class","panel-body");

      var panelHeader = $("<div>");
      panelHeader.attr("class","panel-heading");
      panelHeader.text(name);

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
      pokemonImage.attr("src", picture);
      pokemonImage.attr('width',"150px");
      pokemonImage.attr('height','150px');
      pokemonImage.attr('crossOrigin','Anonymous');
      pokemonImage.crossOrigin = "Anonymous";

      img2 = document.createElement('img');
      img2.setAttribute('src', picture);

      img2.setAttribute('width', '200px');
      img2.setAttribute('height', '200px');
      img2.crossOrigin = "Anonymous";

      // img2.onload = function() {
      img2.addEventListener('load', function() {
        var colorThief = new ColorThief();
        var domColor = colorThief.getColor(img2);
        var palette = colorThief.getPalette(img2);
        var domColorBox = $("<p>");
        var domPBox = $("<p>");
        var rbgCode = "rgb(" + domColor[0] + "," + domColor[1] + "," + domColor[2]+")" ;

        colorPal.push(rbgCode);
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
          colorPal.push(rbgCode);

      //             midColRow.append(pBox);
          colorBox.attr("class", "colorBox");
          colorBox.css("background-color",rbgCode);
          leftColRow.append(colorBox);
        }

        // console.log(colorThief.getColor(img2));
        // console.log(colorThief.getPalette(img2));

      
      });
      console.log(colorPal);

      pokemonPalette[name] = colorPal;
      console.log(pokemonPalette);

      rightCol.append(pokemonImage);
      leftCol.append(leftColRow);
      // midCol.append(midColRow);
      rowPlace.append(leftCol);
      // rowPlace.append(midCol);
      rowPlace.append(rightCol);
      pokemonSpot.append(rowPlace);
      pokemonHolder.attr("pokemonName",name);
      pokemonHolder.append(panelHeader);
      pokemonHolder.append(pokemonSpot);
      $("#imagePlace").append(pokemonHolder);
      disableBool = false;

  }

  catch (error) {
    console.log("Error message");
  }

  }


var colors = ["#1D3E8C", "#d43C58", "#D9F9A5", "#FFEBD6", "#A3C4BC"];

  // Initialize a hard coded object of CSS Variable "human" name and Logical name
  var cssVariableObject = {
    "Paragraph Text": "--paragraph-color",
    "Background Color": "--bg-color",
    "Header Color": "--header-color"
  }

  // Generate the color to DOM elements and append to palette-box
  // Function accepts an array of colors.
  function generatePaletteDOM(colorsArray) {
    // If relevant, clears container.
    $(".palette-box").empty();

    for (var i = 0; i < colorsArray.length; i++) {
      var outputColor = $("<div>");
      var outputContainer = $("<div>");

      // Generating the color swatch.
      // Adds class for later use and attributes for storing color value.
      outputColor.addClass("palette-color");
      outputColor.attr("data-color-value", colorsArray[i]);
      outputColor.css("background-color", colorsArray[i]);

      // Add drag function with jQueryUI API
      // This uses functionality from HTML5 native drag and drop.
      // Clone retains the position of the original color
      outputColor.draggable({
        helper: "clone",
      });

      // Adding classes and modifying outpur container DOM.
      outputContainer.append(outputColor);
      outputContainer.addClass("inline-block swatch-container");
      outputContainer.append($("<p>").text(colorsArray[i]).addClass("text-center"));
      $(".palette-box").append(outputContainer);
    } 
  }

  // Function for generating drop in boxes corresponding to CSS variables, as well as a display name.
  function generateStyleDOM(styleObject){
    $(".style-container").empty();
    var elementNameArray = Object.keys(styleObject);

    // Iterate over names of keys in objects.
    for (var i = 0; i < elementNameArray.length; i++) {
      var outputContainer = $("<div>").addClass("style-box inline-block");
      var outputColorHolder = $("<div>").addClass("color-holder");
      outputColorHolder.attr("data-css-var", styleObject[elementNameArray[i]]);

      // Initialize Drop functionality
      outputColorHolder.droppable();

      // Building the output DOM object
      outputContainer.append($("<p>").text(elementNameArray[i]).addClass("element-affected text-center"));
      outputContainer.append(outputColorHolder);

      $(".style-container").append(outputContainer);
    }
  }

  // Event handling for dropping in colors. 
  // ui is a jqueryUI object of Jquery objects. 
  // ui.draggable selects the dragged element.
  // We take it's color value.
  $(document).on("drop", ".color-holder", function(event, ui){
    var outputCSSVar = $(this).attr("data-css-var");
    var outputCSSColor = ui.draggable.attr("data-color-value");
    
    // Change the color of the dragged onto box.
    $(this).css("background-color", outputCSSColor);
    // Change the CSS Variables dynamically.
    $("html").get(0).style.setProperty(outputCSSVar, outputCSSColor);
});
});