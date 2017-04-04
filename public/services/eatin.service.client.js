(function () {
    angular
        .module("Oota")
        .factory("EatinService",EatinService);

    function EatinService($http) {

        var api = {
            "searchMenu": searchMenu,
            "searchRestaurant":searchRestaurant,
            "addOrder":addOrder,
            "searchRestaurantByLocation":searchRestaurantByLocation
        };
        return api;


        function searchRestaurantByLocation(lat,lon) {
            console.log(lat);
            console.log(lon);
            var url = "https://api.eatstreet.com/publicapi/v1/restaurant/search?latitude="+lat+"&longitude="+lon+"&method=both&access-token=9519d5bba99b4fc1";
            return $http.get(url);
        }


        function searchRestaurant(restaurant,location) {

            var restaurantname=encodeURIComponent(restaurant);
            var res = encodeURIComponent(location);
            var url = "https://api.eatstreet.com/publicapi/v1/restaurant/search?method=both&search="+restaurantname+"&street-address="+res+"&access-token=9519d5bba99b4fc1";
            return $http.get(url);
        }

        function searchMenu(apikey) {

            var res = encodeURI(apikey);
            var url = "https://api.eatstreet.com/publicapi/v1/restaurant/"+res+"/menu?includeCustomizations=false&access-token=9519d5bba99b4fc1";
            return $http.get(url);
        }
        
        function addOrder() {
            
        }


    }
})();