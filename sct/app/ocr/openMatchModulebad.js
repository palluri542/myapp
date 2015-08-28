angular.module('sgocr-openMatch', ['ocrApp.dataService', 'ui.router'])
        .controller('OpenMatchCtrl',
                function($scope, dataFactory) {
                    $scope.ncrProfileList;
                    $scope.possiblesObject;
                    $scope.fiaLegalEntity;
                    $scope.status;
                    $scope.fiaQueryText;
                    $scope.ncrQueryText;
                    $scope.linkUnlinkStatus;
                    priorSelectionIdx = 0;

            $scope.save = function() {
                        console.log("SelectedIndex " + $scope.selectedNcrEntityIndex);
                        $scope.pre = $scope.selectedNcrEntity;
                        $scope.selectedNcrEntity = $scope.ncrProfileList[$scope.selectedNcrEntityIndex];
                    };

            $scope.fiaSelectAction = function() {
                pos = $scope.fiaProfileList.map(function(e) {
                    return e.ocrProfileId;
                }).indexOf($scope.selectedFiaItem.ocrProfileId);
                if (0 >= pos) {
                    priorSelectionIdx = 0;
                } else {
                    priorSelectionIdx = pos;
                }
                populateFia($scope.selectedFiaItem.ocrProfileId);
            };

            $scope.linkAction = function() {
                commitMatch();
                $scope.ncrProfileList = null;
                $scope.possiblesObject = null;
                $scope.fiaLegalEntity = null;
                $scope.selectedNcrEntity = null;
            };
            $scope.unlinkAction = function() {
                //    commitMatch();
                $scope.ncrProfileList = null;
                $scope.possiblesObject = null;
                $scope.fiaLegalEntity = null;
                $scope.selectedNcrEntity = null;
            };

            $scope.ncrNameQueryAction = function() {
                $scope.ncrProfileList = null;
                $scope.possiblesObject = null;
                $scope.selectedNcrEntity = null;
                ncrNameQuery();
            };

            $scope.fiaNameQueryAction = function() {
                fiaNameQuery();
            };
            function commitMatch() {
                console.log("OcrProfileId:" + $scope.fiaLegalEntity.ocrProfileId);
                console.log("partyId:" + $scope.selectedNcrEntity.newedgePartyId);
                console.log("PK:" + $scope.selectedNcrEntity.partyKey);
                dataFactory.commitMatch($scope.fiaLegalEntity.ocrProfileId,
                        $scope.selectedNcrEntity.newedgePartyId,
                        $scope.selectedNcrEntity.partyKey)
                        .success(function(response) {
                            console.log(response);
                            $scope.ncrProfileList = null;
                            $scope.possiblesObject = null;
                            $scope.fiaLegalEntity = null;
                            $scope.selectedNcrEntity = null;
                        })
                        .error(function(error) {
                            console.log("Error");
                        });
            }
            function unlink() {
                dataFactory.commitMatch($scope.fiaLegalEntity.ocrProfileId,
                        $scope.selectedNcrEntity.newedgePartyId,
                        $scope.selectedNcrEntity.partyKey)
                        .success(function(response) {
                            console.log(response);
                            getFiaList();
                        })
                        .error(function(error) {
                            console.log("Error");
                        });
            }

            function ncrNameQuery() { // select * where %blah%
                dataFactory.ncrNameQuery($scope.ncrQueryText)
                        .success(function(possible) {
                            $scope.possiblesObject = possible;
                            //       $scope.fiaLegalEntity = possible.fiaEntity;
                            $scope.ncrProfileList = possible.ncrEntities;
                            $scope.selectedNcrEntity = $scope.ncrProfileList[0];
                        })
                        .error(function(error) {
                            $scope.status = 'Unable to load NCR query  entity : ' + error.message;
                            console.log(error.message);
                        });
            }
            function fiaNameQuery(fiaQueryText) {
                dataFactory.fiaNameQuery($scope.fiaQueryText)
                        .success(function(fiaList) {
                            $scope.fiaProfileList = fiaList;
                            $scope.selectedFiaItem = $scope.fiaProfileList[priorSelectionIdx];
                        })
                        .error(function(error) {
                            $scope.status = 'Unable to load FIA entity list: ' + error.message;
                        });
                //  $scope.fiaLegalEntity = null;
            }

            function populateFia(ocrProfileId) {
                dataFactory.populateFia(ocrProfileId)
                        .success(function(possible) {
                            $scope.possiblesObject = possible;
                            $scope.fiaLegalEntity = possible.fiaEntity;
                            $scope.ncrProfileList = possible.ncrEntities;
                            $scope.selectedNcrEntity = $scope.ncrProfileList[0];
                        })
                        .error(function(error) {
                            $scope.status = 'Unable to load NCR possibles entity : ' + error.message;
                            console.log(error.message);
                        });
            }


            function arrayObjectIndexOf(myArray, searchTerm, property) {
                for (var i = 0, len = myArray.length; i < len; i++) {
                    if (myArray[i][property] === searchTerm)
                        return i;
                }
                return -1;
            }
        });
