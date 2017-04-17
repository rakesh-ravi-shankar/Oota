(function() {
    angular
        .module("Oota")
        .controller("HomePageController", HomePageController);

    function HomePageController($location) {
        var vm = this;
        vm.order = order;
        vm.deliver = deliver;

        function init() {
            $("body").removeClass("modal-open");
            $(".modal-backdrop").remove();
        }
        init();

        function order() {
            $location.url("/login");
        }
        function deliver() {
            $location.url("/login");
        }

    }
})();