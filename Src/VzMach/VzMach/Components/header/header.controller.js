'use strict';

/**
 * @ngdoc function
 * @name lighthouseApp.controller:CheckoutCtrl
 * @description
 * # LineupCtrl
 * Controller of the lighthouseApp
 */

angular.module('vzMach')
  .controller('HeaderCtrl', ['$scope', '$state', '$rootScope', '$timeout',
	function ($scope, $state, $rootScope, $timeout) {
	    $rootScope.isFeedbackVisible = false;
	    $scope.feedback = function () {
	        $state.go('feedback')
	    }
	}
  ]);
