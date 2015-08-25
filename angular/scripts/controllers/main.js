'use strict';

/**
 * @ngdoc function
 * @name appUiApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the appUiApp
 */
angular.module('appUiApp')
  .controller('MainCtrl', ['$scope', '$filter', 'ngTableParams', function ($scope, $filter, ngTableParams) {
    this.awesomeThings = [
      'HTML5 Boilerplate',
      'AngularJS',
      'Karma'
    ];
    $scope.json = [
	{
		"clientName" : "Teza Master Fund Ltd",
		"status" : "Ok",
		"Expected" : "02",
		"outStanding" : "3212",
		"logFiles" : [
					  {
					  	"logFile" : "jjj",
					  	"logDescription" : "ddd",
					  	"lines" : [1, 3, 23, 67, 89]
					  }
					]	
	},
	{
		"clientName" : "Master Fund Ltd",
		"status" : "Ok",
		"Expected" : "02",
		"outStanding" : "3212",
		"logFiles" : [
					  {
					  	"logFile" : "",
					  	"logDescription" : "",
					  	"lines" : [1, 3, 23, 67, 89]
					  }
					]
	},
	{
		"clientName" : "Teza Master Ltd",
		"status" : "Ok",
		"Expected" : "02",
		"outStanding" : "3212",
		"logFiles" : [
					  {
					  	"logFile" : "",
					  	"logDescription" : "",
					  	"lines" : [1, 3, 23, 67, 89]
					  }
					]
	},
	{
		"clientName" : "Teza Fund Ltd",
		"status" : "OF",
		"Expected" : "02",
		"outStanding" : "3212",
		"logFiles" : [
					  {
					  	"logFile" : "123455",
					  	"logDescription" : "1111",
					  	"lines" : [1, 3, 23, 67, 89]
					  }
					]
	},
	{
		"clientName" : "Teza Fund Ltd",
		"status" : "OF",
		"Expected" : "02",
		"outStanding" : "3212",
		"logFiles" : [
					  {
					  	"logFile" : "123455",
					  	"logDescription" : "1111",
					  	"lines" : [1, 3, 23, 67, 89]
					  }
					]
	},
	{
		"clientName" : "Teza Fund Ltd",
		"status" : "OF",
		"Expected" : "02",
		"outStanding" : "3212",
		"logFiles" : [
					  {
					  	"logFile" : "123455",
					  	"logDescription" : "1111",
					  	"lines" : [1, 3, 23, 67, 89]
					  }
					]
	},
	{
		"clientName" : "Teza Fund Ltd",
		"status" : "OF",
		"Expected" : "02",
		"outStanding" : "3212",
		"logFiles" : [
					  {
					  	"logFile" : "123455",
					  	"logDescription" : "1111",
					  	"lines" : [1, 3, 23, 67, 89]
					  }
					]
	},
	{
		"clientName" : "Teza Fund Ltd",
		"status" : "FE",
		"Expected" : "02",
		"outStanding" : "3212",
		"logFiles" : [
					  {
					  	"logFile" : "123455",
					  	"logDescription" : "1111",
					  	"lines" : [1, 3, 23, 67, 89]
					  }
					]
	},
	{
		"clientName" : "Teza Fund Ltd",
		"status" : "FE",
		"Expected" : "02",
		"outStanding" : "3212",
		"logFiles" : [
					  {
					  	"logFile" : "123455",
					  	"logDescription" : "1111",
					  	"lines" : [1, 3, 23, 67, 89]
					  }
					]
	},
	{
		"clientName" : "Teza Fund Ltd",
		"status" : "FE",
		"Expected" : "02",
		"outStanding" : "3212",
		"logFiles" : [
					  {
					  	"logFile" : "123455",
					  	"logDescription" : "1111",
					  	"lines" : [1, 3, 23, 67, 89]
					  }
					]
	},{
		"clientName" : "Teza Fund Ltd",
		"status" : "EO",
		"Expected" : "02",
		"outStanding" : "3212",
		"logFiles" : [
					  {
					  	"logFile" : "123455",
					  	"logDescription" : "1111",
					  	"lines" : [1, 3, 23, 67, 89]
					  }
					]
	},
	{
		"clientName" : "Teza Fund Ltd",
		"status" : "EO",
		"Expected" : "02",
		"outStanding" : "3212",
		"logFiles" : [
					  {
					  	"logFile" : "123455",
					  	"logDescription" : "1111",
					  	"lines" : [1, 3, 23, 67, 89]
					  }
					]
	},
	{
		"clientName" : "Teza Fund Ltd",
		"status" : "EO",
		"Expected" : "02",
		"outStanding" : "3212",
		"logFiles" : [
					  {
					  	"logFile" : "123455",
					  	"logDescription" : "1111",
					  	"lines" : [1, 3, 23, 67, 89]
					  }
					]
	},
	{
		"clientName" : "Teza Fund Ltd",
		"status" : "OF",
		"Expected" : "02",
		"outStanding" : "3212",
		"logFiles" : [
					  {
					  	"logFile" : "123455",
					  	"logDescription" : "1111",
					  	"lines" : [1, 3, 23, 67, 89]
					  }
					]
	}
];

	/*jslint newcap:true */  
	$scope.tableParams = new ngTableParams({
            page: 1,            // show first page
            count: 10000000,          // count per page
            filter: {
                status: ''       // initial filter
            }
        }, {
			counts: [], // hide page counts control
            total: $scope.json.length, // length of data
            getData: function($defer, params) {
                // use build-in angular filter
                var orderedData = params.filter() ?
                        $filter('filter')($scope.json, params.filter()) :
                         $scope.json;

                $scope.users = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

                params.total(orderedData.length); // set total for recalc pagination
                $defer.resolve($scope.users);
            }
        });



		$scope.handleRowClick = function(row){
			console.log(row.logFiles);
			/*jslint newcap:true */  
			$scope.tableParams1 = new ngTableParams({
		            page: 1,            // show first page
		            count: 10,          // count per page
		           
		        }, {
		            total: row.logFiles.length, // length of data
		            getData: function($defer, params) {
		                // use build-in angular filter
		                var orderedData = params.filter() ?
		                        $filter('filter')(row.logFiles, params.filter()) :
		                         row.logFiles;

		                $scope.rightSideTable = orderedData.slice((params.page() - 1) * params.count(), params.page() * params.count());

		                params.total(orderedData.length); // set total for recalc pagination
		                $defer.resolve($scope.rightSideTable);
		            }
		        });
		};

  }]);
