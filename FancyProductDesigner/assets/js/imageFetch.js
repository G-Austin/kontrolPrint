var fs = require('fs');


fs.readFile("../json/images.json", "utf8", function(error, data) {
    if (error) {
        return console.log(error);
      }
    
      // We will then print the contents of data
      console.log(data);

      var myJSON = JSON.parse(data);
      console.log(myJSON.yellowShirtFront.imgs.forEach(function(obj) {
          var img = new Image();
          img.src = obj.src;
          img.setAttribute("title", obj.title);
          img.setAttribute("data-parameters", obj.data-parameters);
          
      }))
});

// $(document).ready(function() {
    
//     $(document).on("click", "#swapProduct", function() {
//         console.log("I've been clicked")
//     })
// })




