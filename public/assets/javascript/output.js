// $(document).ready(function(){
    // Initialize Document popover (bootstrap)
    // $('[data-toggle="popover"]').popover()
    // Begin code of drag and drop example
    // Initialize a hard coded array of colors
    // var colors = ["#1D3E8C", "#d43C58", "#D9F9A5", "#FFEBD6", "#A3C4BC"];

    // Initialize a hard coded object of CSS Variable "human" name and Logical name
    // The key is for readability purposes.
    // var cssVariableObject = {   
    //     "Paragraph Text": "--paragraph-text-color",
    //     "Header Text": "--header-text-color",
    //     "Body BG Color": "--body-bg-color",
    //     "Div BG Color": "--div-bg-color",
    //     "Border Color": "--border-color",
    //     "Box Shadow Color": "--div-box-shadow-color"
    // }

    // hardcoded base CSS file. This can be changed to accept a dynamic style.
    var baseCSSFile = "/* These are initial declarations of the CSS variables. Use by replacing any color value in this document with var([property variable name]) There are no quotes. See examples. */";
    /* Main body Styles currently omitted. Output only for HTML header.
    \nbody {\n\tbackground-color: var(--body-bg-color);\n}\np {\n\tcolor: var(--paragraph-text-color);\n}\ndiv {\n\tcolor: var(--div-text-color);\n\tbox-shadow: 5px 5px 2px var(--div-box-shadow-color);\n\tbackground-color: var(--div-bg-color);\n\tborder: 3px dotted var(--border-color);\n}\nh1,h2,h3,h4,h5,h6 {\n\tcolor: var(--header-text-color);\n}"
    */

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

            // Adding classes and modifying output container DOM.
            outputContainer.append(outputColor);
            outputContainer.addClass("inline-block swatch-container");
            // Text for color swatches
            // outputContainer.append($("<p>").text(colorsArray[i]).addClass("text-center"));
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
            outputColorHolder.attr("data-color-value", "initial");

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
        // Assign color value to attribute
        $(this).attr("data-color-value", outputCSSColor);
        
        console.log($(this));
        // Change the CSS Variables dynamically.
        $("html").get(0).style.setProperty(outputCSSVar, outputCSSColor);
    });

    // Initial Palette Generation, DOM generation
    // With hard coded items. Change as neccessary for dynamic items.
    // generatePaletteDOM(colors);
    // generateStyleDOM(cssVariableObject);

    // End Drag drop example.
    // Below is file output codes.


    // Accessing the Computed style element for assignment.
    // .style.setProperty(prop, val) works with an indexed jQuery Dom object.
    // console.log(document.getElementById("output-text").style);
    // console.log($("#output-text")[0].style);

    // Function to iterate over the selected colors and return a string of CSS Variable properties and values for the root/HTML selector
    function getSelectedStyleVariables(){
        // Assign user selected (or blank) colors to a variable.
        var colorHolders = $(".color-holder");

        // Initialize a container variable for output string.
        // It is the content of the root/HTML selector in CSS
        var outputString = "html {\n";

        // .each(fn) is a special jQ for loop-like construction that iterates over DOM in the jQ object. It ignores the prototype variables that "for x in object" typically catches.
        // Writes CSS in a human readable style.
        colorHolders.each(function(index){
            outputString = outputString + "\t" + $(this).attr("data-css-var") + ": " + $(this).attr("data-color-value") + ";\n";
        });

        outputString = outputString + "}";

        // Immediately generate a link for download.
        generateOutputStyleSheet(outputString)

    }

    // Expects a string in the format of a CSS sheet.
    function generateOutputStyleSheet(outputText){
        var outputContent = outputText + baseCSSFile;
        
        // A Blob is a file-like object class that can be used for file-based operations. In this case, we will use it as a "temporary" write spot for our output CSS file.
        // Blob takes an array of the content in any type and a type object as args.
        // The type object is a "MIME type", other examples include text/javascript text/plain etc.
        var outputBlob = new Blob([outputContent], {type:"text/css"});

        // Generates a URL from the Blob object.
        var outputURL = window.URL.createObjectURL(outputBlob);

        // Set Download link in HTML as the download for the Text.
        var downloadLink = $("#download-link");
        // Second parameter is name of downloadable file.
        downloadLink.attr("download", "pokeman-style");
        downloadLink.attr("href", outputURL);

    }

    // $("#download-link").on("click", saveAsStyleSheet);
    // $("#create-file").on("click", getSelectedStyleVariables);
     
// });