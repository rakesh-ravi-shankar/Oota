/**
 * Created by Rakesh on 3/27/17.
 */
(function () {
    angular
        .module("Oota")
        .controller("DeliverController", DeliverController);

    function DeliverController(NgMap, $window) {
        var vm = this;

        $(document).ready(function() {
            $("#destinationModal").modal({backdrop: 'static', keyboard: true});
            $("#destinationModal").modal("show")
        });

        vm.saveDestination = function(dest) {
            console.log(dest);
            vm.destination = dest;
            $("#destinationModal").modal("hide");
        };


        vm.destination = "";
        vm.waypoints = [{location:"250 Huntington, Boston, MA"}, {location:"Symphony, Boston, MA"}, {location:"179 Northampton st, Boston, MA"}];
        vm.selectedWaypoint = [];


        $window.navigator.geolocation.getCurrentPosition(function() {
            console.log("Fetching current location");
            vm.startIcon = {
                scaledSize: [32, 32],
                url: "img/startIcon.png"
            };
            vm.waypointIcon = {
                scaledSize: [32, 32],
                url: "img/waypointIcon.png"
            };
        });




        NgMap.getMap('mapDemo')
            .then(function(map) {
                vm.map = map;
            });

        vm.showInfoWindow = function(pos) {
            vm.selectedWaypoint = [{
                location: new google.maps.LatLng(pos.latLng.lat(), pos.latLng.lng()),
                stopover: true
            }];
            vm.map.showInfoWindow('event-location-info', this);
            vm.restaurantName = "Pho & I"
        };

    }

})();