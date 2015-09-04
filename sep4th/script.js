/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var app = angular.module('sdma', []);

app.factory("ClientService", function ($http) {
    return {
        getClientList: function () {
            return $http.get('json/ClientListDetail.json');
        },
        getClientInfo: function () {
            return $http.get('json/ClientFtpInstance.json');
        },
        getFileDetails: function () {
            return $http.get('json/FileSummary.json');
        },
        getFileErrors: function () {
            return $http.get('json/FileState.json');
        },
        getFileNotes: function () {
            return $http.get('json/fileNotes.json');
        }
    };
});

app.controller('controller', function ($scope, ClientService) {
    ClientService.getClientList().success(function (res) {
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
        $scope.getClientList(clientID);
        $scope.error = [];
        $scope.SelectedclientID = clientID;
    };
    $scope.EnableClientDetails = function ()
    {
        $scope.IsEditMode = true;
        $scope.showEditbutton = false;
        $scope.showSavebutton = true;
    }
    $scope.UpdateClientDetails = function (clientInfo)
    {
        angular.element(document.getElementById("clientProfile")).scope().clientInfo = clientInfo;
        $scope.IsEditMode = false;
        $scope.showEditbutton = true;
        $scope.showSavebutton = false;
    }


    $scope.getClientInfo = function (clientID) {
        ClientService.getClientInfo().success(function (res) {
            $scope.clientInfo = res[clientID - 1];
            $scope.showEditbutton = true;
            $scope.showSavebutton = false;
        });
    };

    $scope.getSummary = function (clientID) {
        ClientService.getClientList().success(function (client) {
            var clientFileDetails = client[clientID - 1];
            $scope.expected = clientFileDetails.expected;
            $scope.received = clientFileDetails.received;
            $scope.failed = clientFileDetails.failed;
        });
    };
    $scope.getClientList = function (clientID) {
        ClientService.getFileDetails().success(function (client) {
            $scope.files = client[clientID - 1].files;
        });
    };
    $scope.getErrors = function (fName) {
        ClientService.getFileErrors().then(function (res) {
            $scope.fileerrors = res.data;
            for (i = 0; i < $scope.fileerrors.length; i++) {
                var curFileName = $scope.fileerrors[i].fileName;
                if (fName === curFileName) {
                    $scope.errors = $scope.fileerrors[i].FileErrors;
                    $scope.getNotes(fName);
                }
            }
        });
    };

    $scope.getNotes = function (fName) {
        ClientService.getFileNotes().then(function (res) {
            $scope.fileNotes = res.data;
            for (var i = 0; i < $scope.fileNotes.length; i++) {
                var curFileName = $scope.fileNotes[i].fileName;
                if (fName === curFileName) {
                    $scope.notes = $scope.fileNotes[i].notes;
                }
            }
        });
    };

    $scope.postNotes = function () {
        $scope.notes.push({text: $scope.addNotes, done: false});
        $scope.addNotes = '';
    };

    $scope.customFilter = function (filter) {
        ClientService.getClientList().then(function (res) {
            $scope.clientList = res.data;
            if (filter === 'all') {
                $scope.cFilter = function (){
                    return true;
                };
            } else if (filter === 'errors') {
                var i = 0;
                $scope.cFilter = function () {
                    if($scope.clientList[i].clientState !== 'OK'){
                        i++;
                        return true;
                    }else{
                        i++;
                        return false;
                    }
                };
            } else if (filter === 'past') {
                var i = 0;
                var toDay = new Date();
                var dateRange = new Date(toDay.getFullYear(), toDay.getMonth(), toDay.getDate() - 40);
                $scope.cFilter = function () {
                    if (i <= $scope.clientList.length) {
                        var givenFileDate = $scope.clientList[i].latestIncompleteDate;
                        var convertedFileDate = new Date(parseFloat(givenFileDate.substr(6)));
                        if (convertedFileDate > dateRange && convertedFileDate < toDay) {
                            i++;
                            return true;
                        }
                        else {
                            i++;
                            return false;
                        }
                    }
                };
            }
        });
    };
});

