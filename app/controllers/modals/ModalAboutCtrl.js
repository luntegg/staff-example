app.controller('ModalAboutCtrl', ['$scope', '$uibModalInstance', function($scope, $uibModalInstance) {
    $scope.close = function() {
        $uibModalInstance.dismiss();
    };
}]);