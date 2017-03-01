'use strict';

/**
 * @ngdoc function
 * @name lighthouseApp.controller:CheckoutCtrl
 * @description
 * # LineupCtrl
 * Controller of the lighthouseApp
 */

angular.module('vzMach')
  .controller('layoutController', ['$scope', '$state', '$rootScope', '$timeout', '$sce',
	function ($scope, $state, $rootScope, $timeout, $sce) {
	    $rootScope.chat = '';
	    $rootScope.chaturl = $sce.getTrustedResourceUrl("https://console.api.ai/api-client/demo/embedded/helpchat");
	}
  ]);
