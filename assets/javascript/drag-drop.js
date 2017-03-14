// Require JqueryUI in HTML head.
// Require (for now), pre-declared CSS Variables in :root or html selector in CSS file.

// $(document).ready(function(){
	// Initialize a hard coded array of colors
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

	// Initial Palette Generation
	generatePaletteDOM(colors);
	generateStyleDOM(cssVariableObject);





// });