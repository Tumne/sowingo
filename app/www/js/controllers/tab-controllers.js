angular.module('starter.tab-controllers', [])

.controller('TabCtrl', function($scope, $location) {
  $scope.bioTest = function(){
    console.log("works!");
    $location.path('/tab/biotests');
  };
  $scope.chemTest = function(){
    console.log("works!");
    $location.path('/tab/chemtests');
  };
})