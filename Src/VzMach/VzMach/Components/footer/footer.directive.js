'use strict';

/**
 * @ngdoc function
 * @name lighthouseApp.directive:vzNotification
 * @description
 * # vzNotification
 * Directive of the lighthouseApp
 */

angular.module('vzMach')
.directive('vzFooter', ['$rootScope', function($rootScope, NotificationSvc) {
  return {
    restrict: 'E',
    controller: 'FooterCtrl',
    templateUrl: 'components/footer/footer.html'
  };
}]);
