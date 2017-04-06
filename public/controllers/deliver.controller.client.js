/**
 * Created by Rakesh on 3/27/17.
 */
(function () {
    angular
        .module("Oota")
        .controller("DeliverController", DeliverController);

    function DeliverController(NgMap, $window) {
        var vm = this;
        vm.restaurantName = "";
        vm.pickUpOrder = pickUpOrder;

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
        vm.waypoints = [{pickupLoc:"250 Huntington, Boston, MA", deliveryLoc: "300 Huntington, Boston, MA"},
                        {pickupLoc:"179 Northampton st, Boston, MA", deliveryLoc: "185 Northampton st, Boston, MA"}];
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

        vm.showInfoWindow = function(event, pos) {
            if (pos)
            {
                vm.selectedWaypoint = [];
                vm.selectedWaypoint.push({location: pos.pickupLoc});
                vm.selectedWaypoint.push({location: pos.deliveryLoc});
                vm.dropOff = pos.deliveryLoc;
                vm.map.showInfoWindow('event-location-info', this);
                vm.restaurantName = "Restaurant Name"
            }
        };

        function pickUpOrder() {
            for (i in vm.waypoints){
                if (vm.waypoints[i].pickupLoc != vm.selectedWaypoint[0].location){
                    vm.waypoints.splice(i, 1);
                }
            }
        }

    }

})();