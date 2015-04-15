angular.module('starter.services', [])

.service('BioData', function() {
  // Might use a resource here that returns a JSON array
  var blankData = {
    id: null,
    date: '',
    time: '',
    tester: 'Create New Entry',
    result: '',
    recordingUser: ''
  };

  // Some fake testing data
  var datas = [
    {id: 0, test_date: 'June 3, 2008', test_time: '23:59', tester_id: 'Anna Conda', result: true, recorder_id: 'Matthew Niewczas'},
    {id: 1, test_date: 'March 15, 1901', test_time: '1:23', tester_id: 'Dj MAILER-DAEMON', result: false, recorder_id: 'Matthew Niewczas'},
    {id: 2, test_date: 'Feb 28, 2015', test_time: '12:08', tester_id: 'Cross Chris', result: true, recorder_id: 'Matthew Niewczas'},
    {id: 3, test_date: 'Feb 24, 2015', test_time: '1:08', tester_id: 'McLovin', result: true, recorder_id: 'Matthew Niewczas'}
  ];

  return {
    all: function(){
      return datas;
    },
    remove: function(data) {
      datas.splice(datas.indexOf(data), 1);
    },
    get: function(dataId) {
      for (var i = 0; i < datas.length; i++) {
        if (datas[i].id === parseInt(dataId)) {
          return datas[i];
        }
      }
      return null;
    },
    blank: function() {
      return blankData;
    }
  }
})

.service('ChemData', function() {
  // Might use a resource here that returns a JSON array
  var blankData = {
    id: null,
    date: '',
    time: '',
    tester: 'Create New Entry',
    result: '',
    recordingUser: ''
  };

  // Some fake testing data
  var datas = [
    {id: 0, test_date: 'Feb 27, 2015', test_time: '17:08', tester_id: 'Maria Baria', result: true },
    {id: 1, test_date: 'Feb 28, 2015', test_time: '12:08', tester_id: 'Barb E. Dahl', result: false },
    {id: 2, test_date: 'Feb 24, 2015', test_time: '1:08', tester_id: 'THX 1138', result: false }
  ];
  
  return {
    all: function() {
      return datas;
    },
    remove: function(data) {
      datas.splice(datas.indexOf(data), 1);
    },
    get: function(dataId) {
      for (var i = 0; i < datas.length; i++) {
        if (datas[i].id === parseInt(dataId)) {
          return datas[i];
        }
      }
      return null;
    },
    blank: function() {
      return blankData;
    }
  }
});