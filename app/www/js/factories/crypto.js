angular.module('starter.crypto', [])
  .factory('crypto', function() {
    return {
      HmacSHA1: function(message, secret, encoding) {
        var _encoding = encoding.toLowerCase() === 'base64' ? CryptoJS.enc.Base64 : null;
        return CryptoJS.HmacSHA1(message, secret).toString(_encoding);
      }
    };
}
);