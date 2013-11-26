// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array or 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'ngRoute', 'ngAnimate', 'starter.services', 'starter.controllers'])

.directive('sayWhere', function ($compile) {
      return {
        controller: function ($scope) {
          var map;

          this.registerMap = function (myMap) {
            var center = myMap.getCenter(),
              latitude = center.lat(),
              longitude = center.lng();

            map = myMap;
            $scope.latitude = latitude;
            $scope.longitude = longitude;
          };

          $scope.$watch('latitude + longitude', function (newValue, oldValue) {
            if (newValue !== oldValue) { 
              var center = map.getCenter(),
                latitude = center.lat(),
                longitude = center.lng();
              if ($scope.latitude !== latitude || $scope.longitude !== longitude)
                map.setCenter(new google.maps.LatLng($scope.latitude, $scope.longitude));
            }
          });
        },
        link: function (scope, elem, attrs, ctrl) {
          var mapOptions,
            latitude = attrs.latitude,
            longitude = attrs.longitude,
            controlTemplate,
            controlElem,
            map;

          // parsing latLong or setting default location
          latitude = latitude && parseFloat(latitude, 10) || 43.074688;
          longitude = longitude && parseFloat(longitude, 10) || -89.384294;

          mapOptions = {
            zoom: 8,
            disableDefaultUI: true,
            center: new google.maps.LatLng(latitude, longitude),
            mapTypeId: google.maps.MapTypeId.ROADMAP
          };

          map = new google.maps.Map(elem[0], mapOptions);

          ctrl.registerMap(map);

          controlTemplate = document.getElementById('whereControl').innerHTML.trim();
          controlElem = $compile(controlTemplate)(scope);
          map.controls[google.maps.ControlPosition.TOP_LEFT].push(controlElem[0]);

          function centerChangedCallback (scope, map) {
            return function () {
              var center = map.getCenter();
              scope.latitude = center.lat();
              scope.longitude = center.lng();
              if(!scope.$$phase) scope.$apply();
            };
          }
          google.maps.event.addListener(map, 'center_changed', centerChangedCallback(scope, map));
        }
      };
    }) 
    
.config(function ($compileProvider){
  // Needed for routing to work
  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|tel|sms):/);
})

.config(function($routeProvider, $locationProvider) {

  // Set up the initial routes that our app will respond to.
  // These are then tied up to our nav router which animates and
  // updates a navigation bar
  $routeProvider.when('/home', {
    templateUrl: 'templates/app.html',
    controller: 'AppCtrl'
  });

  // if the url matches something like /pet/2 then this route
  // will fire off the PetCtrl controller (controllers.js)
  $routeProvider.when('/pet/:petId', {
    templateUrl: 'templates/pet.html',
    controller: 'PetCtrl'
  });

  // if none of the above routes are met, use this fallback
  // which executes the 'AppCtrl' controller (controllers.js)
  $routeProvider.otherwise({
    redirectTo: '/home'
  });

});

