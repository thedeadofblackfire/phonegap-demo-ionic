angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope) {
  // Main app controller, empty for the example
  
    $scope.$on('tab.shown', function() {
    // Might do a load here
    alert('tot');
     var myLatlng = new google.maps.LatLng( 51.520838, -0.140261 );
            var myOptions = {
                zoom: 15,
                center: myLatlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP
            }
            var map = new google.maps.Map( document.getElementById( "map_canvas" ), myOptions );
  });
  
  
})

// A simple controller that fetches a list of data
.controller('PetsTabCtrl', function($scope, Pets) {
  // "Pets" is a service returning mock data (services.js)
  $scope.pets = Pets.all();

  $scope.$on('tab.shown', function() {
    // Might do a load here
  });
  $scope.$on('tab.hidden', function() {
    // Might recycle content here
  });
})

// A simple controller that shows a tapped item's data
.controller('PetCtrl', function($scope, $routeParams, Pets) {
  // "Pets" is a service returning mock data (services.js)
  $scope.pet = Pets.get($routeParams.petId);
});
