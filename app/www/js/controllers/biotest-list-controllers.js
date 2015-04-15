angular.module('starter.biotest-list-controllers', [])

.controller('BioTestsCtrl', function($scope, $rootScope, $state, $ionicModal, $window, toaster, MembershipService, $location, BioTest, AuthService) {
  
  toaster.pop('success', "title", "text");
  
  $rootScope.fullname = MembershipService.getFullname();
  $rootScope.currentAddress = MembershipService.getCurrentAddress();
  
  $scope.fullname = $rootScope.fullname;
  $scope.currentAddress = $rootScope.currentAddress;

  var recordObject={};
  $scope.showResult = false;

  $scope.pop = function(){
    toaster.pop('success', "title", "text");
  };

  $ionicModal.fromTemplateUrl('templates/location-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.userInfo = MembershipService.getAccountInfo();
    $scope.officeValue = MembershipService.getOfficeValue();
    console.log($scope.officeValue);
    console.log($scope.accountInfo);
    $scope.modal = modal;
    // $scope.modal.show();
  });

  $scope.openModal = function() {
    $scope.modal.show();
  };

  $scope.choose = function(value){
    MembershipService.initiateMembership($scope.userInfo, value).then(function(data){
      console.log(data);
      $state.go($state.current, {}, {reload: true});
      $scope.modal.hide();
    });
  };

  $scope.cancelModal = function(){
    $scope.modal.hide();
    console.log($scope.userInfo);
  };


  $scope.reverse = true;
  $scope.predicate = "date";

  
  BioTest.getSterilizationRecords().then(function(data){
    recordObject =data;
    $scope.records = data.sterilization_tests;
  });


  $scope.addRecord = function(){
    $location.path('/tab/biotests/');
  };

  $scope.setResult = function(result, currentRecord){

    var resultString;
    if(result){
      resultString = 'Passed';
    } else {
      resultString = 'Failed';
    }

    BioTest.initTestingUsers().then(function(data){

      currentRecord.recorder_id = data[0].id;
      currentRecord.recorder_name = data[0].fullname;
      currentRecord.result = resultString;
      console.log(currentRecord);
      BioTest.updateSterilizationRecord(currentRecord.id, currentRecord).then(function(data){
        console.log(data);
      });
    });


    console.log(recordObject);   
 

  };

  $scope.remove = function(chat) {
    Chat.remove(chat);
  };

  $scope.reorder = function(predicate){
    $scope.predicate = predicate;
    $scope.reverse = !$scope.reverse;
  };

  $scope.logout = function() {
      console.log(AuthService.logout());
  };
});
