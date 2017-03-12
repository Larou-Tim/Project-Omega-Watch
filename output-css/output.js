// To do, build a color-value data into the holder to store color data as well. Then default it to initial to prevent errors to css file.

$(document).ready(function(){
    // Begin code of drag and drop example
    // Initialize a hard coded array of colors
    var colors = ["#1D3E8C", "#d43C58", "#D9F9A5", "#FFEBD6", "#A3C4BC"];

    // Initialize a hard coded object of CSS Variable "human" name and Logical name
    var cssVariableObject = {
        "Paragraph Text": "--paragraph-color",
        "Background Color": "--bg-color",
        "Header Color": "--header-color",
        "Border Color": "--border-color"
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

    // Initial Palette Generation, DOM generation
    generatePaletteDOM(colors);
    generateStyleDOM(cssVariableObject);

    // End Drag drop example.
    // Below is file output codes.

    // When hidden, it still downloads content...
    $("#output-text").val("fishballs");

    // Accessing the Computed style element for assignment.
    // .style.setProperty(prop, val) works with an indexed jQuery Dom object.
    console.log(document.getElementById("output-text").style);
    console.log($("#output-text")[0].style);

    function saveAsStyleSheet(){
        var outputContent = $("#output-text").val();
        console.log('outputContent', typeof outputContent);
        
        // A Blob is a file-like object class that can be used for file-based operations. In this case, we will use it as a "temporary" write spot for our output CSS file.
        // Blob takes an array of the content in any type and a type object as args.
        // The type object is a "MIME type", other examples include text/javascript text/plain etc.
        var outputBlob = new Blob([outputContent], {type:"text/css"});

        // Generates a URL from the Blob object.
        var outputURL = window.URL.createObjectURL(outputBlob);

        // Set Download link in HTML as the download for the Text.
        var downloadLink = $("#download-link");
        downloadLink.attr("download", "output");
        downloadLink.attr("href", outputURL);

    }

    $("#download-link").on("click", saveAsStyleSheet);
     
});