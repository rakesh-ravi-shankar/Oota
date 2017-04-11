/**
 * Created by Rakesh on 4/11/17.
 */
(function() {
    angular
        .module("Oota")
        .controller("RestaurantDashboardController", RestaurantDashboardController);

    function RestaurantDashboardController() {
        var vm = this;
        vm.updateCurrentSelection = updateCurrentSelection;

        function init() {
            vm.currentSelection="overview";

            $("#menu-toggle").click(function(e) {
                e.preventDefault();
                $("#wrapper").toggleClass("toggled");
            });
        }

        init();


        function updateCurrentSelection(cs) {
            vm.currentSelection = cs;

            if (cs == 'overview')
            {

            }
            else if(cs == 'graphical')
            {

            }
            else if(cs == 'reviews')
            {

            }
        }



    }
})();