/**
 * Created by monica on 3/19/17.
 */
(function () {
    angular
        .module("Oota")
        .controller("MenuController", MenuController)


    function MenuController($routeParams,EatinService) {

        vm=this;
        function init() {
            var res=$routeParams['resid'];
            EatinService
                .searchMenu(res)
                .then(function (menu) {
                    vm.menu=menu;



                });

        }
        init();





    }
})();