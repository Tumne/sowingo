angular.module('starter.api', [])

  .factory('api', function ($http, apiUrl) {
    var successLogger = function (name) {
      return function (response) {
        console.log(name + ': Success: response: %o', response);
        // Logger.debug(name + ': Success: response: %o', response);
      };
    };

    var errorLogger = function (name) {
      return function (response) {
        console.log(name + ': Error: response: %o', response);
        // Logger.error(name + ': Error: response: %o', response);
      };
    };

    var logSuccess = function (name, response) {
      console.log(name + ': Success: response = %o', response);
      // Logger.debug(name + ': Success: response = %o', response);
    };

    var logError = function (name, response) {
      console.log(name + ': Error: response = %o', response);
      // Logger.error(name + ': Error: response = %o', response);
    };

    return {
      login: function (user) {
        return $http
          .post(apiUrl + '/login', {
            email: user.email,
            password: user.password
          })
          .success(successLogger('login'))
          .error(errorLogger('login'))
        ;
      },

      logout: function () {
        return $http['delete'](apiUrl + '/login')
          .success(successLogger('logout'))
          .error(errorLogger('logout'))
        ;
      },

      requestResetPassword: function (email) {
        return $http.get(
          apiUrl + '/users/reset_password',
          {params: {email: email}}
        )
        .success(successLogger('reset'))
        .error(errorLogger('reset'))
      },

      setCurrentMembership: function(membershipId) {
        return $http
          .put(apiUrl + '/me/memberships/current', {
            membership_id: membershipId
          })
          .success(successLogger('setCurrentMembership'))
          .error(errorLogger('setCurrentMembership'))
        ;
      },

      createSterilizationRecord: function(record){
        return $http
          .post(apiUrl + '/sterilization', record)
          .success(successLogger('createSterilizationRecord'))
          .error(errorLogger('createSterilizationRecord'))
        ;        
      },
      updateSterilizationRecord: function(sterilizerId, result){
        return $http
          .put(apiUrl + '/sterilization/' + sterilizerId, {sterilization_test: result})
          .success(successLogger('updateSterilizationRecord'))
          .error(errorLogger('updateSterilizationRecord'))
        ;        
      },
      getSterilizationRecords: function(){
        return $http
          .get(apiUrl + '/sterilization')
          .success(successLogger('getSterilizationRecords'))
          .error(errorLogger('getSterilizationRecords'))
        ;        
      },
      getMyUsers: function () {
        return $http
          .get(apiUrl + '/me/users')
          .success(successLogger('getMyUsers'))
          .error(errorLogger('getMyUsers'))
        ;
      },
      getIndicatorCompanies: function () {
        return $http
          .get(apiUrl + '/sterilization/indicator_companies')
          .success(successLogger('getIndicatorCompanies'))
          .error(errorLogger('getIndicatorCompanies'))
        ;
      },
      getSterilizers: function () {
        return $http.get(apiUrl + '/sterilization/sterilizers')
          .success(successLogger('getSterilizers'))
          .error(errorLogger('getSterilizers'))
        ;
      },
      updateSterilizer: function (sterilizerId, record) {
        return $http.put(apiUrl + '/sterilization/sterilizers/' + sterilizerId, record)
          .success(successLogger('updateSterilizer'))
          .error(errorLogger('updateSterilizer'))
        ;
      },
      addSterilizer: function (record) {
        return $http.post(apiUrl + '/sterilization/sterilizers', record)
          .success(successLogger('addSterilizer'))
          .error(errorLogger('addSterilizer'))
        ;
      },
      deleteSterilizer: function (sterilizerId) {
        return $http.delete(apiUrl + '/sterilization/sterilizers/' + sterilizerId)
          .success(successLogger('deleteSterilizer'))
          .error(errorLogger('deleteSterilizer'))
        ;
      },
      updateNote: function (recordId, notesObject) {
        return $http.put(apiUrl + '/sterilization/record/' + recordId + '/notes', notesObject)
          .success(successLogger('updateNote'))
          .error(errorLogger('updateNote'))
        ;
      }
    };
  })
;
