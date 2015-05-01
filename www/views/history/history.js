/**
 * Created by Eric on 30/04/2015.
 */
(function () {
    angular
        .module('App')
        .controller('HistoryController', HistoryController);

    HistoryController.$inject = ['dataService'];

    function HistoryController(dataService) {
        var vm = this;

        vm.cache = dataService.getCache();
    }

})();
