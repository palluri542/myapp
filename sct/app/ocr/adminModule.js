angular.module('sgocr-admin', ['ocrApp.dataService', 'ui.router'])
        .controller('AdminCtrl',
                function($scope, dataFactory) {
                    $scope.pauseTriggerSubmissionResult = '';
                    $scope.resumeTriggerSubmissionResult = '';
                    $scope.submitGmiTriggersResult = '';
             
                    $scope.pauseTriggerSubmission = function() {
                        $scope.pauseTriggerSubmissionResult = '';
                        dataFactory.pauseTriggerSubmission()
                                .success(function(response) {
                                    console.log(response);
                                    $scope.pauseTriggerSubmissionResult = response;
                                })
                                .error(function(error) {
                                    $scope.pauseTriggerSubmissionResult = error;
                                    console.log("Error");
                                });
                    }
                    $scope.resumeTriggerSubmission = function() {
                        $scope.resumeTriggerSubmissionResult = '';
                        dataFactory.resumeTriggerSubmission()
                                .success(function(response) {
                                    console.log(response);
                                    $scope.resumeTriggerSubmissionResult = response;
                                })
                                .error(function(error) {
                                    $scope.resumeTriggerSubmissionResult = error;
                                    console.log("Error");
                                });
                    }
                    $scope.submitGmiTriggers = function() {
                        $scope.submitGmiTriggersResult = '';
                        dataFactory.submitGmiTriggers()
                                .success(function(response) {
                                    console.log(response);
                                    $scope.submitGmiTriggersResult = response;
                                })
                                .error(function(error) {
                                    $scope.submitGmiTriggersResult = error;
                                    console.log("Error");
                                });
                    } 
                });



