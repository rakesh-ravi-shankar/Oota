(function () {
    angular
        .module("Oota")
        .factory("EatinService",EatinService);

    function EatinService($http) {

        var restaurantdetails;
        var api = {
            "searchMenu": searchMenu,
            "searchRestaurant":searchRestaurant,
            "searchRestaurantByLocation":searchRestaurantByLocation,
            "saveResDetails":saveResDetails,
            "getResDetails":getResDetails
        };
        return api;


        function searchRestaurantByLocation(lat,lon) {
            console.log(lat);
            console.log(lon);
            var url = "https://api.eatstreet.com/publicapi/v1/restaurant/search?latitude="+lat+"&longitude="+lon+"&method=both&access-token=9519d5bba99b4fc1";
            return $http.get(url);
            return $http.get(url);
        }


        function searchRestaurant(restaurant,location) {

            var restaurantname=encodeURIComponent(restaurant);
            var res = encodeURIComponent(location);
            var url = "https://api.eatstreet.com/publicapi/v1/restaurant/search?method=both&search="+restaurantname+"&street-address="+res+"&access-token=9519d5bba99b4fc1";
            return $http.get(url);
        }

        function searchMenu(apikey) {
            console.log(restaurantdetails);
            var res = encodeURI(apikey);
            var url = "https://api.eatstreet.com/publicapi/v1/restaurant/"+res+"/menu?includeCustomizations=false&access-token=9519d5bba99b4fc1";
            return $http.get(url);
        }
        
        function saveResDetails(restaurant) {
           restaurantdetails =restaurant;
            return true;
        }

        function getResDetails() {
          return  restaurantdetails;
        }


    }
})();