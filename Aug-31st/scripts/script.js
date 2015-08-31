var app = angular.module('sdma', []);

app.factory("ClientService", function ($http) {
    return {
        getFilesList: function () {
            return $http.get('json/ClientListDetail.json');
        },
        getClientInfo: function () {
            return $http.get('json/ClientFtpInstance.json');
        },
        getFileDetails: function () {
            return $http.get('json/FileSummary.json');
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
        $scope.error = [];
        $scope.SelectedclientID = clientID;
    };

    $scope.getClientInfo = function (clientID) {
        console.log(clientID);
        ClientService.getClientInfo().success(function (res) {
            $scope.clientInfo = res;
            $scope.clientID = $scope.clientInfo[clientID-1].clientID;
            $scope.clientName = $scope.clientInfo[clientID-1].clientName;
            $scope.server = $scope.clientInfo[clientID-1].server;
            $scope.dirPath = $scope.clientInfo[clientID-1].dirPath;
            $scope.expFileCnt = $scope.clientInfo[clientID-1].expFileCnt;
            $scope.expStartTime = $scope.clientInfo[clientID-1].expStartTime;
            $scope.expEndTime = $scope.clientInfo[clientID-1].expEndTime;
            $scope.interval = $scope.clientInfo[clientID-1].interval;
            $scope.ftpId = $scope.clientInfo[clientID-1].ftpId;
        });
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
                if (fName === result) {
                    $scope.error = $scope.filesList[i].errors;
                }
            }
        });
    };
});
