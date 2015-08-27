var app = angular.module('myApp', []);

app.controller('controller', function ($scope, $http, $filter) {


    $http.get('clientList.json').then(function (res) {
        $scope.clientList = res.data;
    });
    $scope.clientName = "NA";
    $scope.expected = "00";
    $scope.received = "00";
    $scope.failed = "00";
    $scope.files = "00";

    $scope.showDetails = function (clientID) {
        $scope.getSummary(clientID);
        $scope.getFilesList(clientID);
    };

    $scope.getSummary = function (clientID) {
        $http.get('clientList.json').success(function (client) {
            $scope.expected = client[clientID - 1].expected;
            $scope.received = client[clientID - 1].received;
            $scope.failed = client[clientID - 1].failed;
        });
    };
    $scope.getFilesList = function (clientID) {
        $http.get('clientList.json').success(function (client) {
            $scope.files = client[clientID - 1].files;
        });
    };
    $scope.getFileData = function (fName) {
        $http.get('fileList.json').then(function (res) {
            $scope.filesList = res.data;
            for (i = 0; i < $scope.filesList.length; i++) {
                var result = $scope.filesList[i].fileName;
                if(fName === result){
                    $scope.error = $scope.filesList[i].errors;
                }
            }
        });
    };
});
