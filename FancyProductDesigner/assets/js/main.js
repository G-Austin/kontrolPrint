$(document).ready(function() {
  var $yourDesigner = $("#clothing-designer"),
    pluginOpts = {
      stageWidth: 1000,
      stageHeight: 550,
      editorMode: false,
      fonts: [
        { name: "Helvetica" },
        { name: "Times New Roman" },
        // {name: 'Pacifico', url: 'Enter_URL_To_Pacifico'},
        { name: "Arial" },
        { name: "Lobster", url: "google" }
      ],
      customTextParameters: {
        colors: false,
        removable: true,
        resizable: true,
        draggable: true,
        rotatable: true,
        autoCenter: true,
        boundingBox: "Base"
      },
      customImageParameters: {
        draggable: true,
        removable: true,
        resizable: true,
        rotatable: true,
        colors: "#000",
        autoCenter: true,
        boundingBox: "Base"
      },
      actions: {
        top: [
          "download",
          "print",
          "snap",
          "preview-lightbox",
          "magnify-glass",
          "zoom",
          "reset-product",
          "qr-code",
          "ruler",
          "save"
        ],
        // 'right': ['magnify-glass', 'zoom', 'reset-product', 'qr-code', 'ruler'],
        bottom: ["undo", "redo", "manage-layers", "info", "load"]
        // 'left': ['manage-layers','info','load']
      }
    },
    yourDesigner = new FancyProductDesigner($yourDesigner, pluginOpts);

  //print button
  $("#print-button").click(function() {
    yourDesigner.print();
    return false;
  });

  //create an image
  $("#image-button").click(function() {
    var image = yourDesigner.createImage();
    return false;
  });

  //checkout button with getProduct()
  $("#checkout-button").click(function() { 
    var product = yourDesigner.getProduct();
    console.log('checkout button has been clicked: ', product);
    return false;
  });

  //event handler when the price is changing
  $yourDesigner.on("priceChange", function(evt, price, currentPrice) {
    $("#thsirt-price").text(currentPrice);
  });

  //save image on webserver
  $("#save-image-php").click(function() { 
    yourDesigner.getProductDataURL(function(dataURL) {
      $.post("php/save_image.php", { base64_image: dataURL });
    });
  });

  //send image via mail
  $("#send-image-mail-php").click(function() {
    yourDesigner.getProductDataURL(function(dataURL) {
      $.post("php/send_image_via_mail.php", { base64_image: dataURL });
    });
  });
  
  // Get the image.json file 
  $.getJSON( "../../assets/json/images.json", function(data) {
    console.log('getJSON worked')
    // console.log('data', data);
    })
    .done(function(data) {
      console.log('data', data);

      // Loop through JSON objects. Now able to use element.notation to access each product's keys
      for (const product in data) {
        if (data.hasOwnProperty(product)) {
          //element is now each product object
          const element = data[product];

          //Use productAttributes to assign to the dynamically created <div>
          const productAttributes =  element.attributes;
          
          //Use productFrontImageAttribute to assign to the dynamically created <img>
          for (let i = 0; i < element.front_imgs.length; i++) {
            const productFrontImageAttribute = element.front_imgs[i];
            console.log('productFrontImageAttribute ', productFrontImageAttribute)
          }
          //Use productBackImageAttribute to assign to the dynamically created <img>
          for (let i = 0; i < element.back_imgs.length; i++) {
            const productBackImageAttribute = element.back_imgs[i];
            console.log('productBackImageAttribute', productBackImageAttribute)
          }
          //parse JSON 
          // elementAttributes = JSON.stringify(element.attributes)
          // console.log('element has been parsed', elementAttributes)
          
          //assign the attributes to the div. Put the div in the DOM

          //use parsed JSON for the front image and back image <img> keys. 
        }
      
      }
      
    })
//closing document.ready function    
});
