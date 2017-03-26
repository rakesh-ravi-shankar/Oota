/**
 * Created by Rakesh on 3/25/17.
 */
(function() {
    angular
        .module("Oota")
        .controller("LoginController", LoginController);

    function LoginController($location) {
        var vm = this;
        vm.login = login;

        function login(user) {
            console.log(user);
            $location.url("/profile");
        }

    }
})();