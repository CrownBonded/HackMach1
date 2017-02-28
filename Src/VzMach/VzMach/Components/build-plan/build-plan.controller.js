'use strict';

/**
 * @ngdoc function
 * @name lighthouseApp.controller:CheckoutCtrl
 * @description
 * # LineupCtrl
 * Controller of the lighthouseApp
 */

angular.module('vzMach')
  .controller('byobController', ['$scope', '$state', '$rootScope', '$timeout', 'vzService',
	function ($scope, $state, $rootScope, $timeout, vzService) {
	    $rootScope.isFeedbackVisible = true;

	    var vm = this;
	    vm.isTvOnly = false;
	    vm.isDataOnly = false;
	    vm.isBoth = true;
	    vm.selectedEquipment = null;
	    vm.selectedPlan = null;
	    vm.isEquipment = false;
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

	    vm.click = function (button) {
	        if (button == "tv") {
	            vm.isTvOnly = true;
	            vm.isDataOnly = false;
	            vm.isBoth = false;
	        }
	        else if (button == "data") {
	            vm.isTvOnly = false;
	            vm.isDataOnly = true;
	            vm.isBoth = false;
	        }
	        else if (button == "both") {
	            vm.isTvOnly = false;
	            vm.isDataOnly = false;
	            vm.isBoth = true;
	        }

	    };
	    vm.checkoutButton = false;
	    vm.checkoutButtonClick = function () {
	        if (vm.selectedPlan != null) {
	            vzService.UpdateCart(vm.selectedPlan.BundleId, "CORE")
	        }
	        if (vm.selectedEquipment != null) {
	            vzService.UpdateCart(vm.selectedPlan.BundleId, "COMP")
	        }
	        $state.go('review');
	    };
	    vm.chooseBundle = function (plan) {
	        resetSelection(vm.plans);
	        if ((plan.Description).toLowerCase().indexOf("tv") < 0) {
	            vm.equipments = _.filter(vm.equipments, function (o) {
	                return o.Name.toLowerCase().indexOf("tv") < 0;
	            });
	        }
	        vm.selectedPlan = plan;
	        plan.isSelected = true;
	        $("#plans").slideUp();
	        $("#equipments").slideDown();
	        vm.isEquipment = true;

	    }

	    function resetSelection(obj) {
	        for (var i = 0; i < obj.length; i++) {
	            obj.isSelected = false;
	        }
	    }
	    vm.init = function () {
	        vm.plans = [];
	        vm.getAllPlans = function () {
	            vzService.getAllPlans("").then(function (data) {
	                var resultObj = JSON.parse(data)
	                var corePlans = _.filter(resultObj, function (o) {
	                    return o.Type.toLowerCase().indexOf('core') >= 0;
	                });
	                var addOns = _.filter(resultObj, function (o) {
	                    return o.Type == "COMP";
	                });
	                console.log(data);
	                constructVwObject(corePlans);
	                constructEquipmentObject(addOns);
	            })
	        }
	        vm.equipments = [];
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
	            if (planObj.Name.toLowerCase().indexOf('tv') >= 0)
	                planObj.isTvOnly = true;
	            else if (planObj.Name.toLowerCase().indexOf('data') >= 0)
	                planObj.isDataOnly = true;
	            else {
	                planObj.isTvOnly = false;
	                planObj.isDataOnly = false;
	            }
	            planObj.BundleId = bundles[i].BundleId;
	            planObj.Price = parseFloat(bundles[i].Price);
	            planObj.isSelected = false;
	            vm.plans.push(planObj);
	        }
	    }
	    var obj = {};
	    function constructEquipmentObject(bundles) {
	        for (var i = 0 ; i < bundles.length; i++) {
	            obj = {};
	            obj.Name = "";
	            if (bundles[i].TV != "")
	                obj.Name += " <p class='text-xxlarge'>" + bundles[i].TV + "</p>";
	            if (bundles[i].ROUTER != "")
	                obj.Name += " <p class='text-xxlarge'> Fios Quantum Router</p>";
	            obj.Price = bundles[i].Price;
	            obj.BundleId = bundles[i].BundleId;
	            obj.isSelected = false;
	            vm.equipments.push(obj);
	        }
	        vm.savedEquipments = angular.copy(vm.equipments);
	    }
	    vm.chooseEquipment = function (equipment) {
	        vm.chosenBundleMessage = vm.selectedPlan.Name + equipment.Name;
	        vm.selectedEquipment = equipment;
	        $("#equipments").slideUp();
	        $("#chosenBundle").slideDown();
	        vm.checkoutButton = true;
	        vm.isEquipment = false;

	    }
	    vm.rejectEquipment = function () {
	        vm.chosenBundleMessage = vm.selectedPlan.Name;
	        vm.selectedEquipment = null;
	        $("#equipments").slideUp();
	        $("#chosenBundle").slideDown();
	        vm.checkoutButton = true;
	        vm.isEquipment = false;
	    }
	    vm.cancel = function () {
	        vm.equipments = vm.savedEquipments;
	        $("#chosenBundle").slideUp();
	        $("#plans").slideDown();
	        vm.checkoutButton = false;
	        vm.isEquipment = false;
	    }
	    vm.goBack = function () {
	        vm.equipments = vm.savedEquipments;
	        $("#equipments").slideUp();
	        $("#plans").slideDown();
	        vm.checkoutButton = false;
	        vm.isEquipment = false;
	    }
	    // vm.filterName = "All types of Plans";
	    vm.setTV = function () {

	        vm.isTvOnly = true;
	        vm.isDataOnly = false;
	        vm.isBoth = false;
	        //vm.filterName = "TV only plans";
	    }
	    vm.setData = function () {

	        vm.isTvOnly = false;
	        vm.isDataOnly = true;
	        vm.isBoth = false;
	        //vm.filterName = "Data only plans";
	    }
	    vm.setBoth = function () {

	        vm.isTvOnly = false;
	        vm.isDataOnly = false;
	        vm.isBoth = true;
	        //vm.filterName = "All types of Plans";
	    }
	    return vm;
	}
  ]);