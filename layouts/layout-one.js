$(document).ready(function(){
	// Initialize a hard coded array of colors
	var colors = ["#aceace", "#4f14f1", "#5d25c2", "#d4ad4a", "#eaeb12"];

	// Makes color-holder a drop acceptor
	// $(".color-holder").droppable({
	// 	drop: dropHandler
	// });

	// Generate the color to DOM elements and append to palette-box
	function generatePaletteDOM(colorsArray) {
		$(".palette-box").empty();

		for (var i = 0; i < colorsArray.length; i++) {
			var outputColor = $("<div>");
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

	// function dropHandler(event, ui){
	// 	console.log(ui);
	// }

	$(".color-holder").droppable();
	$(".color-holder").on("drop", function(event, ui){
		console.log($(this).attr("data-css-var"));
	});

	generatePaletteDOM(colors);

	// Modify the generation to add classes for drag and drop.





});