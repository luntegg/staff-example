app.controller('ModalCreateEditWorkerCtrl', ['$scope', '$uibModalInstance', 'worker', function($scope, $uibModalInstance, worker) {
    $scope.states = {
        isEdit: !!worker,
        submitMode: false
    };

    $scope.workerModel = {
        firstName: null,
        lastName: null,
        experience: null,
        age: null,
        address: null
    };

    if (worker) {
        angular.copy(worker, $scope.workerModel);
    }

    var requiredFields = ['firstName', 'lastName'];
    var isFormValid = function () {
        for (var i = 0; i < requiredFields.length; i++) {
            if (!$scope.workerModel[requiredFields[i]]) {
                return false;
            }
        }

        return true;
    };

    $scope.checkValue = function (key) {
        if ($scope.states.submitMode && (requiredFields.indexOf(key) > -1) && !$scope.workerModel[key]) {
            return true;
        } else {
            return false;
        }
    };

    $scope.saveWorker = function (worker) {
        $scope.states.submitMode = true;

        if(!isFormValid()) {
            return false;
        }

        $uibModalInstance.close(worker);
    };

    $scope.close = function() {
        $uibModalInstance.dismiss();
    };
}]);