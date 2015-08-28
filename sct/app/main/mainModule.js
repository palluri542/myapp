var myApp = angular.module('ocrApp', [
    'ui.grid',
    'ngResource',
    'ui.router',
    'sgocr-ocr',
    'sgocr-accounts',
    'sgocr-admin',
    'sgocr-match',
    'sgocr-openMatch',
    'sgocr-profiles',
    'sgocr-saMatch',
    'sgocr-schedule',
    'sgocr-status',
    'sgocr-tools',
    'ocrApp.dataService'])
        .config(
                ['$stateProvider', '$urlRouterProvider',
                    function($stateProvider, $urlRouterProvider) {
                        $urlRouterProvider.otherwise('ocr');

                        $stateProvider
                                .state('ocr', {
                                    abstract: false, 
                                    url:"/ocr", 
                                    templateUrl:"ocr/ocrPrtl.html"})      
                                .state('ocr.admin', {
                                    url: '/admin',
                                    templateUrl: 'ocr/adminPrtl.html',
                                    controller: 'AdminCtrl',
                                    data: {
                                    }
                                })  
                                .state('ocr.match', {
                                    url: '/match',
                                    templateUrl: 'ocr/matchPrtl.html',
                                    controller: 'MatchCtrl',
                                    data: {
                                    }
                                })  
                                .state('ocr.link', {
                                    url: '/link',
                                    templateUrl: 'ocr/openMatchPrtl.html',
                                    controller: 'OpenMatchCtrl',
                                    data: {
                                    }
                                })  
                                .state('ocr.saMatch', {
                                    url: '/saMatch',
                                    templateUrl: 'ocr/saMatchPrtl.html',
                                    controller: 'SaMatchCtrl',
                                    data: {
                                    }
                                })  
                                .state('ocr.schedule', {
                                    url: '/schedule',
                                    templateUrl: 'ocr/schedulePrtl.html',
                                    controller: 'ScheduleCtrl',
                                    data: {
                                    }
                                })  
                                .state('ocr.status', {
                                    url: '/status',
                                    templateUrl: 'ocr/statusPrtl.html',
                                    controller: 'StatusCtrl',
                                    data: {
                                    }
                                })  
                                .state('ocr.tools', {
                                    url: '/tools',
                                    templateUrl: 'ocr/toolsPrtl.html',
                                    controller: 'ToolsCtrl',
                                    data: {
                                    }
                                })   
                                .state('ltrp', {
                                    url: '/accounts',
                                    templateUrl: 'ocr-accounts/acctsPrtl.html',
                                    controller: 'AccountsCtrl',
                                    data: {
                                    }
                                })
                                .state('part20', {
                                    url: '/profiles',
                                    templateUrl: 'ocr-profiles/profilesPrtl.html',
                                    controller: 'ProfilesCtrl',
                                    data: {
                                    }
                                })
                    }
                ]);


myApp.controller('PortalNavCtrl', ['$scope', function($scope) {
        $scope.ltrpSelectionStyle = false;
        $scope.matchSelectionStyle = false;
        $scope.profilesSelectionStyle = false;
        $scope.ocrSelectionStyle = true;
        $scope.saMatchSelectionStyle = false;
        $scope.toolsSelectionStyle = false;

        $scope.selectLtrp = function() {
            $scope.ltrpSelectionStyle = true;
            $scope.matchSelectionStyle = false;
            $scope.profilesSelectionStyle = false;
            $scope.ocrSelectionStyle = false;
            $scope.saMatchSelectionStyle = false;
            $scope.toolsSelectionStyle = false;
        };
        
        $scope.selectOcr = function() {
            $scope.ltrpSelectionStyle = false;
            $scope.matchSelectionStyle = false;
            $scope.profilesSelectionStyle = false;
            $scope.ocrSelectionStyle = true;
            $scope.saMatchSelectionStyle = false;
            $scope.toolsSelectionStyle = false;
        };
        
        $scope.selectMatch = function() {
            $scope.ltrpSelectionStyle = false;
            $scope.matchSelectionStyle = true;
            $scope.profilesSelectionStyle = false;
            $scope.ocrSelectionStyle = false;
            $scope.saMatchSelectionStyle = false;
            $scope.toolsSelectionStyle = false;
            //     $state.go('match');
        };
        $scope.selectProfiles = function() {
            $scope.ltrpSelectionStyle = false;
            $scope.matchSelectionStyle = false;
            $scope.profilesSelectionStyle = true;
            $scope.ocrSelectionStyle = false;
            $scope.saMatchSelectionStyle = false;
            $scope.toolsSelectionStyle = false;
        };
        $scope.selectSaMatch = function() {
            $scope.ltrpSelectionStyle = false;
            $scope.matchSelectionStyle = false;
            $scope.profilesSelectionStyle = false;
            $scope.ocrSelectionStyle = false;
            $scope.saMatchSelectionStyle = true;
            $scope.toolsSelectionStyle = false;
            //     $state.go('match');
        };
        $scope.selectStatus = function() {
            $scope.ltrpSelectionStyle = false;
            $scope.matchSelectionStyle = false;
            $scope.profilesSelectionStyle = false;
            $scope.ocrSelectionStyle = true;
            $scope.saMatchSelectionStyle = false;
            $scope.toolsSelectionStyle = false;
        };
        $scope.selectTools = function() {
            $scope.ltrpSelectionStyle = false;
            $scope.matchSelectionStyle = false;
            $scope.profilesSelectionStyle = false;
            $scope.ocrSelectionStyle = false;
            $scope.saMatchSelectionStyle = false;
            $scope.toolsSelectionStyle = true;
        };
    }]);
