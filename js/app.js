var App = (function(md) {

  remoteStorage.displayWidget();

  if(localStorage.getItem("__author_darkmode") == "true") {
    document.body.classList.add("dark");
  }

  var handleLightEvent = function(event) {
    if(event.value < 5) {
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
    }
  };

  window.addEventListener("devicelight", handleLightEvent);

  var content  = document.getElementById("content"),
         preview = document.getElementById("rendered");
         
   var body = content;
   var start = null;
   var currentFileName = null;
   var isPreviewing = false;
   
   var loadFile = function(fName) {
    remoteStorage.scribbles.loadScribble(fName).then(function(scribble) {
      if(!scribble) {
        var text= localStorage.getItem(fName);
        content.value = text;
        return;
      }
      
      content.value = scribble.content;
    })
   };
   
   var saveFile = function(fileName, content) {
     remoteStorage.scribbles.saveScribble(fileName, content);
   };
   
   document.getElementById("save").addEventListener("click", function() {
     var name = currentFileName || window.prompt("Enter a filename");
     
     saveFile(name, content.value);
     currentFileName = name;
   });
   
   document.getElementById("open").addEventListener("click", function() {
     currentFileName = window.prompt("Open file", currentFileName);
     loadFile(currentFileName);
   });
   
   document.getElementById("new").addEventListener("click", function() {
     currentFileName = null;
     content.value = "";
   });
   
   document.getElementById("mode").addEventListener("click", function() {
     document.body.classList.toggle("dark");
     window.removeEventListener("devicelight", handleLightEvent);
     localStorage.setItem("__author_darkmode", 
       !(localStorage.getItem("__author_darkmode") == "true"));
   });
   
   window.addEventListener("orientationchange", function() {
     if(window.orientation == 90 || window.orientation == -90) {
       content.style.float = "left";
       preview.style.display = "inline-block";
       content.style.width = preview.style.width = "50%";
       preview.innerHTML = md.makeHtml(content.value);
     } else {
       content.style.float = "none";
       content.style.width = preview.style.width = "100%";
     }
   });
   
   document.getElementById("preview").addEventListener("click", function() {
     isPreviewing = !isPreviewing;
       content.style.display = isPreviewing ? "none" : "block";
       preview.style.display = isPreviewing ? "block" : "none";
       preview.innerHTML = md.makeHtml(content.value);
   });
})(new Showdown.converter());
