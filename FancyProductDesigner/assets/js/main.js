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
    
  $.getJSON( "../../assets/json/images.json", function(data) {
    console.log('getJSON worked')
    // console.log('data', data);
    })
    .done(function(data) {
      console.log('.done function working')
      console.log('data', data);
      // Loop through JSON objects. Now able to use element.notation to access each product's keys
      for (const product in data) {
        if (data.hasOwnProperty(product)) {
          const element = data[product];
          console.log('element.attributes ', element.attributes);
        }
      }
      console.log('data.product_1', data.product_1)
    })
//closing document.ready function    
});

// //image fetch function

    // .done(function( data ) {
    //   // JSON.parse(data)
    //   console.log(data)
    //   // $.each( data.product )
    // })
  
 
  // $( "<ul/>", {
  //   "class": "item-options",
  //   html: items.join( "" )
  // }).appendTo( "body" );
// });
//create a button
// link ajax call to button and call the json