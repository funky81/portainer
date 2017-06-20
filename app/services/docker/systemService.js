angular.module('portainer.services')
.factory('SystemService', ['$q', 'System', function SystemServiceFactory($q, System) {
  'use strict';
  var service = {};

  service.getVolumePlugins = function() {
    var deferred = $q.defer();
    System.info({}).$promise
    .then(function success(data) {
      var plugins = data.Plugins.Volume;
      deferred.resolve(plugins);
    })
    .catch(function error(err) {
      deferred.reject({msg: 'Unable to retrieve volume plugin information', err: err});
    });
    return deferred.promise;
  };

  service.info = function() {
    return System.info({}).$promise;
  };

  service.version = function() {
    return System.version({}).$promise;
  };

  service.events = function(from, to) {
    var deferred = $q.defer();

    System.events({since: from, until: to}).$promise
    .then(function success(data) {
      var events = data.map(function (item) {
        return new EventViewModel(item);
      });
      deferred.resolve(events);
    })
    .catch(function error(err) {
      deferred.reject({ msg: 'Unable to retrieve engine events', err: err });
    });

    return deferred.promise;
  };

  return service;
}]);
