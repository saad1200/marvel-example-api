(function () {
    'use strict';
    var controllerId = 'marvel';
    angular.module('app').controller(controllerId, ['common', 'datacontext', 'charactersService', marvel]);

    function marvel(common, datacontext, charactersService) {
        var getLogFn = common.logger.getLogFn;
        var log = getLogFn(controllerId);

        var vm = this;
        vm.characters = [];

        activate();

        function activate() {
            var promises = [getCharacters()];
            common.activateController(promises, controllerId)
                .then(function () { log('Activated Dashboard View'); });
        }

        function getCharacters() {
            charactersService.getAll().success(function (result) {
                console.log(result.data.results);
                vm.characters = result.data.results;
                return result.data;
            });
        }
    };

})();

(function () {
    'use strict';

    angular.module('app').service('charactersService', ['$http', 'marvelCredentials', charactersService]);

    function charactersService($http, marvelCredentials) {
        this.getAll = function () {
            return $http.get('http://gateway.marvel.com:80/v1/public/characters?' + marvelCredentials.getKey());
        }
    }
})();