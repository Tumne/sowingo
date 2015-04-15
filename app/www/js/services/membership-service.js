angular.module('starter.membership-service', [])

  .service('MembershipService', function($location, $rootScope, api) {
    var accountInfo ={
      fullname: null, 
      memberships:{
        office:[ {office: {name: null} } ]
      } 
    };
    var officeValue = 0;

    var getSterilizers = function() {
      api.getSterilizers().then(function loginSuccess(response){
        console.log(response);
      });
    };

    this.initiateMembership = function (loginData, value) {
      accountInfo = loginData;
      officeValue = value;
      console.log(loginData.memberships.office[value].id);

      return api.setCurrentMembership(
        loginData.memberships.office[value].id
      ).then(function loginSuccess(response) {
        loginData = response.data;
        console.log(loginData);
        // getSterilizers();
        $location.path("/tab/biotests");
      });
    };

    this.getAccountInfo = function(){
      return accountInfo;
    }

    this.getOfficeValue = function(){
      return officeValue;
    }

    this.getFullname = function(){
      return accountInfo.fullname;
    }

    this.getCurrentAddress = function(){
      return accountInfo.memberships.office[officeValue].office.name;
    }
  });