/**
 * Created by Rakesh on 3/27/17.
 */
(function () {
    angular
        .module("Oota")
        .controller("DeliverController", DeliverController);

    function DeliverController(NgMap, $window) {
        var vm = this;
        vm.origin = "179 Northampton, Boston, MA";
        vm.destination = "271 Huntington, Boston, MA";
        vm.waypoints = [];

        NgMap.getMap('mapDemo')
            .then(function(map) {
                vm.map = map;
            });

        vm.showInfoWindow = function(pos) {
            vm.waypoints = [{location:"250 Huntington, Boston, MA"}];
            vm.position = pos;
            vm.map.showInfoWindow('event-location-info', this);
        };



        $window.navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position)
        });




    }


})();