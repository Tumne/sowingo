angular.module('starter.chemtest-services', [])

.service('ChemTest', function(api) {

  this.initHours = function(){
    var hours = 
      [ {name: '1 hour'}, {name: '2 hours'}, {name: '3 hours'}, {name: '4 hours'}, {name: '5 hours'}, {name: '6 hours'}, 
        {name: '7 hours'}, {name: '8 hours'}, {name: '9 hours'}, {name: '10 hours'}, {name: '11 hours'}, {name: '12 hours'}, 
        {name: '13 hours'}, {name: '14 hours'}, {name: '15 hours'}, {name: '16 hours'}, {name: '17 hours'}, {name: '18 hours'},
        {name: '19 hours'}, {name: '20 hours'}, {name: '21 hours'}, {name: '22 hours'}, {name: '23 hours'}, {name: '24 hours'} 
      ];
    return hours;
  };

  this.initTime = function(){
    var date = new Date();
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime = hours + ':' + minutes + ' ' + ampm;
    return strTime;
  };

  this.initNewSterilizer = function(){
    var newSterilizer = { name: null, presets: [{}]};
    return newSterilizer;
  };

  this.initSterilizers = function () {
    return api.getSterilizers().then(function (response) {
      console.log(response.data);
      return response.data;
    });
  };

  this.initTestingUsers = function () {
    return api.getMyUsers().then(function (response) {
      console.log(response.data);
      return response.data;
    });
  };

  this.initIndicatorCompanies = function () {
    return api.getIndicatorCompanies().then(function (response) {
      console.log(response.data);
      return response.data;
    });
  };

  this.createSterilizationRecord = function (record) {
    return api.createSterilizationRecord(record).then(function (response) {
      console.log(response.data);
      return response.data;
    });
  };
  this.updateSterilizationRecord = function (sterilizerId, record) {
    return api.updateSterilizationRecord(sterilizerId, record).then(function (response) {
      console.log(response.data);
      return response.data;
    });
  };
  this.updateSterilizer = function (sterilizerId, record) {
    return api.updateSterilizer(sterilizerId, record).then(function (response) {
      console.log(response.data);
      return response.data;
    });
  };
  this.addSterilizer = function (record) {
    return api.addSterilizer(record).then(function (response) {
      console.log(response.data);
      return response.data;
    });
  };
  this.deleteSterilizer = function (sterilizerId) {
    return api.deleteSterilizer(sterilizerId).then(function (response) {
      console.log(response.data);
      return response.data;
    });
  };
  this.getSterilizationRecords = function () {
    return api.getSterilizationRecords().then(function (response) {
      console.log(response.data);
      return response.data;
    });
  };
  this.updateNote = function (recordId, notesObject) {
    return api.updateNote(recordId, notesObject).then(function (response) {
      console.log(response.data);
      return response.data;
    });
  };
  // updateNote
  
});