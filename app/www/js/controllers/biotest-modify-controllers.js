angular.module('starter.biotest-modify-controllers', [])

.controller('BioTestDetailCtrl', function($scope, $rootScope, $ionicPopup, toaster, $location, $ionicModal, $state, MembershipService, $stateParams, BioTest, AuthService, filterFilter) {
  $scope.fullname = $rootScope.fullname;
  $scope.currentAddress = $rootScope.currentAddress;

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
      $scope.modal.hide();
      $location.path('/tab/biotests');
    });
  };

  $scope.cancelModal = function(){
    $scope.modal.hide();
    console.log($scope.userInfo);
  };

  $scope.sterilizerObject = {};
  $scope.sterilizerIndex = null;
  $scope.editValue = false;
  $scope.addValue = false;
  $scope.isDisabled=true;
  $scope.value = false;

  function resetForm(){
    $scope.record=null;
    $scope.record={type: 'bio_test'};
  }

  resetForm();
  $scope.setCompany = false;


  // $scope.newSterilizer = BioTest.initNewSterilizer();
  // console.log($scope.newSterilizer.name);


  if($stateParams.dataId === ""){
    $scope.isEmpty = true;
    $scope.emptySterilizer = BioTest.initNewSterilizer();
      $scope.record.test_time = BioTest.initTime();

    $scope.hours = BioTest.initHours();

    $scope.title = "New Entry";

    function populateSterilizers(){
      BioTest.initSterilizers().then(function(data){
        $scope.sterilizers = data;
        $scope.sterilizerObject = angular.copy(data);
      });
    }

    populateSterilizers();

    BioTest.initTestingUsers().then(function(data){
      $scope.users = data;
      console.log(data);
    });

    BioTest.initIndicatorCompanies().then(function(data){
      console.log(data);
      $scope.companies = data;
    });

  } else {
    $scope.isEmpty = false;

    $scope.title = "Edit Entry";


    BioTest.getSterilizationRecords().then(function(data){
      var records = data.sterilization_tests;
      console.log(records);
      angular.forEach(records, function(record){
        if(record.id == $stateParams.dataId){
          console.log(record);
          $scope.completedRecord = record;

        }
      });
    });

  }


  $scope.getCompany = function(selectedCompany){
    console.log($scope.setCompany);
    switch(selectedCompany){
      case 'add':
        $scope.record.indicatorCompany = '';
        $scope.isNewCompany = true;
        break;
      case 'x':
        console.log($scope.setCompany);
        break;
      default:
        $scope.record.indicatorCompany = selectedCompany;
        break;
    }
  };

  $scope.cancelInput = function(){
    $scope.record.indicatorCompany = '';
    $scope.isNewCompany = false;
    $scope.setCompany = true;
    console.log($scope.setCompany);
  };

  $scope.setCurrentUser = function(currentUser){
    $scope.record.tester_id = currentUser.id;
  };

  $scope.setSterilizer = function(currentSterilizer){
    $scope.currentSterilizer = currentSterilizer;
    $scope.sterilizerObject = angular.copy($scope.sterilizers);

    if(currentSterilizer !== null){
      angular.forEach($scope.sterilizerObject,function(sterilizerObject,index){
        if(sterilizerObject.id == currentSterilizer.id){
          $scope.sterilizerIndex = index;      
        }
      });
    }
  };
  
  $scope.setPreset = function(currentPreset){
    if(currentPreset === null){
      $scope.record.sterilizer_preset = '';
    } else {
      $scope.record.sterilizer_preset = currentPreset.id;
    }
  };

  $scope.removePreset = function(array, index){
      array.splice(index, 1);
  };

  $scope.addPreset = function(presets) {
    presets.push({});
  };

  // rename: toggleEditSterilizer
  $scope.editSterilizer = function(){
    if($scope.newValue){
      $scope.newValue = !$scope.newValue;
      // reset
      $scope.emptySterilizer = BioTest.initNewSterilizer();
    } else {
      $scope.value = !$scope.value;
    }
    if($scope.editValue){
      console.log("reset");
      // reset
      $scope.sterilizerObject = angular.copy($scope.sterilizers);
    }
    $scope.editValue = !$scope.editValue;
  };

  // rename: toggleNewSterilizer
  $scope.newSterilizer = function(){
    if($scope.editValue){
      $scope.editValue = !$scope.editValue;
      // reset
      $scope.sterilizerObject = angular.copy($scope.sterilizers);
    } else {
      $scope.value = !$scope.value;
    }

    if($scope.newValue){
      // reset
      $scope.emptySterilizer = BioTest.initNewSterilizer();
    }
    $scope.newValue = !$scope.newValue;
  };

  $scope.updateSterilizer = function(){

    var jsonUpdateSterilizer = {};

    jsonUpdateSterilizer.id = $scope.sterilizerObject[$scope.sterilizerIndex].id;
    jsonUpdateSterilizer.name = $scope.sterilizerObject[$scope.sterilizerIndex].name;
    jsonUpdateSterilizer.presets = $scope.sterilizerObject[$scope.sterilizerIndex].presets;

    BioTest.updateSterilizer( jsonUpdateSterilizer.id, jsonUpdateSterilizer ).then(function(data){
      console.log(data);
      // toaster.pop('success', "Updated Sterilizer", "Your changes have been saved");
      $ionicPopup.alert({
        title: 'Updated Sterilizer',
        template: 'Your changes have been saved'
      });
    });

  };

  $scope.deleteSterilizer = function(sterilizerId){
    console.log(sterilizerId);

    BioTest.deleteSterilizer(sterilizerId).then(function(data){
      console.log(data);
      populateSterilizers();
      $ionicPopup.alert({
        title: 'Deleted Sterilizer',
        template: 'Your changes have been saved'
      });
      $scope.editSterilizer();
    });
  };

  $scope.addSterilizer = function(){

    var jsonAddSterilizer = {};

    jsonAddSterilizer.name = $scope.emptySterilizer.name;
    jsonAddSterilizer.presets = $scope.emptySterilizer.presets;

    BioTest.addSterilizer(jsonAddSterilizer).then(function(data){
      console.log(data);
      populateSterilizers();
      $scope.newSterilizer();
      $ionicPopup.alert({
        title: 'Created Sterilizer',
        template: 'Your changes have been saved'
      });
    });
  };

  $scope.addRecord = function(){

    var sterilizationRecord = {sterilization_test: $scope.record};
    BioTest.createSterilizationRecord(sterilizationRecord).then(function(data){
      // TO DO: Redirect
      console.log(data.sterilization_test.id);
      var alertPopup = $ionicPopup.alert({
        title: 'Record created',
        template: 'Check your email and follow instructions to reset password'
      });
      alertPopup.then(function(res) {
        $location.path('/tab/biotests');
      });
      resetForm();
    });

  };

  $scope.cancelRecord = function(){
    resetForm();
    $location.path("/tab/biotests");
  };

  $scope.setResult = function(result){

    var resultString;
    if(result){
      resultString = 'Passed';
    } else {
      resultString = 'Failed';
    }

    BioTest.initTestingUsers().then(function(data){

      $scope.completedRecord.recorder_id = data[0].id;
      $scope.completedRecord.recorder_name = data[0].fullname;
      $scope.completedRecord.result = resultString;
      console.log($scope.completedRecord);

      BioTest.updateSterilizationRecord($scope.completedRecord.id, $scope.completedRecord).then(function(data){
        console.log(data);
        $ionicPopup.alert({
          title: 'Updated Record',
          template: 'Your changes have been saved'
        });
      });
    });
  };

  $scope.updateNote = function(){
    console.log($scope.completedRecord.notes);
    console.log($scope.completedRecord.id);
    // var notesObject = {sterilization_tests:{notes:$scope.completedRecord.notes}}
    BioTest.updateNote($scope.completedRecord.id, {notes: $scope.completedRecord.notes}).then(function(data){
      console.log(data);
      $ionicPopup.alert({
        title: 'Updated Record',
        template: 'Your changes have been saved'
      });
    });
  };

  $scope.logout = function() {
      console.log(AuthService.logout());
  };

});
