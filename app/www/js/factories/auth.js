angular.module('starter.authentication', [])

  .factory('auth', function($q, /*routes, */ Session, crypto, apiUrl, apiKey, apiSecret) {

    var _normalizedHost = function (url) {
      var link = document.createElement('a');
      link.href = url || apiUrl;

      var port = link.port,
      scheme = link.protocol,
      host = link.hostname;

      return !port && scheme === 'http:'  ? host + ':80'
      : !port && scheme === 'https:' ? host + ':443'
      : host + ':' + port;
    };

    var _api_date = function() {
      var pad = function(n) {
        return n<10 ? '0'+n : n;
      };
      var now = new Date();
      return  now.getUTCFullYear() +'-'+
      pad(now.getUTCMonth()+1) +'-'+
      pad(now.getUTCDate()) +' '+
      pad(now.getUTCHours()) +':'+
      pad(now.getUTCMinutes()) +':'+
      pad(now.getUTCSeconds());
    };
    var _content_type = function(req) {
      return req.headers['Content-Type'] || '';
    };

    var signed_parts = null;

    var _signed_request = function(req, date) {
      var signed =  req.method +'\n'+
      req.url +'\n'+
      date +'\n'+
      _content_type(req) +'\n'+
      _normalizedHost() +'\n'+
      apiKey;

      signed_parts = signed.split('\n');
      return crypto.HmacSHA1(signed, apiSecret, 'base64');
    };

    var _isSowingoApiRequest = function (req) {
      return _normalizedHost(apiUrl) === _normalizedHost(req.url);
    };

    var _headers = function(req) {
      var api_date = _api_date();
      var headers = {
        'Api-Date': api_date,
        'Authorization': apiKey +':'+ _signed_request(req, api_date),
        'Key': apiKey,
        'X-Signed-Parts': JSON.stringify(signed_parts)
      };

      if (Session.isTokenValid()) {
        headers['User-Token'] = Session.getToken();
      }

      return headers;
    };

    var handle401 = function (data) {
      if (data.status === 401) {
        Session.logout();
        // routes.loginRedirect();
        return $q.reject(data);
      }
      // TODO: Something better here.
      return undefined;
    };

    return {
      // httpInterceptor hooks
      request: function(req) {

        if (_isSowingoApiRequest(req)) {
          var auth_headers = _headers(req);
          for(var i in auth_headers) {
            req.headers[i] = auth_headers[i];
          }
        }

        return req || $q.when(req);
      },
      response: function(res) {
        handle401(res);
        return res || $q.when(res);
      },

      responseError: function (rejection) {
        handle401(rejection);
        return $q.reject(rejection);
      }
    };
  })