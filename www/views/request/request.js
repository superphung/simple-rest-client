/**
 * Created by Eric on 29/04/2015.
 */
(function () {
    angular
        .module('App')
        .controller('RequestController', RequestController);

    RequestController.$inject = ['dataService', '$ionicLoading'];

    function RequestController(dataService, $ionicLoading) {
        var vm = this;

        vm.requests = ['GET', 'POST', 'PUT', 'DELETE'];
        vm.request = 'GET';
        vm.address = 'http://';
        vm.radiolist = [
            {text: 'x-www-form-urlencoded', value: 'encode'},
            {text: 'raw', value: 'raw'}
        ];
        vm.radioSelected = 'encode';
        vm.texarea = '';
        vm.keys = [];
        vm.values = [];
        vm.params = {};
        vm.response = null;
        vm.status = {};

        vm.sendRequest = sendRequest;
        vm.addNewParam = addNewParam;
        vm.deleteParam = deleteParam;

        function sendRequest() {
            if (vm.radioSelected === 'encode') {
                for (var i = 0; i < vm.keys.length; i++) {
                    if (vm.keys[i] && vm.params[i])
                        vm.params[vm.keys[i]] = vm.params[i];
                }
            }
            else if (vm.radioSelected === 'raw')
                vm.params = JSON.parse(vm.texarea);

            var req = {
                method: vm.request,
                url: vm.address,
                data: vm.params
            };

            $ionicLoading.show();
            return dataService.sendRequest(req)
                .then(function(res) {
                    vm.response = res.data;
                    vm.status = {
                        code: res.status,
                        text: res.statusText
                    };
                    $ionicLoading.hide();
                })
                .catch(function(err) {
                    if (err.status == 0)
                        vm.response = 'Could not get any response. This seems to be like an error connecting to ' + vm.address + '. The response status was 0.';
                    else
                        vm.response = err;
                    vm.status = {
                        code: err.status,
                        text: err.statusText
                    };
                    $ionicLoading.show({template: 'Could not get any response', duration: 3000});
                });
        }

        function addNewParam() {
            vm.keys.push("");
            vm.params.push("");
        }

        function deleteParam(index) {
            vm.keys.splice(index, 1);
            vm.params.splice(index, 1);
        }
    }
})();