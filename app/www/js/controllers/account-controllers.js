angular.module('starter.account-controllers', [])

.controller('LoginCtrl', function($scope, $rootScope, api, AuthService, MembershipService, $ionicPopup, $ionicModal, $state, $location, apiKey, apiSecret) {
    $scope.userInfo = {};
    $scope.data = {};
    $scope.emailAddress = 'something';


    $scope.login = function() {
        console.log($scope.data.email + " " + $scope.data.password);
        console.log(apiKey, apiSecret);
        AuthService.login($scope.data.email, $scope.data.password).then(function(data){
          $scope.userInfo = data;
          $rootScope.userInfo = data;
          console.log("TEST!!!!!!!");
          console.log($scope.userInfo);
          $ionicModal.fromTemplateUrl('templates/location-modal.html', {
            scope: $scope,
            animation: 'slide-in-up',
            backdropClickToClose: false
          }).then(function(modal) {
            $scope.modal = modal;
            $scope.modal.show();
            $scope.data = {};
          });
        });
    };

    $scope.choose = function(value){
      MembershipService.initiateMembership($scope.userInfo, value).then(function(data){
        console.log(data);
        $scope.modal.hide();
      });
    };

    $scope.cancelModal = function(){
      $scope.modal.hide();
      $scope.userInfo = null;
      $rootScope.userInfo = null;
      console.log($scope.userInfo);
    };

})

.controller('PasswordRecoveryCtrl', function($scope, $ionicPopup, AuthService) {

    $scope.data = {};
 
    $scope.passwordRecovery = function() {

      console.log($scope.data.email);

      AuthService.passwordRecovery($scope.data.email).then(function(data){

        if(data){
           var alertPopup = $ionicPopup.alert({
             title: 'Password Sent',
             template: 'Check your email and follow instructions to reset password'
           });
        } else {
           var alertPopup = $ionicPopup.alert({
             title: 'Password recovery not sent',
             template: 'Invalid email address or email account is not registered yet'
           });
        }

        $scope.data = {};
      });

    };
});