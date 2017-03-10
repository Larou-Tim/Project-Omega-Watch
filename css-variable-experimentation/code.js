$(document).ready(function(){

	function ColorsPalette(vibrant, muted, darkVibrant, darkMuted, lightVibrant){

		this.vibrant = vibrant;
		this.muted = muted;
		this.darkVibrant = darkVibrant;
		this.darkMuted = darkMuted;
		this.lightVibrant = lightVibrant;

	}

	var themeOne = new ColorsPalette("red", "blue", "yellow", "green", "purple");
	var themeTwo = new ColorsPalette("#7a4426", "#7b9eae", "#348945", "#141414", "#f3ccb4");
	var themeThree = new ColorsPalette("red", "blue", "yellow", "green", "purple");

	console.log(themeThree);

	

	function variableAssignment(paletteObject){
		// $(":root")
	}

	$(".theme-1").on("click", function(){

	})
});