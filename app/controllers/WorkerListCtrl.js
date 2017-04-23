app.controller('WorkerListCtrl', [
    '$scope',
    '$http',
    '$uibModal',
    function($scope, $http, $uibModal) {
        $scope.states = {
            workers: {
                loading: false
            }
        };
        $scope.workers = [];

        $scope.openAboutWindow = function() {
            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'about.html',
                controller: 'ModalAboutCtrl'
            });
        };

        $scope.removeWorker = function (worker) {
            var index = $scope.workers.indexOf(worker);
            $scope.workers.splice(index, 1);
        };

        $scope.editWorker = function (worker) {
            var isEdit = !!worker;

            var modalInstance = $uibModal.open({
                animation: true,
                templateUrl: 'create-edit-worker.html',
                controller: 'ModalCreateEditWorkerCtrl',
                controllerAs: '$ctrl',
                resolve: {
                    worker: function () {
                        return worker || null;
                    }
                }
            });

            modalInstance.result.then(function (result) {
                if (isEdit) {
                    angular.copy(result, worker);
                } else {
                    $scope.workers.push(result);
                }
            });
        };

        $scope.addWorker = function () {
            $scope.editWorker();
        };

        $scope.getRandomUsers = function () {
            $scope.states.workers.loading = true;

            $http.get('https://randomuser.me/api/?results=100').then(function(data) {
                $scope.states.workers.loading = false;

                var users = data.data.results;

                for (var i = 0; i < users.length; i++) {
                    var user = users[i];

                    var newWorker = {
                        firstName: user.name.first,
                        lastName: user.name.last,
                        experience: (Math.floor(Math.random() * 20) + 1) + ' г.',
                        age: (Math.floor(Math.random() * 50) + 20),
                        address: user.location.city + ' ' + user.location.street
                    };
                    $scope.workers.push(newWorker);
                }

            }, function () {
                alert('Error! Sorry!');
            });
        };
    }
]);