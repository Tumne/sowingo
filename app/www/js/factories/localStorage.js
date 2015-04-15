angular.module('starter.localstorage', [])

  .factory('LocalStorage', function (LocalStorageNamespace) {
    var namespace = LocalStorageNamespace,
        nsRegex = namespace ? new RegExp('^' + namespace + '.') : null;


    return {
      _key: function (name) {
        var prefix = namespace ? namespace + '.' : '';
        return prefix + name;
      },

      keys: function () {
        var keys = Object.keys(store.getAll());

        if (namespace) {
          return keys.filter(function (key) {
            return key.match(nsRegex);
          });
        } else {
          return keys;
        }
      },

      forEach: function (fn) {
        if (namespace) {
          var keys = this.keys();
          for (var i = 0; i < keys.length; ++i) {
            fn(keys[i], this.get(keys[i]));
          }
          return undefined;
        } else {
          return store.forEach(fn);
        }
      },

      set: function(name, value) {
        store.set(this._key(name), value);
      },

      get: function(name) {
        return store.get(this._key(name));
      },

      remove: function (name) {
        return store.remove(this._key(name));
      },

      clear: function() {
        if (namespace) {
          var keys = this.keys();
          for (var i = 0; i < keys.length; ++i) {
            store.remove(keys[i]);
          }
        } else {
          store.clear();
        }
      }
    };
  })

;
