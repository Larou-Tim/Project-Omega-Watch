var queryURL =  "https://pokeapi.co/api/v2/pokemon/";
var pokemon = [];
var pokemonPic = [];
var numbersToPull = [1,9,6];
for (var i = 0; i < numbersToPull.length; i++){
        $.ajax({
          url: (this.queryURL + numbersToPull[i]),
          method: "GET"
        }).done(function(response) { 
           pokemon.push(response.name);
           pokemonPic.push(response.sprites.front_default);
          console.log(pokemonPic);
          // console.log('test');
        });

}

function touchy() {
	
// for (var j = 0; j < pokemon.length; j++) {
var img2 = document.createElement('img');
// img.setAttribute('src', pokemonPic[j]);
img2.setAttribute('src', 'assets/images/1.png');
img2.setAttribute('width', '200px');
img2.setAttribute('height', '200px');
// img.width("200px");
// img.height("200px");
$("#workPls").append(img2);

img2.addEventListener('load', function() {
    var vibrant = new Vibrant(img2);
    var swatches = vibrant.swatches()
    for (var swatch in swatches) {
        if (swatches.hasOwnProperty(swatch) && swatches[