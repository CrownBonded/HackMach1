'use strict';

/**
 * @ngdoc function
 * @name lighthouseApp.controller:CheckoutCtrl
 * @description
 * # LineupCtrl
 * Controller of the lighthouseApp
 */

angular.module('vzMach')
  .controller('recommendedController', ['$scope', '$state', '$rootScope', '$timeout','vzService',
	function ($scope, $state, $rootScope, $timeout, vzService) {
	    $rootScope.isFeedbackVisible = false;
	    var vm = this;
	    vm.select = function (indexValue) {
	        $state.go("recommendedPlan", { index: indexValue });
	    };
	    vm.OnBuildBundleClick = function () {
	        $state.go("byo");
	    };
	    vm.city = vzService.getCity();
	        
	    return vm;
	  
	}
  ]);
