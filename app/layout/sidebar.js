(function () { 
    'use strict';
    
    var controllerId = 'sidebar';
    angular.module('app').controller(controllerId,
        ['$route', 'config', 'routes', 'charactersService', 'broadcaster', '$scope', sidebar]);

    function sidebar($route, config, routes, charactersService, broadcaster, $scope) {
        var vm = this;
        vm.searchTerm = '';
        vm.isCurrent = isCurrent;

        var charactersUpdatedOff

        activate();

        function activate() { getNavRoutes(); }
        
        function getNavRoutes() {
            vm.navRoutes = routes.filter(function(r) {
                return r.config.settings && r.config.settings.nav;
            }).sort(function(r1, r2) {
                return r1.config.settings.nav - r2.config.settings.nav;
            });
        }
        
        function isCurrent(route) {
            if (!route.config.title || !$route.current || !$route.current.title) {
                return '';
            }
            var menuName = route.config.title;
            return $route.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
        }

        vm.search = function () {
            if (vm.searchTerm.length > 3) {
                charactersService.search(vm.searchTerm).success(function (result) {
                    charactersUpdatedOff = broadcaster.charactersUpdated(result.data.results);
                });
            }
            if (vm.searchTerm.length == 0) {
                charactersService.getAll().success(function (result) {
                    charactersUpdatedOff = broadcaster.charactersUpdated(result.data.results);
                    return result.data;
                });
            }
        }

        $scope.$on("$destroy", function () {
            charactersUpdatedOff
        });
    };
})();
