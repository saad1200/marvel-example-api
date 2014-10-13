(function () {
    'use strict';

    angular.module('common').service('marvelCredentials', ['md5', marvelCredentials]);

    function marvelCredentials(md5) {
        this.getKey = function () {
            var publickey = 'd3573d7eec576d9eb8a2a83632750907';
            var privatekey = '55e20985f35b98ad5c690e3dc9dde26a8289ea03';
            var timestamp = new Date().getTime();
            var hash = md5.createHash(timestamp + privatekey + publickey);
            return 'ts=' + timestamp + '&apikey=' + publickey + '&hash=' + hash;
        }
    }
})();