'use strict';

/**
 * @ngdoc function
 * @name lighthouseApp.controller:CheckoutCtrl
 * @description
 * # LineupCtrl
 * Controller of the lighthouseApp
 */

angular.module('vzMach')
  .controller('recommendedPlanController', ['$scope', '$state', '$rootScope', '$timeout', 'vzService', '$stateParams',
	function ($scope, $state, $rootScope, $timeout, vzService, $stateParams) {
	    $rootScope.isFeedbackVisible = true;
	    var vm = this;
	    vm.index = $stateParams.index;
	    vm.listIndex = 0;
	    vm.equipIndex = 0;
	    vm.selectedPlan = null;
	    vm.selectedEquipment = null;
	    vm.isByo = true;
	    var zipcode = vzService.getZipcode();
	    var city = vzService.getCity();
	    var result = {};
	    vzService.getRecommendPlans(zipcode).then(function (data) {
	        result = JSON.parse(data);
	        console.log(result)
	        fillData();
	    })
	    vzrfInit();
	   
	  
	    vm.slides = [];
	    //{"NewlyReleasedBundle":[{"BundleId":"B0031","Type":"CORE","Name":"DoublePlay",
	    //    "Price":"124.98","DAT":"100M","TV":"Extreme","VOICE":"","ROUTER":"","Discount":"","Keyword":"DAT_TV"}],
	    //    "ZipPopularBundle":[{"BundleId":"B0004","Type":"CORE","Name":"TriplePlay","Price":"139.98","DAT":"50M","TV":"Ultimate",
	    //        "VOICE":"Unlimited","ROUTER":"","Discount":"","Keyword":"DAT_TV_VOICE"}],
	    //    "CntryPopularBundle":[{"BundleId":"B0008","Type":"CORE","Name":"TriplePlay",
	    //        "Price":"89.99","DAT":"75M","TV":"Ultimate","VOICE":"Unlimited",
	    //        "ROUTER":"","Discount":"","Keyword":"DAT_TV_VOICE"}],
	    //    "SubPopularBundle":[{"BundleId":"C0004","Type":"COMP",
	    //        "Name":"Equipment","Price":"24.99","DAT":"","TV":"1 TV+ Enhanced Recording","VOICE":"","ROUTER":"BHR5","Discount":"","Keyword":"REC_ROT"}]}
	    function fillData() {
	        var obj = {};
	        vm.slides = [];
	        vm.equipments = [];
	        vm.savedEquipments = [];
	        constructVwObject(result.NewlyReleasedBundle, "Newly Released");
	        constructVwObject(result.ZipPopularBundle, "Popular in " + city);
	        constructVwObject(result.CntryPopularBundle, "Popular in US");
	        constructEquipmentObject(result.SubPopularBundle)
	        function constructVwObject(bundles, categoryName) {
	            obj = {};
	            obj.plans = [];
	            obj.text = categoryName;
	            for (var i = 0 ; i < bundles.length; i++) {
	                var planObj = {};
	                planObj.planName = bundles[i].Name;
	                planObj.Description = "";
	                if (bundles[i].DAT != "")
	                    planObj.Description +="<p class='text-xxlarge'>"+ bundles[i].DAT + " Internet  </p>";
	                if (bundles[i].TV != "")
	                    planObj.Description += " <p class='text-xxlarge'>" + bundles[i].TV + " TV</p>";
	                if (bundles[i].VOICE != "")
	                    planObj.Description += " <p class='text-xxlarge'>" + bundles[i].VOICE + " Voice<p>";
	                planObj.Price = bundles[i].Price;
	                planObj.BundleId = bundles[i].BundleId;
	                obj.plans.push(planObj);
	            }
	            vm.slides.push(obj);
	        }
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
	                vm.equipments.push(obj);
	            }
	            vm.savedEquipments = angular.copy(vm.equipments);
	        }
	        console.log(vm.equipments)
	    }

	    vm.goNext = function () {
	        vm.index = (vm.index + 1) % (vm.slides.length);
	        vm.listIndex = 0;
	    };
	    vm.goPrev = function () {
	        if (vm.index == 0)
	            vm.index = vm.slides.length;
	        vm.index--;
	        vm.listIndex = 0;
	    };
	    vm.goNextPlan = function () {
	        vm.listIndex = (vm.listIndex + 1) % (vm.slides[vm.index].plans.length);
	    }
	    vm.goPrevPlan = function () {
	        if (vm.listIndex == 0)
	            vm.listIndex = vm.slides[vm.index].plans.length;
	        vm.listIndex--;
	    }


	    vm.chooseBundle = function (plan) {
	        if ((plan.Description).toLowerCase().indexOf("tv") < 0) {
	            vm.equipments = _.filter(vm.equipments, function (o) {
	                return o.Name.toLowerCase().indexOf("tv") < 0;
	            });
	        }
	        else if ((plan.Description).toLowerCase().indexOf("tv") > 0) {
	            vm.equipments = _.filter(vm.equipments, function (o) {
	                return o.Name.toLowerCase().indexOf("tv") > 0;
	            });
	        }
	        vm.isByo = false;
	        vm.selectedPlan = plan;
	        vm.selectedEquipment = vm.equipments[vm.equipIndex];
	        $("#plans").slideUp();
	        $("#equipment").slideDown();
	    }
	    //vm.chooseEquipment = function () {
	    //    vm.chosenBundleMessage = vm.selectedPlan.planName + vm.equipments[vm.equipIndex].Name;
	    //    vm.selectedEquipment = vm.equipments[vm.equipIndex];
	    //    $("#equipment").slideUp();
	    //    $("#chosenBundle").slideDown();

	    //}
	    //vm.rejectEquipment = function () {
	    //    vm.chosenBundleMessage = vm.slides[vm.index].plans[vm.listIndex].planName;
	    //    $("#equipment").slideUp();
	    //    $("#chosenBundle").slideDown();
	    //}
	    //vm.cancel = function () {
	    //    vm.equipments = vm.savedEquipments;
	    //    $("#chosenBundle").slideUp();
	    //    $("#plans").slideDown();
	    //    vm.isByo = true;
	    //}
	    vm.goBack = function () {
	        vm.equipments = vm.savedEquipments;
	        $("#equipment").slideUp();
	        $("#plans").slideDown();
            vm.isByo = true;
	    }
	    vm.buildplanButtonClick = function () {
	        $state.go('byo');
	    };
	    var countUp = function () {
	        swiperInit();
	    }
	    vm.back = function()
	    {
	        $state.go('recommended');
	    };
	    vm.reviewButtonClick = function()
	    {
	        if (vm.selectedPlan != null || vm.selectedPlan != undefined) {
	            vzService.UpdateCart(vm.selectedPlan.BundleId, "CORE").then(function () {
	                if (vm.selectedEquipment != null || vm.selectedEquipment != undefined) {
	                    vzService.UpdateCart(vm.selectedEquipment.BundleId, "COMP").then(function () {
	                        $state.go('review');
	                    })
	                }
	            })
	        }
	        

	        
	    };
	    $timeout(countUp, 500);
	    return vm;
	}
  ]);
