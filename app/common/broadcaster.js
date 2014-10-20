(function () {
    'use strict'

    angular.module('app').factory('broadcaster', ['$rootScope', broadcaster]);

    function broadcaster($rootScope) {

        var charactersUpdatedName = 'charactersUpdated';
        function charactersUpdated(characters) {
            $rootScope.$broadcast(charactersUpdatedName, characters);
        }

        function oncharactersUpdated(fun) {
            return $rootScope.$on(charactersUpdatedName, fun);
        }

        return {
            charactersUpdated: charactersUpdated,
            oncharactersUpdated: oncharactersUpdated,
        }
    }
})();