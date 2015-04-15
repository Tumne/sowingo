angular.module('starter.session-service', [])

  .service('Session', function (LocalStorage) {
    var SessionKey = 'session';

    var shortISODate = function (date) {
      return date.toISOString().substr(0, 19);
    };

    this.clear = function () {
      LocalStorage.clear();
    };

    this.getToken = function () {
      return this.isTokenValid() ? this.get('token') : '';
    };

    this.isTokenValid = function () {
      var token = this.get('token'),
          expires = this.get('token_expiry'),
          now = shortISODate(new Date());

      return !!(token && expires > now);
    };

    this.loadLoginData = function (data) {
      LocalStorage.set(SessionKey, data);
      this.set('vendors', data.memberships.vendor);
      this.set('offices', data.memberships.office);
      this.set('sowingo', data.memberships.sowingo);
    };

    this.set = function (name, value) {
      var _data = LocalStorage.get(SessionKey) || {};
      _data[name] = value;
      return LocalStorage.set(SessionKey, _data);
    };

    this.get = function (name) {
      var _data = LocalStorage.get(SessionKey);
      return _data && name ? _data[name]
        : _data ? _data
        : undefined;
    };
  })

;
