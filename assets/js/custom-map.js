//Initialize Map

// $("#map-search").on("click",function(){

//     var query = parseInt($("#term-search").val().trim());
//     console.log(query)

// });

function initMap(){
  // Empties Map div, grabs user input stores into a variable
      $("#map-search").on("click",function(){
          event.preventDefault
          $("#map-container").empty()
          var latCoord;
          var lngCoord;
          var term =  parseInt($("#term-search").val().trim());
          console.log(term)
          var queryURL ='https://maps.googleapis.com/maps/api/geocode/json?address=' + term + '&key=AIzaSyAKa4m_Ooo8qlbVWFjc_5ajgvBiaPFUs9M'
  
  // ajax call based on term variable, changes term var into lat and lng coordinates
          $.ajax({
              url: queryURL,
              method: "GET"
            }).then(function(response) {
              var results = response.results;
              console.log(results)
              console.log(results[0].geometry.location.lng);
              console.log(results[0].geometry.location.lat);
               lngCoord = results[0].geometry.location.lng;
               latCoord = results[0].geometry.location.lat;
  // Object to set center point of map to Coordinates, how zoomed in the map is
               var options = {
                  zoom:16,
                  center:{lat:latCoord, lng: lngCoord}
               }
               console.log(options)
   // Makes map based on options properties, places it in map div            
               var display = new google.maps.Map(document.getElementById('map-container'), options);
               
               console.log(display)
      });
      });
  }
  //     || || || ||  initMap Call Back ----- Copy the whole link and put at the bottom of html file!!!!!!!!!!!!!!!!!!! || || || ||
  //     \/ \/ \/ \/                                                                                                    \/ \/ \/ \/
  // <script async defersrc="https://maps.googleapis.com/maps/api/js?key=AIzaSyAzsfXudxbOJc1VXWKlJfSQelZB_Ywffyk&callback=initMap"></script>
  