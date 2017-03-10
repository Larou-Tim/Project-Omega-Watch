$(document).ready(function(){

	// Object constructor for the color palette. Easy to add more later.
	function ColorsPalette(vibrant, muted, darkVibrant, darkMuted, lightVibrant){

		this.vibrant = vibrant;
		this.muted = muted;
		this.darkVibrant = darkVibrant;
		this.darkMuted = darkMuted;
		this.lightVibrant = lightVibrant;

	}

	// Creating some palette instances.
	var themeOne = new ColorsPalette("red", "blue", "yellow", "green", "purple");
	var themeTwo = new ColorsPalette("#7a4426", "#7b9eae", "#348945", "#141414", "#f3ccb4");
	var themeThree = new ColorsPalette("#000", "#111", "#333", "#444", "red");

	// Document object of styles to work on.
	var dynamicStyle = document.documentElement.style;

	// This can be cleaner but, illustrates the idea fine.
	// Function to set the property to the color from the palette.
	// This can be tweaked to meet aesthetic needs
	function variableAssignment(paletteObject){
		dynamicStyle.setProperty("--primary-text-color", paletteObject.darkVibrant);
		dynamicStyle.setProperty("--secondary-text-color", paletteObject.darkMuted);
		dynamicStyle.setProperty("--primary-background-color", paletteObject.vibrant);
		dynamicStyle.setProperty("--secondary-background-color", paletteObject.muted);
		dynamicStyle.setProperty("--vibrant-color", paletteObject.lightVibrant);
	}

	// On click, assign variables with the new palette's colors.
	// See style.css for more information.
	$(".theme-1").on("click", function(){
		variableAssignment(themeOne);

	})

	$(".theme-2").on("click", function(){
		variableAssignment(themeTwo);

	})

	$(".theme-3").on("click", function(){
		variableAssignment(themeThree);

	})

// Use Vanilla JS DOM control. It's more verbose but it works better.
// document.documentElement.style <- Creates object of style sheet properties.
// " " .setProperty("prop", value);
// 

});