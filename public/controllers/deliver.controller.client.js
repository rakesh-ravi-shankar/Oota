/**
 * Created by Rakesh on 3/27/17.
 */
(function () {
    angular
        .module("Oota")
        .controller("DeliverController", DeliverController);

    function DeliverController(NgMap, $window, OrderService) {
        var vm = this;
        vm.restaurantName = "";
        vm.pickUpOrder = pickUpOrder;
        vm.orderPickedUp = orderPickedUp;
        vm.orderDelivered = orderDelivered;

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
        // vm.waypoints = [{pickupLoc:"250 Huntington, Boston, MA", deliveryLoc: "300 Huntington, Boston, MA"},
        //                 {pickupLoc:"179 Northampton st, Boston, MA", deliveryLoc: "185 Northampton st, Boston, MA"}];

        vm.selectedWaypoint = [];
        vm.waypoints = [];

        OrderService
            .findActiveOrders()
            .then(function (orders) {
                vm.waypoints = orders.data;
                console.log(vm.waypoints);

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


            });



        NgMap.getMap('mapDemo')
            .then(function(map) {
                vm.map = map;
            });

        vm.showInfoWindow = function(event, order) {
            if (order)
            {
                vm.selectedOrder = order;
                vm.selectedWaypoint = [];
                vm.selectedWaypoint.push({location: order.pickupLoc});
                vm.selectedWaypoint.push({location: order.deliveryLoc});
                vm.dropOff = order.deliveryLoc;
                vm.map.showInfoWindow('event-location-info', this);
                vm.restaurantName = order.restaurantName;
                vm.orders = [];
                for (i in order.items) {
                    vm.orders.push({"dish":order.items[i], "price":order.prices[i], "count":order.qty[i]});
                }

            }
        };

        function pickUpOrder() {
            for (i in vm.waypoints){
                if (vm.waypoints[i].pickupLoc != vm.selectedWaypoint[0].location){
                    vm.waypoints.splice(i, 1);
                }
            }
            console.log(vm.selectedOrder);
            vm.selectedOrder.deliveryStatus = "SELECTED_FOR_DELIVERY";
            OrderService
                .updateOrder(vm.selectedOrder)
                .then(function(order){
                    //vm.selectedOrder = order;
                    console.log("Status updated");
                    $("#orderPickedUpBtn").fadeIn("slow");
                    $("#orderDeliveredBtn").fadeIn("slow");
                });



        }

        function orderPickedUp() {
            vm.selectedOrder.deliveryStatus = "PICKED_ORDER";
            OrderService
                .updateOrder(vm.selectedOrder)
                .then(function(order){
                    //vm.selectedOrder = order;
                   console.log("Status updated");
                });
        }

        function orderDelivered() {
            vm.selectedOrder.deliveryStatus = "DELIVERED";
            OrderService
                .updateOrder(vm.selectedOrder)
                .then(function(order){
                    //vm.selectedOrder = order;
                    console.log("Status updated");
                });
        }

    }

})();