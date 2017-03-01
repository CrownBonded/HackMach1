angular.module('vzMach')
  .controller('reviewController', ['$scope', '$state', '$rootScope', '$timeout', 'vzService', '$stateParams',
	function ($scope, $state, $rootScope, $timeout, vzService, $stateParams) {

	    var vm = this;
	    vm.TotalPrice = 0;
	    vm.plans = [];
	    vm.init = function () {
	        vzService.getCart().then(function (data) {
	            var plans = JSON.parse(data);
	            constructVwObject(plans);
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
	                    if (bundles[i].ROUTER != "")
	                        planObj.Description += "<p> Fios Quantum Router</p>";
	                    planObj.BundleId = bundles[i].BundleId;
	                    planObj.Price = parseFloat(bundles[i].Price);
	                    vm.TotalPrice += planObj.Price;
	                    
	                    vm.plans.push(planObj);
	                }
	            }
	            vm.TotalPrice = vm.TotalPrice.toFixed(2);
	        })
	    }
	    vm.init();
	    vm.changePlan = function () {
	        $state.go('recommended');
	    }
	    vm.submitClick = function () {
	        $("#review").slideUp();
	        $("#orderPlaced").slideDown();
	        $("#submitButton").slideUp();
	    }
	} ]);