// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('starter', 
  [

   /*  3rd party  */
   'ionic', 'starter.services', 'toaster',

   /* controllers */
   'starter.account-controllers', 'starter.biotest-modify-controllers', 'starter.biotest-list-controllers', 
   'starter.chemtest-modify-controllers', 'starter.chemtest-list-controllers', 'starter.tab-controllers',

   /*  factories  */
    'starter.authentication',  'starter.localstorage', 'starter.crypto', 'starter.api',

   /*  services  */
   'starter.globalVars-service', 'starter.membership-service', 'starter.auth-service', 'starter.session-service',
   'starter.records-service', 'starter.biotest-services', 'starter.chemtest-services',

  ])


.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  // setup an abstract state for the tabs directive
  .state('login', {
    url: "/login",
    templateUrl: "templates/account-login.html",
    controller: 'LoginCtrl'
  })
  .state('password-recovery', {
    url: "/password-recovery",
    templateUrl: "templates/password-recovery.html",
    controller: 'PasswordRecoveryCtrl'
  })
  .state('tab', {
    url: "/tab",
    templateUrl: "templates/tabs.html",
    controller: 'TabCtrl'
  })

  // Each tab has its own nav history stack:

    .state('tab.biotests', {
      cache: false,
      url: '/biotests',
      views: {
        'tab-biotests': {
          templateUrl: 'templates/biotest-list.html',
          controller: 'BioTestsCtrl'
        }
      }
    })
    .state('tab.biotest-detail', {
      url: '/biotests/:dataId',
      views: {
        'tab-biotests': {
          templateUrl: 'templates/biotest-modify.html',
          controller: 'BioTestDetailCtrl'
        }
      }
    })
    .state('tab.chemtests', {
      cache: false,
      url: '/chemtests',
      views: {
        'tab-chemtests': {
          templateUrl: 'templates/chemtest-list.html',
          controller: 'ChemTestsCtrl'
        }
      }
    })
    .state('tab.chemtest-detail', {
      url: '/chemtests/:dataId',
      views: {
        'tab-chemtests': {
          templateUrl: 'templates/chemtest-modify.html',
          controller: 'ChemTestDetailCtrl'
        }
      }
    });

  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');

})

.config(function($httpProvider, $provide) {
  $httpProvider.interceptors.push('auth');

})
.run(function($ionicPlatform, $rootScope, AuthService) {

  //ionic Platform
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
  $rootScope.fullname = null;
  //Authservice login/logout 
  $rootScope.isLoggedIn = AuthService.isActive();

  $rootScope.$on('Authentication:Logout', function (event) {
    AuthService.logout();
  });

});
