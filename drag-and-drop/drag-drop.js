$(document).ready(function(){
	// Initialize a hard coded array of colors
	var colors = ["#1D3E8C", "#413C58", "#D9F9A5", "#FFEBD6", "#A3C4BC"];

	// Initialize a hard coded object of CSS Variable "human" name and Logical name
	// var cssVariableObject = {
	// 	"Paragraph Text": "--para"
	// }

	// Generate the color to DOM elements and append to palette-box
	// Function accepts an array of colors.
	function generatePaletteDOM(colorsArray) {
		// If relevant, clears container.
		$(".palette-box").empty();

		for (var i = 0; i < colorsArray.length; i++) {
			var outputColor = $("<div>");
			// Adds class for later use and attributes for storing color value.
			outputColor.addClass("palette-color");
			outputColor.attr("data-color-value", colorsArray[i]);
			outputColor.text(colorsArray[i]);
			outputColor.css("background-color", colorsArray[i]);

			// Add drag function with jQueryUI API
			// This uses functionality from HTML5 native drag and drop.
			outputColor.draggable({
				helper: "clone",
				revert: true
			});

			$(".palette-box").append(outputColor);
		}	
	}

	function generateStyleContainer(styleObject){

	}

	// Adds drop functionality to DOM element.
	$(".color-holder").droppable();

	// Event handling for dropping in colors. 
	// ui is a jqueryUI object of Jquery objects. 
	// ui.draggable selects the dragged element.
	// We take it's color value.
	$(".color-holder").on("drop", function(event, ui){
		var outputCSSVar = $(this).attr("data-css-var");
		var outputCSSColor = ui.draggable.attr("data-color-value");
		
		// Change the color of the dragged onto box.
		$(this).css("background-color", outputCSSColor);
		// Change the CSS Variables dynamically.
		$("html").get(0).style.setProperty(outputCSSVar, outputCSSColor);
	});

	// Initial Palette Generation
	generatePaletteDOM(colors);





});