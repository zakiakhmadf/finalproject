function initMap() {
    //Map options
    var options = {
        zoom:15,
        center: {lat: -6.9756323, lng: 107.6288776}
    };

    // New map
    var map = new google.maps.Map(document.getElementById('map'), options);

    var database = firebase.database();
    
    // get data from firebase
    database.ref('ttnapp').endAt().limitToLast(1).once('child_added', function (snapshot) {
          var loc = snapshot.child('payload_fields').val();
          var markers = 
          {
              coords: {lat: loc.latitude, lng: loc.longitude},
              iconImage:'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
              content: '<h6>Patok 1</h6>'
          }
            
           addMarker(markers);
            
          function addMarker(props){
              var marker = new google.maps.Marker({
                position:props.coords,
                map:map,
                //icon:props.iconImage
              });
        
              // Check for customicon
              if(props.iconImage){
                // Set icon image
                marker.setIcon(props.iconImage);
              }
        
              // Check content
              if(props.content){
                var infoWindow = new google.maps.InfoWindow({
                  content:props.content
                });
        
                marker.addListener('click', function(){
                  infoWindow.open(map, marker);
                });
              }
          }
    });

}