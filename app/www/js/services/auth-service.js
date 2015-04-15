angular.module('starter.auth-service', [])

  .service('AuthService', function($rootScope, toaster, api, Session, MembershipService, $location) {
    this.resetPassword = function (email) {
      return api.requestPasswordReset(email);
    };

    this.refreshSessionData = function () {
      return api.getSessionData().then(function(response) {
        Session.setLoginData(response.data);
        $rootScope.$broadcast('Session:Refreshed');
      });
    };

    this.login = function (email, password) {
      var loginData;

      return api.login({
        email: email,
        password: password
      }).then(function loginSuccess(response) {
        loginData = response.data;
        // api.getIndicatorCompanies();
        // Note: Login data is necessary here so that the User-Token
        // is accessible for the setCurrentMembership call.
        Session.loadLoginData(loginData);

        // MembershipService.initiateMembership(loginData);

        return loginData;

      }, function loginFailure (response) {
        // TODO: Check messages & HTTP statuses for better error messages here.

        // toaster.pop('error', "Failed to login", "Bad email and/or password");

        throw 'Bad email and/or password';

      }).then(function membershipSuccess(response) {
        $rootScope.isLoggedIn = true;
        $rootScope.$broadcast('Authentication:LoggedIn', loginData);
        return loginData;
      }, function membershipFailure(error) {
        // Since we loaded login data, if there is a failure, we need
        // to clear it all out.
        Session.clear();

        if (angular.isString(error)) {
          throw error;
        }

        // FIXME: Failure at the API-level. Do something else.
      });
    };

    this.logout = function () {
      return api.logout().then(function (response) {
        $rootScope.isLoggedIn = false;
        Session.clear();
        $rootScope.$broadcast('Authentication:LoggedOut', response.data);
        $location.path("/login");
        return response.data;
      });
    };
    
    this.passwordRecovery = function (email) {


      return api.requestResetPassword(email)
      .then(function loginSuccess(response) {

        return true;

      }, function loginFailure (response) {

        return false;

      });
    };

    this.isActive = function () {
      return !!(Session.isTokenValid() && Session.getToken());
    };
  })

;
