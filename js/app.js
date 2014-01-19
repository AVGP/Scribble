var App = (function(md) {

  if(localStorage.getItem("__author_darkmode") == "true") {
    document.body.classList.add("dark");
  }

  var content  = document.getElementById("content"),
         preview = document.getElementById("rendered");
         
   var body = content;
   var start = null;
   var currentFileName = null;
   var isPreviewing = false;
   
   var loadFile = function(fName) {
     var text= localStorage.getItem(fName);
     
     content.value = text;
   };
   
   var saveFile = function(fileName, content) {
     localStorage.setItem(fileName, content);
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
     localStorage.setItem("__author_darkmode", 
       !(localStorage.getItem("__author_darkmode") == "true"));
   });
   
   document.getElementById("preview").addEventListener("click", function() {
     isPreviewing = !isPreviewing;
       content.style.display = isPreviewing ? "none" : "block";
       preview.style.display = isPreviewing ? "block" : "none";
       preview.innerHTML = md.makeHtml(content.value);
   });
})(new Showdown.converter());