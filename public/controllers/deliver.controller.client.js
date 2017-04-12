/**
 * Created by Rakesh on 3/27/17.
 */
(function () {
    angular
        .module("Oota")
        .controller("DeliverController", DeliverController);

    function DeliverController(NgMap, $window, OrderService,$rootScope, UserService, localStorageService, userProfileService) {
        var vm = this;
        vm.restaurantName = "";
        vm.pickUpOrder = pickUpOrder;
        vm.orderPickedUp = orderPickedUp;
        vm.orderDelivered = orderDelivered;
        vm.saveComment = saveComment;

        // Ask user to enter his destination first
        $(document).ready(function() {
            $("#destinationModal").modal({backdrop: 'static', keyboard: true});
            $("#destinationModal").modal("show")
        });

        // Save the destination after user enters it in the modal form
        vm.saveDestination = function(dest) {
            console.log(dest);
            vm.destination = dest;
            $("#destinationModal").modal("hide");
        };


        vm.destination = "";
        vm.selectedWaypoint = [];
        vm.waypoints = [];

        //TODO: Remove orders made by the deliverer
        //TODO: Remove multiple orders from same location
        // each waypoint in vm.waypoints is an order
        OrderService
            .findActiveOrders()
            .then(function (orders) {
                cachedLoc = localStorageService.get("cachedLoc");
                if (cachedLoc != undefined)
                {
                    vm.waypoints = [cachedLoc];
                }
                else
                {
                    vm.waypoints = orders.data;
                }
                console.log(vm.waypoints);

                // Get current location and set marker icons
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


        // Get a handle on the map instance
        NgMap.getMap('mapDemo')
            .then(function(map) {
                vm.map = map;
            });


        // Handle the marker clicks
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
                // Parse the order
                for (i in order.items) {
                    vm.orders.push({"dish":order.items[i], "price":order.prices[i], "count":order.qty[i]});
                }
                // Find who ordered the food
                UserService
                    .findUserById(order._orderer)
                    .success(function(orderer) {
                        vm.orderer = orderer;
                    });
            }
        };


        // Selected for delivery
        function pickUpOrder() {
            // Remove all other unselected markers
            for (i in vm.waypoints){
                if (vm.waypoints[i].pickupLoc != vm.selectedWaypoint[0].location){
                    vm.waypoints.splice(i, 1);
                }
                else {
                    localStorageService.set("cachedLoc", vm.waypoints[i]);
                }
            }
            vm.selectedOrder.deliveryStatus = "SELECTED_FOR_DELIVERY";
            vm.selectedOrder._deliverer=$rootScope.user._id;
            OrderService
                .updateOrder(vm.selectedOrder)
                .then(function(order){
                    //vm.selectedOrder = order;
                    console.log("Status updated");
                    $("#windowBtn").addClass("disabled");
                    $("#orderPickedUpBtn").removeClass("disabled");
                });

        }




        function orderPickedUp() {
            localStorageService.clearAll();
            vm.selectedOrder.deliveryStatus = "PICKED_ORDER";

            OrderService
                .updateOrder(vm.selectedOrder)
                .then(function(order){
                    //vm.selectedOrder = order;
                   console.log("Status updated");
                   $("#orderPickedUpBtn").addClass("disabled");
                   $("#orderDeliveredBtn").removeClass("disabled");
                });

        }




        function orderDelivered() {
            vm.selectedOrder.deliveryStatus = "DELIVERED";
            vm.selectedOrder.deliveryTime = new Date().getDate();
            //TODO: update the _deliverer id in the selected order

            OrderService
                .updateOrder(vm.selectedOrder)
                .then(function(order){
                    //vm.selectedOrder = order;
                    console.log("Status updated");
                    $("#orderDeliveredBtn").addClass("disabled");
                    $("#commentModal").modal("show")
                });


        }



        function saveComment(comm) {
            var comment = {
                feedback_giver_id:$rootScope.user._id,
                feedback_giver_name:$rootScope.user.firstName,
                feedback_reciever_id:vm.orderer._id,
                comment:comm,
                order_id:vm.selectedOrder._id
            };
            console.log(comment);

            userProfileService
                .createUserComment(comment)
                .then(function() {
                    //TODO: this button is not being disabled
                    $("#commentModal").modal("hide")
                });
        }

    }

})();