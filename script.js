var app = angular.module('myApp', []);

app.factory("ClientService", function($http) {
    return {
        getFilesList: function() {
           return $http.get('clientList.json');
        },
        getFileDetails: function() {
            return $http.get('fileList.json');
        }
    };
});
app.controller('controller', function ($scope, ClientService) {
    ClientService.getFilesList().success(function (res) {
        $scope.clientList = res;
    });
    $scope.clientName = "NA";
    $scope.expected = "00";
    $scope.received = "00";
    $scope.failed = "00";
    $scope.files = [];
	$scope.SelectedclientID = 0;

    $scope.showDetails = function (clientID) {
        $scope.getSummary(clientID);
        $scope.getFilesList(clientID);
		$scope.error =[];
		
		$scope.SelectedclientID = clientID;
		
		
    };

    $scope.getSummary = function (clientID) {
        ClientService.getFilesList().success(function (client) {
			var clientFileDetails = client[clientID - 1];
            $scope.expected = clientFileDetails.expected;
            $scope.received = clientFileDetails.received;
            $scope.failed = clientFileDetails.failed;
        });
    };
     $scope.getFilesList = function (clientID) {
         ClientService.getFilesList().success(function (client) {
             $scope.files = client[clientID - 1].files;
         });
     };
    $scope.getFileData = function (fName) {
         ClientService.getFileDetails().then(function (res) {
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
