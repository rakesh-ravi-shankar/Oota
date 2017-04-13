/**
 * Created by Rakesh on 4/11/17.
 */
(function() {
    angular
        .module("Oota")
        .controller("RestaurantDashboardController", RestaurantDashboardController);

    function RestaurantDashboardController($routeParams, RestaurantService, RestaurantReviewService, UserService, OrderService) {
        var vm = this;
        vm.updateCurrentSelection = updateCurrentSelection;
        vm.getReviews = getReviews;

        function init() {
            vm.currentSelection="overview";
            vm.apiKey = $routeParams.apiKey;


            $("#menu-toggle").click(function(e) {
                e.preventDefault();
                $("#wrapper").toggleClass("toggled");
            });


            RestaurantService
                .findRestaurantByApiKey(vm.apiKey)
                .success(function(restaurant) {
                   vm.restaurant = restaurant;
                });


        }

        init();


        function updateCurrentSelection(cs) {
            vm.currentSelection = cs;

            if (cs == "reviews") {
                getReviews();
            }
            else if (cs == "graphical")
            {
                setTimeout(renderGraph, 500);
            }

        }


        function getReviews() {
            vm.allReviews = [];
            RestaurantReviewService
                .findAllReviews(vm.apiKey)
                .success(function(allReviews) {
                    if (allReviews != null)
                    {
                        UserService
                            .findAllUsers()
                            .success(function (users) {

                                var user_objs = {};
                                users.forEach(function (user) {
                                    if (allReviews._users.includes(user._id))
                                    {
                                        user_objs[user._id] = user;
                                    }
                                });

                                for (i in allReviews._users)
                                {
                                    vm.allReviews
                                        .push({firstName: user_objs[allReviews._users[i]].firstName,
                                            lastName: user_objs[allReviews._users[i]].lastName,
                                            username: user_objs[allReviews._users[i]].username,
                                            profilepicurl:user_objs[allReviews._users[i]].profilepicurl,
                                            reviewText: allReviews.reviews[i],
                                            createdAt:allReviews.dateCreated[i].split("T")[0]});
                                }
                                vm.allReviews.reverse();
                            });
                    }
                })
        }


        function renderGraph() {
            var allOrders = [];
            var orderCount = {};

            OrderService
                .findAllOrdersForRestaurant(vm.apiKey)
                .success(function(orders) {
                    allOrders = orders;
                    for (i in allOrders) {
                        var tempDate = allOrders[i].orderTime.split("T")[0];
                        if (tempDate in orderCount) {
                            orderCount[tempDate] += 1;
                        }
                        else{
                            orderCount[tempDate] = 1;
                        }
                    }


                    Highcharts.chart('graph', {

                        title: {
                            text: 'Daily Order Growth'
                        },

                        subtitle: {
                            text: 'Number of orders per day'
                        },

                        yAxis: {
                            title: {
                                text: 'Number of Orders'
                            }
                        },

                        xAxis: {
                            title: {
                                text: 'Date'
                            },
                            categories: Object.keys(orderCount)
                        },
                        legend: {
                            layout: 'vertical',
                            align: 'right',
                            verticalAlign: 'middle'
                        },

                        plotOptions: {
                            series: {
                                cursor: 'pointer'
                            }
                        },

                        series: [{
                            name: 'Number of Orders',
                            data: Object.values(orderCount)
                        }]

                    });

                });

        }


    }
})();