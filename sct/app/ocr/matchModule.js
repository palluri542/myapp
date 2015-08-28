angular.module('sgocr-match', ['ocrApp.dataService','ui.router'])
        .controller('MatchCtrl',
                function($scope,  dataFactory) {
                    $scope.ncrProfileList;
                    $scope.possiblesObject;
                    $scope.fiaLegalEntity;
                    $scope.status;
                    priorSelectionIdx = 0;

 $scope.fiaSelectAction = function() {
                        pos = $scope.fiaProfileList.map(function(e) { 
                            return e.ocrProfileId; }).indexOf($scope.selectedFiaItem.ocrProfileId);
                        if( 0 >= pos){
                            priorSelectionIdx = 0;
                        }else{
                            priorSelectionIdx=pos;
                        }
                        $scope.fiaLegalEntity = null;
                         populatePossibles($scope.selectedFiaItem.ocrProfileId);
                    };

                    $scope.commitMatchAction = function() {
                        commitMatch();
                        $scope.ncrProfileList = null;
                        $scope.possiblesObject = null;
                        $scope.fiaLegalEntity = null;
                        $scope.selectedNcrEntity=null;
                    };

                    

                     function commitMatch() {

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

                    function getFiaList() {
                        dataFactory.fiaEntityList()
                                .success(function(fiaList) {
                                    $scope.fiaProfileList = fiaList;
                                    console.log("List len: " + $scope.fiaProfileList.length);
                                    console.log("PriorIdx: " + priorSelectionIdx);
                                    $scope.selectedFiaItem = $scope.fiaProfileList[priorSelectionIdx];
                                })
                                .error(function(error) {
                                    $scope.status = 'Unable to load FIA entity list: ' + error.message;
                                });
                        //  $scope.fiaLegalEntity = null;
                    }

                    function populatePossibles(ocrProfileId) {
                        dataFactory.ncrPossibles(ocrProfileId)
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
                    
                    console.log("Calling getFiaList");
                    getFiaList();
                    
                    
                });

