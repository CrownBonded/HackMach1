'use strict';

/**
 * @ngdoc function
 * @name lighthouseApp.controller:CheckoutCtrl
 * @description
 * # LineupCtrl
 * Controller of the lighthouseApp
 */

angular.module('vzMach')
  .controller('feedbackController   ', ['$scope', '$state', '$rootScope', '$timeout',
	function ($scope, $state, $rootScope, $timeout) {
	    $rootScope.isFeedbackVisible = false;
	    $scope.back = function () {
	        $state.back(-1);
	    }
	    $scope.submit = function () {
	        $state.go('home')
	    }
	}
  ]);
