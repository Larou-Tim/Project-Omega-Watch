$(document).ready(function(){


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