'use strict';

/**
 * @ngdoc function
 * @name lighthouseApp.controller:CheckoutCtrl
 * @description
 * # LineupCtrl
 * Controller of the lighthouseApp
 */

angular.module('vzMach')
  .controller('landingController', ['$scope', '$state', '$rootScope', '$timeout', 'vzService',
	function ($scope, $state, $rootScope, $timeout, vzService) {
	    var vm = this;
	    vm.streetAddress = "";
	    vm.update = function () {
	        $state.go("recommended");
	    };
	    vm.continue = function () {
	        vzService.setZipcode(vm.zipcode)
	        vzService.setCity(vm.city)
	        vzService.setStreetAddress(vm.streetAddress)
	        $state.go("recommended");
	    };
	    vm.init = function () {
	        vzService.getIP().then(function (data) {
	            vm.city = data.city;
	            vm.state = vzService.getStateCode(data.region);
	            vm.zipcode = parseInt(data.postal);
	        })
	    };
	    vm.getRecommendPlans = function () {
	        vzService.getRecommendPlans(vm.zipcode).then(function (data) {
	            console.log(JSON.parse(data));
	        })
	    }
	    vm.getZipInfo = function () {
	        if (vm.zipcode.toString().length == 5) {
	            vzService.getZipDetails(vm.zipcode).then(function (data) {
	                vm.city = data.city;
	                vm.state = data.state;
	            })
	        }
	    }
	    $scope.isHelpEnabled = false;	   
	    vm.init();
	    return vm;
	}
  ]);
