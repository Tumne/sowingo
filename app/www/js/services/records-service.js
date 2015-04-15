angular.module('starter.records-service', [])

  .service('Records', function () {
    this.initiateBioRecords = function () {

      return api.getSterilizers(
      ).then(function loginSuccess(response) {
        console.log(response.data);
        $location.path("/tab/biotests");
      });

    };
  });