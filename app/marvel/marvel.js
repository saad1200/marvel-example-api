(function () {
    'use strict';
    var controllerId = 'marvel';
    angular.module('app').controller(controllerId, ['common', 'datacontext', 'charactersService', 'broadcaster', '$scope', marvel]);

    function marvel(common, datacontext, charactersService, broadcaster, $scope) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.characters = [];
        var charactersUpdatedOff;

        activate();

        function activate() {
            var promises = [getCharacters()];
            common.activateController(promises, controllerId)
                .then(function () { log('Activated Dashboard View'); });
        }

        function getCharacters() {
            charactersService.getAll().success(function (result) {
                charactersUpdatedOff = broadcaster.charactersUpdated(result.data.results);
                return result.data;
            });
        }

        broadcaster.oncharactersUpdated(function (event, characters) {
            vm.characters = characters;
        });

        $scope.$on("$destroy", function () {
            charactersUpdatedOff
        });
        
    };

})();

(function () {
    'use strict';

    angular.module('app').service('charactersService', ['$http', 'marvelCredentials', charactersService]);

    function charactersService($http, marvelCredentials) {
        this.getAll = function () {
            return $http.get('http://gateway.marvel.com:80/v1/public/characters?' + marvelCredentials.getKey());
        }

        this.search = function (searchterm) {
            console.log('http://gateway.marvel.com:80/v1/public/characters?nameStartsWith=' + searchterm + '&' + marvelCredentials.getKey());
            return $http.get('http://gateway.marvel.com:80/v1/public/characters?nameStartsWith=' + searchterm + '&' + marvelCredentials.getKey());
        }
    }
})();