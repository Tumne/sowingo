
// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('starter.globalVars-service', [])
    // .value('apiUrl', 'http://10.0.221.17:5000')
    .value('apiUrl', 'https://api.sowingo.com:443')
    .value('apiKey', '77dc92d4-2368-498b-a8a2-cb359e637f5b')
    .value('apiSecret', '571c91e3c18b45178df98a32')
    .constant('LocalStorageNamespace', '');

    // .value('gUrl', globalUrl);