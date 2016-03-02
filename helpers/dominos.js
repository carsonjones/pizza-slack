var pizzapi = require('pizzapi'),
    Q = require('q');


module.exports = {
  getStores: function(address){
    var deferred = Q.defer();
    var storeData = {};
    pizzapi.Util.findNearbyStores(
      address,
      'Delivery',
      function(storeData){
        deferred.resolve(storeData);
      }
    );
    return deferred.promise;
  }
}
