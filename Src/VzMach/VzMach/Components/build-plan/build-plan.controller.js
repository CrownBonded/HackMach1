'use strict';

/**
 * @ngdoc function
 * @name lighthouseApp.controller:CheckoutCtrl
 * @description
 * # LineupCtrl
 * Controller of the lighthouseApp
 */

angular.module('vzMach')
  .controller('byobController', ['$scope', '$state', '$rootScope', '$timeout','vzService',
	function ($scope, $state, $rootScope, $timeout,vzService) {
	    $rootScope.isFeedbackVisible = true;

	    var vm = this;
	    vm.isTvOnly = false;
	    vm.isDataOnly = false;
	    vm.isBoth = true;

	    //Slider config with custom display function
	    $scope.slider_translate = {
	        minValue: 100,
	        maxValue: 150,
	        options: {
	            ceil: 200,
	            floor: 0,
	            showTicksValues: true,
	            step: 50,
	            translate: function (value) {
	                return '$' + value;
	            }
	        }
	    };


	    vm.checkoutButton = true;
	    vm.checkoutButtonClick = function () {
	        $state.go('review');
	    };
	    vm.onPlanSelect = function(bundleId,plan)
	    {
	        //check select /deselect
	        //update bundle id to cart
	        if (plan.isSelected)
	        {
	            vzService.UpdateCart("").then(function (isUpdated) {
	                if (isUpdated)
	                {
	                    plan.isSelected = false;
	                    console.log("Unselected");
	                } 
	            })
	        }
	        else {
	            var planObj = _.filter(vm.plans, function (plan) {
	                return plan.isSelected == true;
	            });
	            planObj.isSelected = false;
	            vzService.UpdateCart(bundleId).then(function (isUpdated) {
	                if (isUpdated) {
	                    plan.isSelected = true;
	                    console.log("Selected");
	                }

	            })
	        }
	    };
	    vm.init = function ()
	    {
	        vm.plans = [];
	        vm.getAllPlans = function () {
	            vzService.getAllPlans("").then(function (data) {
	                constructVwObject(JSON.parse(data));
	            })
	        }
	        vm.getAllPlans();
	    };
	    vm.init();
	    function constructVwObject(bundles) {
	        for (var i = 0 ; i < bundles.length; i++) {
	            var planObj = {};
	            planObj.Name = bundles[i].Name;
	            planObj.Description = "";
	            if (bundles[i].DAT != "")
	                planObj.Description += "<p>" + bundles[i].DAT + " Internet  </p>";
	            if (bundles[i].TV != "")
	                planObj.Description += " <p>" + bundles[i].TV + " TV</p>";
	            if (bundles[i].VOICE != "")
	                planObj.Description += " <p>" + bundles[i].VOICE + " Voice<p>";
	            if (bundles[i].Router != "")
	                planObj.Description += "<p> Fios Quantum Router</p>";
	            if (planObj.Name.toLowerCase().indexOf('tv') > 0)
	                planObj.isTvOnly = true;
	            else if (planObj.Name.toLowerCase().indexOf('data') > 0)
	                planObj.isDataOnly = true;
	            else
	            {
	                planObj.isTvOnly = false;
	                planObj.isDataOnly = false;
	            }
	            planObj.BundleId = bundles[i].BundleId;
	            planObj.Price = parseFloat(bundles[i].Price);
	            planObj.isSelected = false;
	            vm.plans.push(planObj);
	        }
	    }
	    vm.filterName = "All types of Plans";
	    vm.setTV = function () {
	      
	        vm.isTvOnly = true;
	        vm.isDataOnly = false;
	        vm.isBoth = false;
	        vm.filterName = "TV only plans";
	    }
	    vm.setData = function () {

	        vm.isTvOnly = false;
	        vm.isDataOnly = true;
	        vm.isBoth = false;
	        vm.filterName = "Data only plans";
	    }
	    vm.setBoth = function () {
	  
	        vm.isTvOnly = false;
	        vm.isDataOnly = false;
	        vm.isBoth = true;
	        vm.filterName = "All types of Plans";
	    }
	    return vm;
	}
  ]);