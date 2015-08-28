angular.module('sgocr-resource').factory('Books', ['$resource', function($resource) {
	return $resource( '/book/:bookId', 
		{ bookId: '@bookId' }, { 
			loan: { 
				method: 'PUT', 
				params: { bookId: '@bookId' }, 
				isArray: false 
			} 
			/* , method2: { ... } */
		} );

}]);

