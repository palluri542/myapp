angular.module('sgocr-ocr', [])
        .controller('OcrTabsCtrl', function($scope) {
            $scope.tabs = [{
                    title: 'Status',
                    url: '/status"'
                }, {
                    title: 'NCR/FIA Match',
                    url: 'two.tpl.html'
                }, {
                    title: 'Tools',
                    url: 'three.tpl.html'
                }];
            $scope.currentTab = 'one.tpl.html';

    $scope.onClickTab = function (tab) {
        $scope.currentTab = tab.url;
    }
    
    $scope.isActiveTab = function(tabUrl) {
        return tabUrl == $scope.currentTab;
    }
        });



