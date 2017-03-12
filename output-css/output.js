$(document).ready(function(){

    // function saveTextAsFile()
    // {
    //     var textToSave = document.getElementById("inputTextToSave").value;
    //     var textToSaveAsBlob = new Blob([textToSave], {type:"text/plain"});
    //     var textToSaveAsURL = window.URL.createObjectURL(textToSaveAsBlob);
    //     var fileNameToSaveAs = document.getElementById("inputFileNameToSaveAs").value;
     
    //     var downloadLink = document.createElement("a");
    //     downloadLink.download = fileNameToSaveAs;
    //     downloadLink.innerHTML = "Download File";
    //     downloadLink.href = textToSaveAsURL;
    //     downloadLink.onclick = destroyClickedElement;
    //     downloadLink.style.display = "none";
    //     document.body.appendChild(downloadLink);
     
    //     downloadLink.click();
    // }
     
    // function destroyClickedElement(event)
    // {
    //     document.body.removeChild(event.target);
    // }


    // When hidden, it still downloads content...
    $("#output-text").val("fishballs");
    console.log(document.getElementById("output-text").style);
    console.log($("#output-text")[0].style);

    function saveAsStyleSheet(){
        var outputContent = $("#output-text").val();
        console.log('outputContent', typeof outputContent);
        
        var outputBlob = new Blob([outputContent], {type:"text/css"});
        var outputURL = window.URL.createObjectURL(outputBlob);

        var downloadLink = $("#download-link");
        downloadLink.attr("download", "output");
        downloadLink.attr("href", outputURL);

    }

    $("#download-link").on("click", saveAsStyleSheet);
     
});